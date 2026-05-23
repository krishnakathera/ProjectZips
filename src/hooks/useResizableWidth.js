import { useCallback, useEffect, useRef, useState } from 'react'

export function useResizableWidth({
  defaultWidth = 680,
  minWidth = 480,
  maxWidth = 1100,
  storageKey,
}) {
  const [width, setWidth] = useState(() => {
    if (storageKey && typeof localStorage !== 'undefined') {
      const stored = Number(localStorage.getItem(storageKey))
      if (!Number.isNaN(stored)) {
        return Math.min(maxWidth, Math.max(minWidth, stored))
      }
    }
    return defaultWidth
  })

  const widthRef = useRef(width)
  widthRef.current = width

  const dragging = useRef(false)
  const startX = useRef(0)
  const startWidth = useRef(0)

  const onResizeStart = useCallback(
    (e) => {
      e.preventDefault()
      dragging.current = true
      startX.current = e.clientX
      startWidth.current = widthRef.current
      document.body.style.cursor = 'col-resize'
      document.body.style.userSelect = 'none'
    },
    []
  )

  useEffect(() => {
    const onMove = (e) => {
      if (!dragging.current) return
      const delta = startX.current - e.clientX
      setWidth(Math.min(maxWidth, Math.max(minWidth, startWidth.current + delta)))
    }

    const onUp = () => {
      if (!dragging.current) return
      dragging.current = false
      document.body.style.cursor = ''
      document.body.style.userSelect = ''
      if (storageKey) {
        localStorage.setItem(storageKey, String(widthRef.current))
      }
    }

    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
    window.addEventListener('pointercancel', onUp)

    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
      window.removeEventListener('pointercancel', onUp)
    }
  }, [maxWidth, minWidth, storageKey])

  return { width, onResizeStart }
}
