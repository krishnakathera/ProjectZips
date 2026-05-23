import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polygon,
  Circle,
  Polyline,
  useMap,
} from 'react-leaflet'
import L from 'leaflet'
import { useEffect, useMemo, useState } from 'react'
import routes from '../data/routes.json'
import { useMapLayers } from '../hooks/useMapLayers'
import { getEnrichedLocations, getPlant } from '../utils/locations'

const SATELLITE_URL =
  'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
const STREET_URL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'

const NETWORK_BOUNDS = [
  [17.12, 78.24],
  [17.58, 78.56],
]

const TYPE_LABELS = {
  central_plant: 'Central Plant',
  flagship: 'Flagship Drop Store',
  additional: 'Convenience Drop Store',
}

function lineColor(km) {
  if (km < 15) return '#16a34a'
  if (km < 28) return '#f59e0b'
  return '#dc2626'
}

function DistanceLegend({ fullscreen }) {
  return (
    <p
      className={
        fullscreen
          ? 'rounded-lg border border-gray-600 bg-zips-gray-900/50 px-3 py-2 text-xs text-gray-300'
          : 'rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs text-gray-600'
      }
    >
      <span className="font-semibold text-green-600">Green</span> &lt;15 km ·{' '}
      <span className="font-semibold text-amber-500">Amber</span> 15–28 km ·{' '}
      <span className="font-semibold text-red-600">Red</span> &gt;28 km from Tukkuguda plant
    </p>
  )
}

function createIcon(type, highlighted) {
  const config = {
    central_plant: { className: 'marker-plant', html: 'P', size: 40 },
    flagship: { className: 'marker-flagship', html: '★', size: highlighted ? 38 : 32 },
    additional: { className: 'marker-additional', html: '•', size: highlighted ? 30 : 24 },
  }[type] || { className: 'marker-additional', html: '•', size: 24 }

  const ring = highlighted ? 'outline:3px solid #f05a28;outline-offset:2px;' : ''

  return L.divIcon({
    className: '',
    html: `<div class="${config.className}" style="${ring}">${config.html}</div>`,
    iconSize: [config.size, config.size],
    iconAnchor: [config.size / 2, config.size / 2],
    popupAnchor: [0, -config.size / 2],
  })
}

function MapController({ fitNetwork, fitPlant, focusStore, resizeSignal }) {
  const map = useMap()

  useEffect(() => {
    map.invalidateSize()
  }, [map])

  useEffect(() => {
    if (resizeSignal == null) return
    map.invalidateSize()
  }, [map, resizeSignal])

  useEffect(() => {
    if (fitNetwork) map.fitBounds(NETWORK_BOUNDS, { padding: [40, 40] })
  }, [map, fitNetwork])

  useEffect(() => {
    if (fitPlant) {
      const plant = getPlant()
      if (plant) {
        const [lng, lat] = plant.geometry.coordinates
        map.setView([lat, lng], 12)
      }
    }
  }, [map, fitPlant])

  useEffect(() => {
    if (focusStore) {
      const [lng, lat] = focusStore.geometry.coordinates
      map.setView([lat, lng], 14)
    }
  }, [map, focusStore])

  return null
}

function LayerChip({ active, onClick, children, color }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
        active
          ? 'bg-zips-orange text-white'
          : 'bg-white text-gray-700 ring-1 ring-gray-200 hover:ring-zips-orange'
      }`}
    >
      {color && (
        <span
          className="mr-1.5 inline-block h-2 w-2 rounded-full"
          style={{ backgroundColor: color }}
        />
      )}
      {children}
    </button>
  )
}

function StorePopup({ p }) {
  return (
    <div className="max-w-[280px] text-sm">
      <p className="text-xs font-bold uppercase text-zips-orange">{TYPE_LABELS[p.type]}</p>
      <p className="text-base font-bold text-zips-navy">{p.name}</p>
      {p.distanceRoadKm != null && (
        <p className="mt-2 rounded bg-zips-gray-50 px-2 py-1 text-xs font-semibold">
          📍 {p.distanceRoadKm} km from plant · ~{p.driveTimeMin} min drive
        </p>
      )}
      <p className="mt-2 text-gray-600">{p.rationale}</p>
      {p.avgHouseholdIncome && (
        <>
          <hr className="my-2" />
          <p className="text-xs">
            <strong>Income:</strong> {p.avgHouseholdIncome} ({p.incomeTier})
          </p>
        </>
      )}
      {p.visibility && (
        <p className="text-xs text-gray-500">
          <strong>Visibility:</strong> {p.visibility}
        </p>
      )}
      {p.anchors && (
        <p className="text-xs text-gray-500">
          <strong>Anchors:</strong> {p.anchors.join(', ')}
        </p>
      )}
      {p.nearbyCommunities && (
        <p className="text-xs text-gray-500">
          <strong>Nearby:</strong> {p.nearbyCommunities.join(', ')}
        </p>
      )}
      <p className="mt-1 text-xs text-gray-500">
        <strong>5 km pop:</strong> {p.pop5km?.toLocaleString('en-IN')} ·{' '}
        <strong>HH:</strong> {p.households5km?.toLocaleString('en-IN')}
      </p>
      {p.capacity && (
        <p className="text-xs text-gray-500">
          <strong>Capacity:</strong> {p.capacity}
        </p>
      )}
    </div>
  )
}

export default function MapView({ fullscreen = false, fillHeight = false, resizeSignal }) {
  const locations = useMemo(() => getEnrichedLocations(), [])
  const plant = useMemo(() => getPlant(), [])

  const {
    layers,
    baseMap,
    selectedAnchor,
    highlightStoreId,
    toggleLayer,
    setBaseMap,
    setSelectedAnchor,
    setHighlightStoreId,
    setRadius,
    clearRadius,
  } = useMapLayers()

  const [fitNetwork, setFitNetwork] = useState(false)
  const [fitPlant, setFitPlant] = useState(false)
  const [search, setSearch] = useState('')

  const plantLatLng = plant
    ? [plant.geometry.coordinates[1], plant.geometry.coordinates[0]]
    : [17.2092, 78.4764]

  const filtered = locations.filter((f) => {
    const t = f.properties.type
    if (t === 'central_plant' && !layers.central_plant) return false
    if (t === 'flagship' && !layers.flagship) return false
    if (t === 'additional' && !layers.additional) return false
    if (search) {
      const q = search.toLowerCase()
      return f.properties.name.toLowerCase().includes(q)
    }
    return true
  })

  const drops = filtered.filter((f) => f.properties.type !== 'central_plant')

  const anchorFeature =
    locations.find((f) => f.properties.id === selectedAnchor) || plant

  const anchorLatLng = anchorFeature
    ? [anchorFeature.geometry.coordinates[1], anchorFeature.geometry.coordinates[0]]
    : plantLatLng

  const focusStore = highlightStoreId
    ? locations.find((f) => f.properties.id === highlightStoreId)
    : null

  const mapHeight =
    fillHeight && fullscreen ? undefined : fullscreen ? 'calc(100vh - 56px)' : 'min(70vh, 720px)'

  return (
    <div className={fullscreen ? 'flex h-full flex-col bg-zips-navy' : ''}>
      <div
        className={
          fullscreen
            ? 'flex min-h-0 flex-1 flex-col overflow-hidden lg:flex-row'
            : 'flex flex-col gap-4 lg:flex-row'
        }
      >
        <aside
          className={
            fullscreen
              ? 'flex w-full shrink-0 flex-col gap-3 overflow-y-auto border-r border-gray-700 bg-zips-navy p-4 text-white lg:w-80'
              : 'flex shrink-0 flex-col gap-3 lg:w-80'
          }
        >
          <DistanceLegend fullscreen={fullscreen} />

          <input
            type="search"
            placeholder="Search locations…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={
              fullscreen
                ? 'w-full rounded-lg border border-gray-600 bg-zips-gray-900 px-3 py-2 text-sm text-white placeholder:text-gray-500'
                : 'w-full rounded-lg border border-gray-200 px-3 py-2 text-sm'
            }
          />

          <div
            className={
              fullscreen
                ? 'rounded-lg border border-gray-600 bg-zips-gray-900/50 p-3'
                : 'rounded-xl border border-gray-200 bg-zips-gray-50 p-3'
            }
          >
            <p className="mb-2 text-xs font-bold uppercase tracking-wide opacity-70">Layers</p>
            <div className="flex flex-wrap gap-2">
              <LayerChip
                active={layers.central_plant}
                onClick={() => toggleLayer('central_plant')}
                color="#dc2626"
              >
                Plant
              </LayerChip>
              <LayerChip
                active={layers.flagship}
                onClick={() => toggleLayer('flagship')}
                color="#f59e0b"
              >
                Flagship
              </LayerChip>
              <LayerChip
                active={layers.additional}
                onClick={() => toggleLayer('additional')}
                color="#2563eb"
              >
                Convenience
              </LayerChip>
              <LayerChip
                active={layers.routes}
                onClick={() => toggleLayer('routes')}
                color="#16a34a"
              >
                Routes
              </LayerChip>
              <LayerChip
                active={layers.distanceLines}
                onClick={() => toggleLayer('distanceLines')}
                color="#f05a28"
              >
                Distances
              </LayerChip>
            </div>
          </div>

          <div
            className={
              fullscreen
                ? 'rounded-lg border border-gray-600 bg-zips-gray-900/50 p-3'
                : 'rounded-xl border border-gray-200 bg-zips-gray-50 p-3'
            }
          >
            <p className="mb-2 text-xs font-bold uppercase tracking-wide opacity-70">
              Trade radius
            </p>
            <div className="flex flex-wrap gap-2">
              {[3, 5, 10].map((km) => (
                <LayerChip
                  key={km}
                  active={layers[`radius${km}`]}
                  onClick={() => setRadius(km)}
                >
                  {km} km
                </LayerChip>
              ))}
              <button
                type="button"
                onClick={clearRadius}
                className="text-xs text-zips-orange hover:underline"
              >
                Clear
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setBaseMap('satellite')}
              className={`rounded-lg px-3 py-2 text-xs font-semibold ${
                baseMap === 'satellite'
                  ? 'bg-zips-orange text-white'
                  : fullscreen
                    ? 'bg-gray-700 text-gray-200'
                    : 'bg-gray-100'
              }`}
            >
              Satellite
            </button>
            <button
              type="button"
              onClick={() => setBaseMap('street')}
              className={`rounded-lg px-3 py-2 text-xs font-semibold ${
                baseMap === 'street'
                  ? 'bg-zips-orange text-white'
                  : fullscreen
                    ? 'bg-gray-700 text-gray-200'
                    : 'bg-gray-100'
              }`}
            >
              Street
            </button>
            <button
              type="button"
              onClick={() => {
                setFitNetwork(true)
                setTimeout(() => setFitNetwork(false), 150)
              }}
              className="rounded-lg bg-zips-orange px-3 py-2 text-xs font-semibold text-white"
            >
              Fit network
            </button>
            <button
              type="button"
              onClick={() => {
                setFitPlant(true)
                setTimeout(() => setFitPlant(false), 150)
              }}
              className="rounded-lg bg-zips-orange/80 px-3 py-2 text-xs font-semibold text-white"
            >
              Zoom plant
            </button>
          </div>

          <div
            className={
              fullscreen
                ? 'rounded-lg border border-gray-600 bg-zips-gray-900/50 p-2'
                : 'rounded-xl border border-gray-200 p-2'
            }
          >
            <p className="mb-2 px-1 text-xs font-bold uppercase opacity-70">Jump to store</p>
            <div className="map-jump-scroll h-[22rem] overflow-y-scroll pr-1">
            {drops.map((f) => (
              <button
                key={f.properties.id}
                type="button"
                onClick={() => {
                  setHighlightStoreId(f.properties.id)
                  setSelectedAnchor(f.properties.id)
                }}
                className={`mb-1 flex w-full items-center justify-between rounded px-2 py-1.5 text-left text-xs transition ${
                  highlightStoreId === f.properties.id
                    ? 'bg-zips-orange text-white'
                    : fullscreen
                      ? 'hover:bg-gray-700'
                      : 'hover:bg-orange-50'
                }`}
              >
                <span className="truncate font-medium">{f.properties.name}</span>
                <span className="ml-2 shrink-0 opacity-80">{f.properties.distanceRoadKm} km</span>
              </button>
            ))}
            </div>
          </div>
        </aside>

        <div
          className={`flex-1 overflow-hidden border-gray-200 shadow-lg ${
            fillHeight && fullscreen
              ? 'min-h-0 border-0 lg:rounded-none'
              : 'rounded-xl border'
          }`}
          style={
            fillHeight && fullscreen
              ? undefined
              : { height: mapHeight, minHeight: fullscreen && !fillHeight ? undefined : 500 }
          }
        >
          <MapContainer
            center={plantLatLng}
            zoom={11}
            className="h-full w-full"
            scrollWheelZoom
          >
            <MapController
              fitNetwork={fitNetwork}
              fitPlant={fitPlant}
              focusStore={focusStore}
              resizeSignal={resizeSignal}
            />
            <TileLayer
              key={baseMap}
              attribution={
                baseMap === 'satellite' ? 'Tiles © Esri' : '© OpenStreetMap'
              }
              url={baseMap === 'satellite' ? SATELLITE_URL : STREET_URL}
            />

            {layers.routes &&
              routes.features.map((route) => (
                <Polygon
                  key={route.properties.id}
                  positions={route.geometry.coordinates[0].map(([lng, lat]) => [lat, lng])}
                  pathOptions={{
                    color: '#16a34a',
                    fillColor: '#16a34a',
                    fillOpacity: 0.1,
                    weight: 2,
                    dashArray: '8 4',
                  }}
                >
                  <Popup>
                    <strong>{route.properties.name}</strong>
                    <br />
                    {route.properties.description}
                  </Popup>
                </Polygon>
              ))}

            {layers.radius3 && (
              <Circle
                center={anchorLatLng}
                radius={3000}
                pathOptions={{ color: '#f05a28', fillOpacity: 0.08 }}
              />
            )}
            {layers.radius5 && (
              <Circle
                center={anchorLatLng}
                radius={5000}
                pathOptions={{ color: '#f05a28', fillOpacity: 0.06 }}
              />
            )}
            {layers.radius10 && (
              <Circle
                center={anchorLatLng}
                radius={10000}
                pathOptions={{ color: '#f05a28', fillOpacity: 0.04 }}
              />
            )}

            {layers.distanceLines &&
              plant &&
              drops.map((feature) => {
                const [lng, lat] = feature.geometry.coordinates
                const km = feature.properties.distanceRoadKm
                return (
                  <Polyline
                    key={`line-${feature.properties.id}`}
                    positions={[plantLatLng, [lat, lng]]}
                    pathOptions={{
                      color: lineColor(km),
                      weight: highlightStoreId === feature.properties.id ? 4 : 2,
                      opacity: highlightStoreId === feature.properties.id ? 1 : 0.6,
                      dashArray: '6 4',
                    }}
                  />
                )
              })}

            {filtered.map((feature) => {
              const [lng, lat] = feature.geometry.coordinates
              const p = feature.properties
              const highlighted = highlightStoreId === p.id
              return (
                <Marker
                  key={p.id}
                  position={[lat, lng]}
                  icon={createIcon(p.type, highlighted)}
                  eventHandlers={{
                    click: () => {
                      setHighlightStoreId(p.id)
                      setSelectedAnchor(p.id)
                    },
                  }}
                >
                  <Popup>
                    <StorePopup p={p} />
                  </Popup>
                </Marker>
              )
            })}
          </MapContainer>
        </div>
      </div>
    </div>
  )
}
