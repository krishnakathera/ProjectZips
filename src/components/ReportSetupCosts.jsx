import setupCosts from '../data/setupCosts.json'
import { formatINR } from '../utils/finance'

function SetupCostBlock({ block }) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
      <div className="flex items-center justify-between bg-zips-navy px-4 py-3 text-white">
        <h4 className="font-bold">
          {block.id}. {block.title}
        </h4>
        <span className="font-bold text-zips-orange">{formatINR(block.total)}</span>
      </div>
      {block.note && (
        <p className="border-b border-gray-100 bg-zips-gray-50 px-4 py-2 text-xs text-gray-600">
          {block.note}
        </p>
      )}
      <table className="w-full text-left text-sm">
        <tbody>
          {block.items.map((row) => (
            <tr key={row.item} className="border-t border-gray-100">
              <td className="px-4 py-2 text-gray-700">{row.item}</td>
              <td className="px-4 py-2 text-right font-semibold">{formatINR(row.amount)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function ReportSetupCosts({ compact = false }) {
  if (compact) {
    return (
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-gray-200 text-xs uppercase text-gray-500">
            <th className="py-2 pr-4">Block</th>
            <th className="py-2 text-right">Amount</th>
          </tr>
        </thead>
        <tbody>
          {setupCosts.blocks.map((block) => (
            <tr key={block.id} className="border-t border-gray-100">
              <td className="py-2 pr-4">
                {block.id}. {block.title}
              </td>
              <td className="py-2 text-right font-semibold">{formatINR(block.total)}</td>
            </tr>
          ))}
          <tr className="border-t-2 border-zips-navy font-bold">
            <td className="py-3 pr-4">Grand total</td>
            <td className="py-3 text-right text-zips-orange">{setupCosts.grandTotalDisplay}</td>
          </tr>
        </tbody>
      </table>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-end justify-between gap-2">
        <h3 className="text-lg font-bold text-zips-navy">Initial CAPEX breakdown</h3>
        <p className="text-xl font-extrabold text-zips-orange">{setupCosts.grandTotalDisplay}</p>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        {setupCosts.blocks.map((block) => (
          <SetupCostBlock key={block.id} block={block} />
        ))}
      </div>
    </div>
  )
}
