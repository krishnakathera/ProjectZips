import { getFlagships, getAdditionalStores } from '../utils/locations'

function DistanceTable({ title, subtitle, stores, variant, compact = false }) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <div
        className={`border-b border-gray-100 bg-zips-navy text-white ${
          compact ? 'px-3 py-2' : 'px-4 py-3'
        }`}
      >
        <h3 className={compact ? 'text-sm font-bold' : 'font-bold'}>{title}</h3>
        <p className="text-xs text-gray-300">{subtitle}</p>
      </div>
      <div className={compact ? 'table-scroll -mx-px' : 'table-scroll'}>
        <table
          className={`w-full text-left ${compact ? 'min-w-[640px] text-xs' : 'min-w-[720px] text-sm'}`}
        >
          <thead className="bg-zips-gray-50 text-xs uppercase text-gray-500">
            <tr>
              <th className={compact ? 'px-2 py-2' : 'px-4 py-3'}>Location</th>
              <th className={compact ? 'px-2 py-2' : 'px-4 py-3'}>Road km</th>
              <th className={compact ? 'px-2 py-2' : 'px-4 py-3'}>Drive ~min</th>
              <th className={compact ? 'px-2 py-2' : 'px-4 py-3'}>5 km pop.</th>
              <th className={compact ? 'px-2 py-2' : 'px-4 py-3'}>HH</th>
              <th className={compact ? 'px-2 py-2' : 'px-4 py-3'}>Income</th>
              {variant === 'flagship' ? (
                <th className={compact ? 'px-2 py-2' : 'px-4 py-3'}>Visibility</th>
              ) : (
                <th className={compact ? 'px-2 py-2' : 'px-4 py-3'}>Nearby</th>
              )}
            </tr>
          </thead>
          <tbody>
            {stores.map((f) => {
              const p = f.properties
              return (
                <tr key={p.id} className="border-t border-gray-100 hover:bg-orange-50/40">
                  <td
                    className={`font-semibold text-zips-navy ${compact ? 'max-w-[11rem] px-2 py-2' : 'px-4 py-3'}`}
                  >
                    {p.name}
                  </td>
                  <td
                    className={`font-bold text-zips-orange ${compact ? 'px-2 py-2' : 'px-4 py-3'}`}
                  >
                    {p.distanceRoadKm} km
                  </td>
                  <td className={compact ? 'px-2 py-2' : 'px-4 py-3'}>{p.driveTimeMin} min</td>
                  <td className={compact ? 'px-2 py-2' : 'px-4 py-3'}>
                    {p.pop5km?.toLocaleString('en-IN')}
                  </td>
                  <td className={compact ? 'px-2 py-2' : 'px-4 py-3'}>
                    {p.households5km?.toLocaleString('en-IN')}
                  </td>
                  <td className={compact ? 'px-2 py-2' : 'px-4 py-3'}>
                    <span className="block text-xs font-medium">{p.avgHouseholdIncome}</span>
                    <span className="text-xs text-gray-500">{p.incomeTier}</span>
                  </td>
                  <td
                    className={`text-xs text-gray-600 ${compact ? 'px-2 py-2 leading-snug' : 'px-4 py-3'}`}
                  >
                    {variant === 'flagship' ? (
                      <>
                        {p.visibility && <span className="block">{p.visibility}</span>}
                        {p.anchors && (
                          <span className={compact ? 'block break-words' : ''}>
                            {p.anchors.join(' · ')}
                          </span>
                        )}
                      </>
                    ) : (
                      <span className={compact ? 'break-words' : ''}>
                        {p.nearbyCommunities?.join(' · ')}
                      </span>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default function DistancePanel({ compact = false, embedded = false, sidebar = false }) {
  const flagships = getFlagships()
  const additional = getAdditionalStores()

  if (compact) {
    return (
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <h4 className="font-bold text-zips-navy">Nearest flagship</h4>
          <p className="mt-1 text-2xl font-extrabold text-zips-orange">
            {flagships[0]?.properties.name} — {flagships[0]?.properties.distanceRoadKm} km
          </p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <h4 className="font-bold text-zips-navy">Farthest flagship</h4>
          <p className="mt-1 text-2xl font-extrabold text-zips-navy">
            {flagships[flagships.length - 1]?.properties.name} —{' '}
            {flagships[flagships.length - 1]?.properties.distanceRoadKm} km
          </p>
        </div>
      </div>
    )
  }

  if (sidebar) {
    return (
      <div className="space-y-4">
        <DistanceTable
          title="Flagship stores"
          subtitle="Nearest → farthest from plant"
          stores={flagships}
          variant="flagship"
          compact
        />
        <DistanceTable
          title="Convenience stores"
          subtitle="Nearest → farthest from plant"
          stores={additional}
          variant="additional"
          compact
        />
      </div>
    )
  }

  return (
    <section id="distances" className={embedded ? 'py-6' : 'bg-zips-gray-50 py-8 sm:py-12'}>
      <div className={embedded ? 'px-4' : 'mx-auto max-w-7xl px-4 sm:px-6'}>
        {!embedded && (
          <>
            <h2 className="text-2xl font-extrabold text-zips-navy sm:text-3xl">
              Distances from Central Plant
            </h2>
            <p className="mt-2 text-sm text-gray-600 sm:text-base">
              Tukkuguda ORR Exit 14 — estimated road distances (~1.35× straight line), ~60 km/h avg
              drive time. Population and income are 2026 catchment estimates (5 km radius).
            </p>
          </>
        )}
        {embedded && (
          <h2 className="mb-4 text-lg font-bold text-zips-navy">Distance tables</h2>
        )}

        <div className={embedded ? 'space-y-6' : 'mt-8 space-y-8'}>
          <DistanceTable
            title="Flagship drop stores — premium & high-visibility"
            subtitle="Hospitals, IT corridors, elite residential — sorted nearest to farthest"
            stores={flagships}
            variant="flagship"
          />
          <DistanceTable
            title="Convenience drop stores — apartments & communities"
            subtitle="Gated communities, villas, SEZ housing — sorted nearest to farthest"
            stores={additional}
            variant="additional"
          />
        </div>
      </div>
    </section>
  )
}
