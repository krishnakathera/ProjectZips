export default function Footer() {
  return (
    <footer className="safe-bottom bg-zips-navy py-8 text-gray-300 sm:py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col gap-6 md:flex-row md:justify-between">
          <div>
            <p className="text-xl font-bold text-white">
              Zips <span className="text-zips-orange">India</span>
            </p>
            <p className="mt-2 max-w-md text-sm">
              Affordable premium garment care network. Hub-and-spoke model adapted for
              Telangana and India.
            </p>
          </div>
          <div className="text-sm">
            <p className="font-semibold text-white">Data Sources (2026)</p>
            <ul className="mt-2 space-y-1 text-gray-400">
              <li>StatisticsTimes — Telangana population</li>
              <li>MacroTrends — Hyderabad metro</li>
              <li>Telangana State Budget — PCI</li>
              <li>IMARC — India laundry market</li>
            </ul>
          </div>
        </div>
        <p className="mt-8 border-t border-white/10 pt-6 text-center text-xs text-gray-500">
          Inspired by the{' '}
          <a
            href="https://321zips.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zips-orange hover:underline"
          >
            ZIPS Cleaners
          </a>{' '}
          model — adapted for India. © {new Date().getFullYear()} Zips India.
        </p>
      </div>
    </footer>
  )
}
