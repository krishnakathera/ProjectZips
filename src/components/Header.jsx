const TABS = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'map', label: 'Network Map' },
]

export default function Header({ activeTab = 'dashboard', onTabChange }) {
  return (
    <header className="sticky top-0 z-50 bg-zips-navy text-white shadow-lg">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <button
          type="button"
          onClick={() => onTabChange?.('dashboard')}
          className="flex items-center gap-2"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-md bg-zips-orange text-lg font-extrabold">
            Z
          </span>
          <span className="text-xl font-bold tracking-tight">
            Zips <span className="text-zips-orange">India</span>
          </span>
        </button>

        <nav className="flex gap-1 rounded-full bg-white/10 p-1">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => onTabChange?.(tab.id)}
              className={`rounded-full px-3 py-1.5 text-sm font-semibold transition sm:px-4 ${
                activeTab === tab.id
                  ? 'bg-zips-orange text-white'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  )
}
