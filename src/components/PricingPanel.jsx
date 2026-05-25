import pricing from '../data/pricing.json'

export default function PricingPanel() {
  return (
    <section id="pricing" className="bg-zips-gray-50 py-8 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <h2 className="text-2xl font-extrabold text-zips-navy sm:text-3xl">Pricing Strategy</h2>
        <p className="mt-2 text-base font-medium text-zips-orange sm:text-lg">
          {pricing.positioning}
        </p>
        <p className="mt-1 text-sm text-gray-600 sm:text-base">
          Disruptive India-market pricing — dry clean quality at wash &amp; iron prices.
        </p>

        <p className="mt-4 text-xs text-gray-500 lg:hidden">Swipe horizontally to compare prices</p>
        <div className="table-scroll mt-4 rounded-xl border border-gray-200 bg-white shadow-sm sm:mt-8">
          <table className="w-full min-w-[520px] text-left text-sm">
            <thead className="bg-zips-navy text-white">
              <tr>
                <th className="px-4 py-3">Item</th>
                <th className="px-4 py-3">Premium Market</th>
                <th className="px-4 py-3">Organized Metro</th>
                <th className="px-4 py-3 text-zips-orange">Zips India</th>
              </tr>
            </thead>
            <tbody>
              {pricing.comparison.map((row) => (
                <tr key={row.item} className="border-t border-gray-100 hover:bg-orange-50/30">
                  <td className="px-4 py-3 font-semibold">{row.item}</td>
                  <td className="px-4 py-3 text-gray-500">{row.premium}</td>
                  <td className="px-4 py-3 text-gray-500">{row.market}</td>
                  <td className="px-4 py-3 font-bold text-zips-orange">{row.zipsIndia}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
