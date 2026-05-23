import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts'
import volume from '../data/volume.json'

export default function VolumePanel() {
  const stats = [
    { label: 'Plant Capacity', value: '3k–10k', sub: 'garments/day' },
    {
      label: 'Break-Even',
      value: volume.plant.breakEvenDaily.toLocaleString('en-IN'),
      sub: 'garments/day',
    },
    {
      label: 'Target',
      value: volume.plant.targetDaily.toLocaleString('en-IN'),
      sub: 'garments/day',
    },
    { label: 'Avg Price', value: `₹${volume.financials.avgPrice}`, sub: 'per garment' },
  ]

  return (
    <section className="bg-white py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <h2 className="text-3xl font-extrabold text-zips-navy">Volume &amp; Plant Projections</h2>
        <p className="mt-2 text-gray-600">
          Tukkuguda central plant capacity and daily garment processing targets.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-gray-200 bg-zips-gray-50 p-5 text-center"
            >
              <p className="text-3xl font-extrabold text-zips-orange">{stat.value}</p>
              <p className="mt-1 font-semibold text-zips-navy">{stat.label}</p>
              <p className="text-sm text-gray-500">{stat.sub}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-bold text-zips-navy">Daily Garment Volume Growth</h3>
          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={volume.projections}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e9ecef" />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={(v) => `${(v / 1000).toFixed(1)}k`} />
              <Tooltip formatter={(v) => [`${v.toLocaleString('en-IN')} garments/day`, 'Volume']} />
              <ReferenceLine
                y={volume.plant.breakEvenDaily}
                stroke="#16a34a"
                strokeDasharray="5 5"
                label={{ value: 'Break-even', fill: '#16a34a', fontSize: 12 }}
              />
              <Line
                type="monotone"
                dataKey="garments"
                stroke="#f05a28"
                strokeWidth={3}
                dot={{ fill: '#f05a28', r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-8 overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
          <table className="w-full min-w-[480px] text-left text-sm">
            <thead className="bg-zips-orange text-white">
              <tr>
                <th className="px-4 py-3">Period</th>
                <th className="px-4 py-3">Drop Points</th>
                <th className="px-4 py-3">Garments / Day</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {volume.milestones.map((m) => (
                <tr key={m.period} className="border-t border-gray-100">
                  <td className="px-4 py-3 font-medium">{m.period}</td>
                  <td className="px-4 py-3">{m.drops}</td>
                  <td className="px-4 py-3">
                    {m.garmentsMin.toLocaleString('en-IN')} –{' '}
                    {m.garmentsMax.toLocaleString('en-IN')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
