export default function ResizableDivider({ onResizeStart }) {
  return (
    <div
      role="separator"
      aria-orientation="vertical"
      aria-label="Resize map and data panels"
      onPointerDown={onResizeStart}
      className="group relative hidden w-2 shrink-0 cursor-col-resize touch-none select-none lg:block"
    >
      <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-gray-300 transition group-hover:bg-zips-orange group-active:bg-zips-orange" />
      <div className="absolute left-1/2 top-1/2 flex h-10 w-4 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm transition group-hover:border-zips-orange group-hover:shadow-md">
        <span className="text-[10px] font-bold tracking-tighter text-gray-400 group-hover:text-zips-orange">
          ⋮⋮
        </span>
      </div>
    </div>
  )
}
