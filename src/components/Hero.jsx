export default function Hero({ onOpenMap }) {
  return (
    <section className="relative overflow-hidden bg-zips-navy text-white">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(240,90,40,0.15)_0%,_transparent_60%)]" />
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-zips-orange">
          Telangana · Phase 1 Focus
        </p>
        <h1 className="max-w-3xl text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
          Look Better.{' '}
          <span className="text-zips-orange">Pay Less.</span>
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-gray-300 sm:text-xl">
          Affordable premium garment care for India — dry clean quality at dhobi prices.
          Hub-and-spoke network powered by our Tukkuguda central plant.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <button
            type="button"
            onClick={onOpenMap}
            className="rounded-full bg-zips-orange px-8 py-3 text-base font-bold transition hover:bg-zips-orange-dark"
          >
            Open Network Map
          </button>
        </div>
      </div>
      <div className="border-t border-white/10 bg-zips-orange">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-6 px-4 py-4 text-sm font-semibold sm:gap-10 sm:text-base">
          <span>Convenient</span>
          <span className="hidden text-white/50 sm:inline">·</span>
          <span>Affordable</span>
          <span className="hidden text-white/50 sm:inline">·</span>
          <span>Fast — In by 9, Out by 5</span>
          <span className="hidden text-white/50 sm:inline">·</span>
          <span>Everyday Low Prices</span>
        </div>
      </div>
    </section>
  )
}
