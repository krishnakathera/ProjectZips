import { useState, useCallback } from 'react'

const DEFAULT_LAYERS = {
  central_plant: true,
  flagship: true,
  additional: true,
  routes: true,
  distanceLines: true,
  radius3: false,
  radius5: false,
  radius10: false,
}

export function useMapLayers() {
  const [layers, setLayers] = useState(DEFAULT_LAYERS)
  const [baseMap, setBaseMap] = useState('satellite')
  const [selectedAnchor, setSelectedAnchor] = useState('plant-001')
  const [highlightStoreId, setHighlightStoreId] = useState(null)

  const toggleLayer = useCallback((key) => {
    setLayers((prev) => ({ ...prev, [key]: !prev[key] }))
  }, [])

  const setRadius = useCallback((km) => {
    setLayers((prev) => ({
      ...prev,
      radius3: km === 3,
      radius5: km === 5,
      radius10: km === 10,
    }))
  }, [])

  const clearRadius = useCallback(() => {
    setLayers((prev) => ({ ...prev, radius3: false, radius5: false, radius10: false }))
  }, [])

  return {
    layers,
    baseMap,
    selectedAnchor,
    highlightStoreId,
    toggleLayer,
    setBaseMap,
    setSelectedAnchor,
    setHighlightStoreId,
    setRadius,
    clearRadius,
  }
}
