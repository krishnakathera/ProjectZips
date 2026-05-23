import expansion from '../data/expansion.json'

export default function ZipsDifference() {
  return (
    <section className="bg-white py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <h2 className="text-center text-3xl font-extrabold text-zips-navy">The Zips India Model</h2>
        <p className="mt-2 text-center text-gray-600">
          Convenient. Affordable. Fast. — inspired by the ZIPS Cleaners hub-and-spoke approach.
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {expansion.modelCards.map((card) => (
            <div
              key={card.title}
              className="rounded-xl border border-gray-200 bg-zips-gray-50 p-6 text-center transition hover:border-zips-orange hover:shadow-lg"
            >
              <span className="text-4xl">{card.icon}</span>
              <h3 className="mt-4 text-lg font-bold text-zips-navy">{card.title}</h3>
              <p className="mt-2 text-sm text-gray-600">{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
