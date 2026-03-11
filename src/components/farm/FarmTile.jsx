import React, { memo } from 'react'
import { CROPS } from '../../constants/cropData.js'

function FarmTile({ tile, isSelected, isPlacing, onClick }) {
  const crop = tile.cropId ? CROPS[tile.cropId] : null
  const emoji = crop ? crop.stages[tile.stage] : null
  const maxStage = crop ? crop.stages.length - 1 : 0
  const isHarvest = crop && tile.stage >= maxStage

  let tileClass = 'w-full aspect-square flex items-center justify-center rounded-lg text-xl cursor-pointer transition-all duration-200 select-none '

  if (isSelected) {
    tileClass += 'bg-leaf-200 ring-2 ring-leaf-500 scale-105 '
  } else if (isPlacing && tile.type === 'empty') {
    tileClass += 'bg-amber-100 ring-2 ring-amber-300 hover:bg-amber-200 hover:scale-105 '
  } else if (tile.type === 'empty') {
    tileClass += 'bg-soil-100 hover:bg-soil-200 hover:scale-105 '
  } else {
    tileClass += 'bg-leaf-100 hover:bg-leaf-200 hover:scale-105 '
  }

  if (isHarvest) {
    tileClass += 'animate-pulse-soft '
  }

  return (
    <button className={tileClass} onClick={onClick} aria-label={crop ? crop.name : 'Empty tile'}>
      {emoji && <span className={tile.stage === 0 ? 'opacity-70' : ''}>{emoji}</span>}
    </button>
  )
}

export default memo(FarmTile)
