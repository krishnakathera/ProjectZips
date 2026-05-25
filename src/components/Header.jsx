const TABS = [
  { id: 'dashboard', label: 'Dashboard', shortLabel: 'Home' },
  { id: 'map', label: 'Network Map', shortLabel: 'Map' },
]

export default function Header({ activeTab = 'dashboard', onTabChange }) {
  return (
    <header className="safe-top sticky top-0 z-50 bg-zips-navy text-white shadow-lg">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-3 py-2.5 sm:gap-4 sm:px-6 sm:py-3">
        <button
          type="button"
          onClick={() => onTabChange?.('dashboard')}
          className="flex min-w-0 items-center gap-2"
        >
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-zips-orange text-base font-extrabold sm:h-9 sm:w-9 sm:text-lg">
            Z
          </span>
          <span className="truncate text-base font-bold tracking-tight sm:text-xl">
            Zips <span className="text-zips-orange">India</span>
          </span>
        </button>

        <nav
          className="flex shrink-0 gap-0.5 rounded-full bg-white/10 p-0.5 sm:gap-1 sm:p-1"
          aria-label="Main navigation"
        >
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => onTabChange?.(tab.id)}
              className={`rounded-full px-2.5 py-1.5 text-xs font-semibold transition sm:px-4 sm:py-1.5 sm:text-sm ${
                activeTab === tab.id
                  ? 'bg-zips-orange text-white'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              <span className="sm:hidden">{tab.shortLabel}</span>
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </header>
  )
}
