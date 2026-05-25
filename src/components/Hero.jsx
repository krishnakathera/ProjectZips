export default function Hero({ onOpenMap }) {
  return (
    <section className="relative overflow-hidden bg-zips-navy text-white">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(240,90,40,0.15)_0%,_transparent_60%)]" />
      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-24">
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-zips-orange sm:mb-3 sm:text-sm">
          Telangana · Phase 1 Focus
        </p>
        <h1 className="max-w-3xl text-3xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
          Look Better.{' '}
          <span className="text-zips-orange">Pay Less.</span>
        </h1>
        <p className="mt-4 max-w-2xl text-base text-gray-300 sm:mt-5 sm:text-xl">
          Affordable premium garment care for India — dry clean quality at dhobi prices.
          Hub-and-spoke network powered by our Tukkuguda central plant.
        </p>
        <div className="mt-6 flex flex-wrap gap-4 sm:mt-8">
          <button
            type="button"
            onClick={onOpenMap}
            className="w-full rounded-full bg-zips-orange px-8 py-3 text-base font-bold transition hover:bg-zips-orange-dark sm:w-auto"
          >
            Open Network Map
          </button>
        </div>
      </div>
      <div className="border-t border-white/10 bg-zips-orange">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-2 px-4 py-3 text-center text-xs font-semibold sm:flex-row sm:flex-wrap sm:gap-10 sm:py-4 sm:text-base">
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
