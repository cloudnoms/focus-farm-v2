import { useState, useCallback } from 'react'
import { CROPS } from '../constants/cropData.js'
import { playPlantSound, playHarvestSound } from '../utils/audioUtils.js'

export function useFarm(gameState, plantCrop, harvestCrop) {
  const [selectedTile, setSelectedTile] = useState(null)
  const [placingCropId, setPlacingCropId] = useState(null)

  const selectTile = useCallback((tileId) => {
    if (placingCropId) {
      const tile = gameState.farmGrid[tileId]
      if (tile && tile.type === 'empty') {
        if (gameState.energy >= 1 && gameState.inventory[placingCropId] > 0) {
          plantCrop(tileId, placingCropId)
          playPlantSound()
          setPlacingCropId(null)
          setSelectedTile(null)
        }
      }
      return
    }
    setSelectedTile(prev => prev === tileId ? null : tileId)
  }, [placingCropId, gameState, plantCrop])

  const startPlacing = useCallback((cropId) => {
    setPlacingCropId(cropId)
    setSelectedTile(null)
  }, [])

  const cancelPlacing = useCallback(() => {
    setPlacingCropId(null)
  }, [])

  const harvest = useCallback((tileId) => {
    harvestCrop(tileId)
    playHarvestSound()
    setSelectedTile(null)
  }, [harvestCrop])

  const selectedTileData = selectedTile !== null ? gameState.farmGrid[selectedTile] : null
  const selectedCropDef = selectedTileData?.cropId ? CROPS[selectedTileData.cropId] : null

  return {
    selectedTile,
    placingCropId,
    selectedTileData,
    selectedCropDef,
    selectTile,
    startPlacing,
    cancelPlacing,
    harvest,
  }
}
