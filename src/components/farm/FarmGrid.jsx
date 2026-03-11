import React from 'react'
import FarmTile from './FarmTile.jsx'
import { GRID_SIZE } from '../../constants/gameConfig.js'

export default function FarmGrid({ grid, selectedTile, placingCropId, onTileClick }) {
  return (
    <div
      className="grid gap-1 p-2 bg-soil-100/50 rounded-2xl"
      style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)` }}
    >
      {grid.map(tile => (
        <FarmTile
          key={tile.id}
          tile={tile}
          isSelected={selectedTile === tile.id}
          isPlacing={!!placingCropId}
          onClick={() => onTileClick(tile.id)}
        />
      ))}
    </div>
  )
}
