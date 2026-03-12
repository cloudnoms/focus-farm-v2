import React from 'react'
import FarmTile from './FarmTile.jsx'
import { GRID_SIZE } from '../../constants/gameConfig.js'

export default function FarmGrid({ grid, selectedTile, placingCropId, onTileClick }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
        gap: '2px',
        padding: '6px',
        background: '#2a1a0a',
        borderRadius: '4px',
        border: '3px solid #1a0e05',
        boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.6), 0 4px 16px rgba(0,0,0,0.4)',
      }}
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
