import demographics from '../data/demographics.json'

export default function KpiStrip() {
  return (
    <section className="bg-zips-gray-50 py-8 sm:py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-6">
          {demographics.kpis.map((kpi) => (
            <div
              key={kpi.label}
              className="rounded-xl border border-gray-200 bg-white p-3 shadow-sm transition hover:border-zips-orange hover:shadow-md sm:p-4"
            >
              <p className="text-lg font-extrabold text-zips-orange sm:text-2xl">{kpi.value}</p>
              <p className="mt-1 text-sm font-semibold text-zips-gray-900">{kpi.label}</p>
              <p className="mt-0.5 text-xs text-gray-500">{kpi.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
