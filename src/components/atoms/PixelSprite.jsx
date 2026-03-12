import React, { memo } from 'react'
import { PALETTE } from '../../assets/sprites.js'

function PixelSprite({ data, size = 32 }) {
  if (!data || !data.length) return null
  const rows = data.length
  const cols = data[0].length

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${cols} ${rows}`}
      shapeRendering="crispEdges"
      style={{ imageRendering: 'pixelated', display: 'block' }}
    >
      {data.map((row, y) =>
        [...row].map((char, x) => {
          const color = PALETTE[char]
          if (!color) return null
          return <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill={color} />
        })
      )}
    </svg>
  )
}

export default memo(PixelSprite)
