import expansion from '../data/expansion.json'

const PHASE_COLORS = { 1: '#f05a28', 2: '#1a2332' }

export default function RolloutTimeline() {
  const maxMonth = 48

  return (
    <section className="bg-white py-8 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <h2 className="text-2xl font-extrabold text-zips-navy sm:text-3xl">Rollout Timeline</h2>
        <p className="mt-2 text-sm text-gray-600 sm:text-base">
          48-month execution plan across plant, stores, routes, and expansion.
        </p>

        <div className="table-scroll mt-8 min-w-0 rounded-xl border border-gray-200 bg-zips-gray-50 p-4 sm:p-6">
          <div className="mb-4 flex min-w-[320px] justify-between text-[10px] font-semibold text-gray-500 sm:text-xs">
            {[0, 6, 12, 18, 24, 36, 48].map((m) => (
              <span key={m}>M{m}</span>
            ))}
          </div>

          <div className="min-w-[320px] space-y-3">
            {expansion.rollout.map((item) => {
              const left = (item.start / maxMonth) * 100
              const width = ((item.end - item.start) / maxMonth) * 100
              return (
                <div key={item.track} className="flex items-center gap-2 sm:gap-3">
                  <span className="w-20 shrink-0 text-right text-[10px] font-semibold leading-tight text-zips-navy sm:w-36 sm:text-xs">
                    {item.track}
                  </span>
                  <div className="relative h-7 flex-1 rounded bg-gray-200 sm:h-8">
                    <div
                      className="absolute top-0.5 flex h-6 items-center rounded px-1.5 text-[10px] font-bold text-white sm:top-1 sm:px-2 sm:text-xs"
                      style={{
                        left: `${left}%`,
                        width: `${width}%`,
                        backgroundColor: PHASE_COLORS[item.phase],
                        minWidth: '2.5rem',
                      }}
                      title={`Phase ${item.phase}: M${item.start}–M${item.end}`}
                    >
                      P{item.phase}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="mt-6 flex flex-col gap-2 text-sm sm:flex-row sm:gap-6">
            <span className="flex items-center gap-2">
              <span className="h-3 w-3 shrink-0 rounded bg-zips-orange" /> Phase 1 (0–24 mo)
            </span>
            <span className="flex items-center gap-2">
              <span className="h-3 w-3 shrink-0 rounded bg-zips-navy" /> Phase 2 (24–48 mo)
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
