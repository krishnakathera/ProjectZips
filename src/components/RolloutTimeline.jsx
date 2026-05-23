import expansion from '../data/expansion.json'

const PHASE_COLORS = { 1: '#f05a28', 2: '#1a2332' }

export default function RolloutTimeline() {
  const maxMonth = 48

  return (
    <section className="bg-white py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <h2 className="text-3xl font-extrabold text-zips-navy">Rollout Timeline</h2>
        <p className="mt-2 text-gray-600">
          48-month execution plan across plant, stores, routes, and expansion.
        </p>

        <div className="mt-8 overflow-x-auto rounded-xl border border-gray-200 bg-zips-gray-50 p-6">
          <div className="mb-4 flex justify-between text-xs font-semibold text-gray-500">
            {[0, 6, 12, 18, 24, 36, 48].map((m) => (
              <span key={m}>M{m}</span>
            ))}
          </div>

          <div className="space-y-3">
            {expansion.rollout.map((item) => {
              const left = (item.start / maxMonth) * 100
              const width = ((item.end - item.start) / maxMonth) * 100
              return (
                <div key={item.track} className="flex items-center gap-3">
                  <span className="w-36 shrink-0 text-right text-xs font-semibold text-zips-navy">
                    {item.track}
                  </span>
                  <div className="relative h-8 flex-1 rounded bg-gray-200">
                    <div
                      className="absolute top-1 flex h-6 items-center rounded px-2 text-xs font-bold text-white"
                      style={{
                        left: `${left}%`,
                        width: `${width}%`,
                        backgroundColor: PHASE_COLORS[item.phase],
                        minWidth: '4rem',
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

          <div className="mt-6 flex gap-6 text-sm">
            <span className="flex items-center gap-2">
              <span className="h-3 w-3 rounded bg-zips-orange" /> Phase 1 (0–24 mo)
            </span>
            <span className="flex items-center gap-2">
              <span className="h-3 w-3 rounded bg-zips-navy" /> Phase 2 (24–48 mo)
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
