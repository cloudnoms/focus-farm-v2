import React, { memo } from 'react'
import { CROPS } from '../../constants/cropData.js'
import PixelCrop from '../atoms/PixelCrop.jsx'

const SOIL_EMPTY   = { bg: '#3d2410', inner: '#4e2e14', border: '#2a1a0a' }
const SOIL_PLANTED = { bg: '#3d2410', inner: '#3a2810', border: '#2a1a0a' }
const SOIL_GROWING = { bg: '#3a2d10', inner: '#4a3a14', border: '#2a200a' }
const SOIL_HARVEST = { bg: '#4a3800', inner: '#6b5200', border: '#2a200a' }

function FarmTile({ tile, isSelected, isPlacing, onClick }) {
  const crop = tile.cropId ? CROPS[tile.cropId] : null
  const maxStage = crop ? crop.stages.length - 1 : 0
  const isHarvest = crop && tile.stage >= maxStage
  const isGrowing = crop && !isHarvest && tile.stage > 0

  let colors = SOIL_EMPTY
  if (isHarvest) colors = SOIL_HARVEST
  else if (isGrowing) colors = SOIL_GROWING
  else if (crop) colors = SOIL_PLANTED

  let ringColor = 'transparent'
  let ringWidth = '0px'
  if (isSelected) { ringColor = '#fbbf24'; ringWidth = '2px' }
  else if (isPlacing && tile.type === 'empty') { ringColor = '#86efac'; ringWidth = '2px' }
  else if (isHarvest) { ringColor = '#f59e0b'; ringWidth = '2px' }

  return (
    <button
      onClick={onClick}
      aria-label={crop ? crop.name : 'Empty tile'}
      style={{
        background: colors.bg,
        border: `1px solid ${colors.border}`,
        outline: `${ringWidth} solid ${ringColor}`,
        outlineOffset: '-2px',
        animation: isHarvest ? 'pulse-soft 2s ease-in-out infinite' : undefined,
      }}
      className="w-full aspect-square flex items-center justify-center cursor-pointer transition-all duration-150 select-none relative overflow-hidden rounded-sm hover:brightness-125 active:scale-95"
    >
      <div className="absolute inset-[2px] rounded-sm" style={{ background: colors.inner }} />
      {crop && (
        <div className="relative z-10 flex items-center justify-center w-full h-full">
          <PixelCrop
            cropId={tile.cropId}
            stage={tile.stage}
            size={28}
            glow={isHarvest}
          />
        </div>
      )}
      {isPlacing && tile.type === 'empty' && (
        <span className="relative z-10 text-green-400 opacity-40 text-xs font-bold">+</span>
      )}
    </button>
  )
}

export default memo(FarmTile)
