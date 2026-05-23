import MapView from './MapView'
import DistancePanel from './DistancePanel'

export default function MapSection({ onOpenFullMap }) {
  return (
    <section id="map" className="bg-white py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-3xl font-extrabold text-zips-navy">Network Map Preview</h2>
            <p className="mt-2 text-gray-600">
              Satellite view with distances from Tukkuguda plant. Open the full Network Map tab
              for a larger map, distance lines, and store search.
            </p>
          </div>
          {onOpenFullMap && (
            <button
              type="button"
              onClick={onOpenFullMap}
              className="shrink-0 rounded-full bg-zips-orange px-6 py-3 text-sm font-bold text-white shadow-lg transition hover:bg-zips-orange-dark"
            >
              Open full-screen map →
            </button>
          )}
        </div>
        <MapView fullscreen={false} />
        <DistancePanel compact />
      </div>
    </section>
  )
}
