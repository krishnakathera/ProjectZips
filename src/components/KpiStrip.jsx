import demographics from '../data/demographics.json'

export default function KpiStrip() {
  return (
    <section className="bg-zips-gray-50 py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {demographics.kpis.map((kpi) => (
            <div
              key={kpi.label}
              className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:border-zips-orange hover:shadow-md"
            >
              <p className="text-2xl font-extrabold text-zips-orange">{kpi.value}</p>
              <p className="mt-1 text-sm font-semibold text-zips-gray-900">{kpi.label}</p>
              <p className="mt-0.5 text-xs text-gray-500">{kpi.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
