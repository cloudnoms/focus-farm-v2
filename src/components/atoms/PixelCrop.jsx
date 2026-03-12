import React, { memo } from 'react'
import PixelSprite from './PixelSprite.jsx'
import { CROP_SPRITES } from '../../assets/sprites.js'

function PixelCrop({ cropId, stage, size = 32, glow = false }) {
  const sprites = CROP_SPRITES[cropId]
  if (!sprites) return null
  const data = sprites[Math.min(stage, sprites.length - 1)]

  return (
    <div style={{ filter: glow ? 'drop-shadow(0 0 4px #f0c020)' : undefined }}>
      <PixelSprite data={data} size={size} />
    </div>
  )
}

export default memo(PixelCrop)
