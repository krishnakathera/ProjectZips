import MapView from './MapView'
import DistancePanel from './DistancePanel'
import DemographicsPanel from './DemographicsPanel'
import ResizableDivider from './ResizableDivider'
import { useResizableWidth } from '../hooks/useResizableWidth'

export default function MapPage() {
  const { width: sidebarWidth, onResizeStart } = useResizableWidth({
    defaultWidth: 680,
    minWidth: 480,
    maxWidth: 1100,
    storageKey: 'zips-map-sidebar-width',
  })

  return (
    <div className="flex h-[calc(100vh-57px)] flex-col overflow-hidden">
      <div className="shrink-0 border-b border-gray-200 bg-white px-4 py-2.5 sm:px-6">
        <h1 className="text-lg font-extrabold text-zips-navy sm:text-xl">Network Map</h1>
        <p className="text-xs text-gray-600 sm:text-sm">
          Drag the divider between map and tables to resize · width is remembered
        </p>
      </div>

      <div
        className="flex min-h-0 flex-1 flex-col lg:flex-row"
        style={{ '--sidebar-width': `${sidebarWidth}px` }}
      >
        <div className="min-h-0 min-w-0 flex-1 lg:min-h-0">
          <MapView fullscreen fillHeight resizeSignal={sidebarWidth} />
        </div>

        <ResizableDivider onResizeStart={onResizeStart} />

        <aside className="flex max-h-[38vh] w-full shrink-0 flex-col border-t border-gray-200 bg-zips-gray-50 lg:max-h-none lg:w-[var(--sidebar-width)] lg:border-l lg:border-t-0">
          <div className="shrink-0 border-b border-gray-200 bg-white px-4 py-2.5">
            <h2 className="text-sm font-bold text-zips-navy">Distance &amp; demographics</h2>
            <p className="text-xs text-gray-500">Scroll vertically for all tables</p>
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto px-3 py-3 sm:px-4">
            <div className="space-y-4 pb-2">
              <DistancePanel sidebar />
              <DemographicsPanel sidebar />
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
