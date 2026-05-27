import { useState } from 'react'
import MapView from './MapView'
import DistancePanel from './DistancePanel'
import ResizableDivider from './ResizableDivider'
import { useResizableWidth } from '../hooks/useResizableWidth'
import { useMediaQuery } from '../hooks/useMediaQuery'

const MOBILE_PANELS = [
  { id: 'map', label: 'Map' },
  { id: 'tables', label: 'Tables' },
]

export default function MapPage() {
  const isMobile = useMediaQuery('(max-width: 1023px)')
  const [mobilePanel, setMobilePanel] = useState('map')
  const { width: sidebarWidth, onResizeStart } = useResizableWidth({
    defaultWidth: 680,
    minWidth: 480,
    maxWidth: 1100,
    storageKey: 'zips-map-sidebar-width',
  })

  const showMap = !isMobile || mobilePanel === 'map'
  const showTables = !isMobile || mobilePanel === 'tables'

  return (
    <div className="flex h-[calc(100dvh-52px)] flex-col overflow-hidden sm:h-[calc(100dvh-57px)]">
      <div className="shrink-0 border-b border-gray-200 bg-white px-3 py-2 sm:px-6 sm:py-2.5">
        <h1 className="text-base font-extrabold text-zips-navy sm:text-xl">Network Map</h1>
        <p className="text-xs text-gray-600 sm:text-sm">
          <span className="lg:hidden">Switch between map and distance tables below</span>
          <span className="hidden lg:inline">
            Drag the divider between map and tables to resize · width is remembered
          </span>
        </p>

        {isMobile && (
          <div
            className="mt-2 flex rounded-lg bg-zips-gray-50 p-0.5 ring-1 ring-gray-200 lg:hidden"
            role="tablist"
            aria-label="Map page panels"
          >
            {MOBILE_PANELS.map((panel) => (
              <button
                key={panel.id}
                type="button"
                role="tab"
                aria-selected={mobilePanel === panel.id}
                onClick={() => setMobilePanel(panel.id)}
                className={`flex-1 rounded-md py-2 text-sm font-semibold transition ${
                  mobilePanel === panel.id
                    ? 'bg-white text-zips-navy shadow-sm'
                    : 'text-gray-600'
                }`}
              >
                {panel.label}
              </button>
            ))}
          </div>
        )}
      </div>

      <div
        className="flex min-h-0 flex-1 flex-col lg:flex-row"
        style={{ '--sidebar-width': `${sidebarWidth}px` }}
      >
        <div
          className={`min-h-0 min-w-0 flex-1 lg:min-h-0 ${
            showMap ? 'flex flex-col' : 'hidden lg:flex lg:flex-col'
          }`}
        >
          <MapView
            fullscreen
            fillHeight
            resizeSignal={sidebarWidth}
            mapVisible={showMap}
          />
        </div>

        <ResizableDivider onResizeStart={onResizeStart} />

        <aside
          className={`flex w-full shrink-0 flex-col border-gray-200 bg-zips-gray-50 lg:max-h-none lg:w-[var(--sidebar-width)] lg:border-l lg:border-t-0 ${
            showTables
              ? 'min-h-0 flex-1 border-t lg:max-h-none lg:flex lg:flex-none'
              : 'hidden lg:flex'
          }`}
        >
          <div className="shrink-0 border-b border-gray-200 bg-white px-3 py-2 sm:px-4 sm:py-2.5">
            <h2 className="text-sm font-bold text-zips-navy">Distance tables</h2>
            <p className="text-xs text-gray-500">Scroll for all locations</p>
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-2 py-2 sm:px-4 sm:py-3">
            <div className="space-y-4 pb-2 safe-bottom">
              <DistancePanel sidebar />
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
