import locations from '../data/locations.json'
import { enrichLocation, LOCATION_META } from './geo'

export function getEnrichedLocations() {
  return locations.features.map((f) => {
    const enriched = enrichLocation(f)
    const meta = LOCATION_META[f.properties.id] || {}
    return {
      ...enriched,
      properties: { ...enriched.properties, ...meta },
    }
  })
}

export function getPlant() {
  return getEnrichedLocations().find((f) => f.properties.type === 'central_plant')
}

export function getFlagships() {
  return getEnrichedLocations()
    .filter((f) => f.properties.type === 'flagship')
    .sort((a, b) => a.properties.distanceRoadKm - b.properties.distanceRoadKm)
}

export function getAdditionalStores() {
  return getEnrichedLocations()
    .filter((f) => f.properties.type === 'additional')
    .sort((a, b) => a.properties.distanceRoadKm - b.properties.distanceRoadKm)
}

export function getDropStores() {
  return getEnrichedLocations().filter(
    (f) => f.properties.type === 'flagship' || f.properties.type === 'additional',
  )
}
