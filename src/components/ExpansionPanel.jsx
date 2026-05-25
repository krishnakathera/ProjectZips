import { useState } from 'react'
import expansion from '../data/expansion.json'
import setupCosts from '../data/setupCosts.json'
import ReportSetupCosts from './ReportSetupCosts'

export default function ExpansionPanel() {
  const [showCapex, setShowCapex] = useState(false)

  return (
    <section id="expansion" className="bg-zips-gray-50 py-8 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <h2 className="text-2xl font-extrabold text-zips-navy sm:text-3xl">Expansion Strategy</h2>
        <p className="mt-2 text-sm text-gray-600 sm:text-base">
          Two-phase rollout — Hyderabad dominance first, then national metro expansion.
        </p>

        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          {expansion.phases.map((phase) => (
            <div
              key={phase.id}
              className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg"
            >
              <div className="bg-zips-navy px-4 py-4 sm:px-6">
                <span className="rounded-full bg-zips-orange px-3 py-1 text-xs font-bold uppercase">
                  {phase.name}
                </span>
                <h3 className="mt-2 text-xl font-bold text-white">{phase.title}</h3>
                <p className="text-sm text-gray-300">{phase.timeline}</p>
              </div>
              <div className="p-4 sm:p-6">
                <p className="text-gray-600">{phase.description}</p>
                <ul className="mt-4 space-y-2">
                  {phase.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2 text-sm">
                      <span className="mt-0.5 text-zips-orange">✓</span>
                      {h}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 grid grid-cols-2 gap-3 border-t border-gray-100 pt-4">
                  {Object.entries(phase.metrics).map(([key, val]) => (
                    <div key={key}>
                      <p className="text-xs uppercase text-gray-500">
                        {key.replace(/([A-Z])/g, ' $1')}
                      </p>
                      <p className="font-bold text-zips-orange">{val}</p>
                    </div>
                  ))}
                </div>

                {phase.id === 1 && (
                  <div className="mt-4 border-t border-gray-100 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowCapex((v) => !v)}
                      className="text-sm font-semibold text-zips-orange hover:underline"
                    >
                      {showCapex ? 'Hide' : 'Show'} initial CAPEX breakdown ({setupCosts.grandTotalDisplay})
                    </button>
                    {showCapex && (
                      <div className="mt-4">
                        <ReportSetupCosts compact />
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
