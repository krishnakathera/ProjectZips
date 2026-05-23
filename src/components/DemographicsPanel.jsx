import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'
import demographics from '../data/demographics.json'

const TIER_COLORS = ['#f05a28', '#1a2332', '#2563eb', '#f59e0b']

function TradeRadiusTable({ compact = false }) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <div
        className={`border-b border-gray-100 bg-zips-navy text-white ${
          compact ? 'px-3 py-2' : 'px-4 py-3'
        }`}
      >
        <h3 className={compact ? 'text-sm font-bold' : 'text-lg font-bold'}>
          Trade radius demographics
        </h3>
        <p className="text-xs text-gray-300">2026 catchment by anchor (3 / 5 / 10 km)</p>
      </div>
      <div className={compact ? '' : 'overflow-x-auto'}>
        <table className={`w-full text-left ${compact ? 'text-xs' : 'min-w-[640px] text-sm'}`}>
          <thead className="bg-zips-gray-50 text-xs uppercase text-gray-500">
            <tr>
              <th className={compact ? 'px-2 py-2' : 'px-4 py-3'}>Anchor</th>
              <th className={compact ? 'px-2 py-2' : 'px-4 py-3'}>3 km</th>
              <th className={compact ? 'px-2 py-2' : 'px-4 py-3'}>5 km</th>
              <th className={compact ? 'px-2 py-2' : 'px-4 py-3'}>10 km</th>
              <th className={compact ? 'px-2 py-2' : 'px-4 py-3'}>HH (5 km)</th>
              <th className={compact ? 'px-2 py-2' : 'px-4 py-3'}>Income</th>
            </tr>
          </thead>
          <tbody>
            {demographics.tradeRadius.map((row) => (
              <tr key={row.anchor} className="border-t border-gray-100 hover:bg-orange-50/50">
                <td
                  className={`font-medium text-zips-navy ${compact ? 'max-w-[10rem] break-words px-2 py-2' : 'px-4 py-3'}`}
                >
                  {row.anchor}
                </td>
                <td className={compact ? 'px-2 py-2' : 'px-4 py-3'}>
                  {row.pop3km.toLocaleString('en-IN')}
                </td>
                <td className={compact ? 'px-2 py-2' : 'px-4 py-3'}>
                  {row.pop5km.toLocaleString('en-IN')}
                </td>
                <td className={compact ? 'px-2 py-2' : 'px-4 py-3'}>
                  {row.pop10km.toLocaleString('en-IN')}
                </td>
                <td className={compact ? 'px-2 py-2' : 'px-4 py-3'}>
                  {row.households5km.toLocaleString('en-IN')}
                </td>
                <td className={`text-gray-600 ${compact ? 'px-2 py-2' : 'px-4 py-3'}`}>
                  {row.incomeTier}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default function DemographicsPanel({ sidebar = false }) {
  if (sidebar) {
    return <TradeRadiusTable compact />
  }

  return (
    <section id="demographics" className="bg-zips-gray-50 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <h2 className="text-3xl font-extrabold text-zips-navy">Demographics</h2>
        <p className="mt-2 text-gray-600">
          2026 population, household, and income analysis within targeted trade radiuses.
        </p>

        <div className="mt-8 grid min-w-0 gap-6 lg:grid-cols-2 lg:items-start">
          <div className="min-w-0">
            <TradeRadiusTable />
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-bold text-zips-navy">Urban Income Tiers</h3>
            <p className="mt-1 text-sm text-gray-500">Target household segments — Hyderabad metro</p>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={demographics.incomeTiers}
                  dataKey="share"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label={({ name, share }) => `${name} ${share}%`}
                >
                  {demographics.incomeTiers.map((_, i) => (
                    <Cell key={i} fill={TIER_COLORS[i % TIER_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <ul className="mt-4 space-y-2 text-sm">
              {demographics.incomeTiers.map((tier) => (
                <li key={tier.name} className="flex justify-between border-b border-gray-100 pb-2">
                  <span className="font-medium">{tier.name}</span>
                  <span className="text-gray-500">{tier.income}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
