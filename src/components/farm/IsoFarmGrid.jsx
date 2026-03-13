import React, { useMemo } from 'react'
import { GRID_SIZE } from '../../constants/gameConfig.js'
import { CROPS } from '../../constants/cropData.js'
import { CROP_SPRITES, PALETTE } from '../../assets/sprites.js'

// ── Layout constants ──────────────────────────────────────────────────────────
const VW       = 360
const VH       = 280
const CENTER_X = 180
const TOP_Y    = 78   // y of tile (0,0) center
const HALF_W   = 20   // half tile width  (2:1 iso ratio)
const HALF_H   = 10   // half tile height
const DIRT_D   = 44   // depth of dirt side faces
const CROP_SZ  = 24   // pixel sprite render size

// Convert grid (col, row) → isometric screen (cx, cy)
function iso(col, row) {
  return {
    cx: CENTER_X + (col - row) * HALF_W,
    cy: TOP_Y    + (col + row) * HALF_H,
  }
}

// Platform diamond corners
const PT = [CENTER_X,                         TOP_Y - HALF_H]
const PR = [CENTER_X + GRID_SIZE * HALF_W,   TOP_Y + (GRID_SIZE - 1) * HALF_H]
const PB = [CENTER_X,                         TOP_Y + (2 * GRID_SIZE - 1) * HALF_H]
const PL = [CENTER_X - GRID_SIZE * HALF_W,   TOP_Y + (GRID_SIZE - 1) * HALF_H]

// Render a pixel-art crop sprite directly as SVG rects (no foreignObject needed)
function SvgCrop({ cropId, stage, cx, cy, glow }) {
  const sprites = CROP_SPRITES[cropId]
  if (!sprites) return null
  const data = sprites[Math.min(stage, sprites.length - 1)]
  if (!data?.length) return null
  const cols = data[0].length
  const ps   = CROP_SZ / cols                     // pixel size
  const ox   = cx - CROP_SZ / 2                   // left edge of sprite
  const oy   = cy - HALF_H - CROP_SZ + 2          // sit on top of tile

  return (
    <g filter={glow ? 'url(#isoGlow)' : undefined} style={{ pointerEvents: 'none' }}>
      {data.flatMap((row, ry) =>
        [...row].map((char, rx) => {
          const color = PALETTE[char]
          if (!color) return null
          return (
            <rect
              key={`${rx}-${ry}`}
              x={ox + rx * ps}
              y={oy + ry * ps}
              width={ps + 0.3}
              height={ps + 0.3}
              fill={color}
              shapeRendering="crispEdges"
            />
          )
        })
      )}
    </g>
  )
}

// Dirt pebble decoration for side faces
function DirtPebbles() {
  const pebbles = [
    { x: 80,  y: 248, rx: 12, ry: 7 },
    { x: 120, y: 258, rx: 10, ry: 6 },
    { x: 160, y: 264, rx: 9,  ry: 6 },
    { x: 65,  y: 238, rx: 8,  ry: 5 },
    { x: 140, y: 252, rx: 11, ry: 6 },
    { x: 250, y: 250, rx: 11, ry: 7 },
    { x: 290, y: 260, rx: 10, ry: 6 },
    { x: 325, y: 247, rx: 9,  ry: 5 },
    { x: 270, y: 264, rx: 9,  ry: 6 },
    { x: 310, y: 254, rx: 10, ry: 6 },
  ]
  return (
    <>
      {pebbles.map((p, i) => (
        <ellipse key={i} cx={p.x} cy={p.y} rx={p.rx} ry={p.ry}
          fill={i < 5 ? '#7a4820' : '#4a2a10'}
          opacity={0.65 + (i % 3) * 0.1}
        />
      ))}
    </>
  )
}

export default function IsoFarmGrid({ grid, selectedTile, placingCropId, onTileClick }) {
  // Attach col/row to each tile and depth-sort back → front (ascending col+row)
  const sorted = useMemo(() =>
    grid
      .map((tile, i) => ({ tile, col: i % GRID_SIZE, row: Math.floor(i / GRID_SIZE) }))
      .sort((a, b) => (a.col + a.row) - (b.col + b.row)),
    [grid]
  )

  return (
    <svg
      viewBox={`0 0 ${VW} ${VH}`}
      width="100%"
      style={{ display: 'block', overflow: 'visible' }}
    >
      <defs>
        <linearGradient id="isoGrass" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#72c442"/>
          <stop offset="45%"  stopColor="#5daa2a"/>
          <stop offset="100%" stopColor="#4a9020"/>
        </linearGradient>
        <linearGradient id="isoDirtL" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="#a06030"/>
          <stop offset="100%" stopColor="#8a4e22"/>
        </linearGradient>
        <linearGradient id="isoDirtR" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="#6b3a18"/>
          <stop offset="100%" stopColor="#5a2e10"/>
        </linearGradient>
        <filter id="isoGlow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="2.5" result="blur"/>
          <feMerge>
            <feMergeNode in="blur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* ── Platform: grass top ── */}
      <polygon
        points={`${PT[0]},${PT[1]} ${PR[0]},${PR[1]} ${PB[0]},${PB[1]} ${PL[0]},${PL[1]}`}
        fill="url(#isoGrass)"
      />

      {/* ── Platform: left dirt face ── */}
      <polygon
        points={`${PL[0]},${PL[1]} ${PB[0]},${PB[1]} ${PB[0]},${PB[1]+DIRT_D} ${PL[0]},${PL[1]+DIRT_D}`}
        fill="url(#isoDirtL)"
      />
      {/* ── Platform: right dirt face ── */}
      <polygon
        points={`${PR[0]},${PR[1]} ${PB[0]},${PB[1]} ${PB[0]},${PB[1]+DIRT_D} ${PR[0]},${PR[1]+DIRT_D}`}
        fill="url(#isoDirtR)"
      />

      {/* ── Dirt pebbles ── */}
      <DirtPebbles />

      {/* ── Bottom edge lines ── */}
      <line x1={PL[0]} y1={PL[1]+DIRT_D} x2={PB[0]} y2={PB[1]+DIRT_D} stroke="#3a1e08" strokeWidth={2}/>
      <line x1={PB[0]} y1={PB[1]+DIRT_D} x2={PR[0]} y2={PR[1]+DIRT_D} stroke="#2a1208" strokeWidth={2}/>

      {/* ── Grass edge highlight ── */}
      <polyline
        points={`${PT[0]},${PT[1]} ${PR[0]},${PR[1]} ${PB[0]},${PB[1]} ${PL[0]},${PL[1]} ${PT[0]},${PT[1]}`}
        fill="none" stroke="#86d44a" strokeWidth={1} opacity={0.35}
      />

      {/* ── Tiles + crops (depth sorted) ── */}
      {sorted.map(({ tile, col, row }) => {
        const { cx, cy } = iso(col, row)
        const crop       = tile.cropId ? CROPS[tile.cropId] : null
        const maxStage   = crop ? crop.stages.length - 1 : 0
        const isHarvest  = !!(crop && tile.stage >= maxStage)
        const isGrowing  = !!(crop && !isHarvest && tile.stage > 0)
        const isSelected = selectedTile === tile.id
        const canPlace   = !!placingCropId && tile.type === 'empty'

        // Soil color
        let soilFill = '#4e3015'
        if (isHarvest)     soilFill = '#5a4800'
        else if (isGrowing) soilFill = '#4a3218'
        else if (crop)      soilFill = '#3a2010'

        const pts = `${cx},${cy-HALF_H} ${cx+HALF_W},${cy} ${cx},${cy+HALF_H} ${cx-HALF_W},${cy}`

        return (
          <g key={tile.id} onClick={() => onTileClick(tile.id)} style={{ cursor: 'pointer' }}>
            {/* Soil face */}
            <polygon points={pts} fill={soilFill} stroke="#2a1a0a" strokeWidth={0.5}/>

            {/* Inner highlight */}
            <polygon
              points={`${cx},${cy-HALF_H+1} ${cx+HALF_W-2},${cy} ${cx},${cy+HALF_H-1} ${cx-HALF_W+2},${cy}`}
              fill="rgba(255,255,255,0.07)"
              style={{ pointerEvents: 'none' }}
            />

            {/* Selection / placing / harvest ring */}
            {(isSelected || canPlace || isHarvest) && (
              <polygon
                points={pts}
                fill="none"
                stroke={isSelected ? '#fbbf24' : canPlace ? '#86efac' : '#f59e0b'}
                strokeWidth={isSelected ? 2 : 1.5}
                strokeDasharray={canPlace ? '4,3' : undefined}
                filter={isHarvest && !isSelected ? 'url(#isoGlow)' : undefined}
                style={{ pointerEvents: 'none' }}
              />
            )}

            {/* Plant-here indicator */}
            {canPlace && (
              <text x={cx} y={cy + 4} textAnchor="middle"
                fontSize={8} fill="#86efac" opacity={0.8}
                style={{ pointerEvents: 'none', userSelect: 'none' }}>
                +
              </text>
            )}

            {/* Crop pixel sprite */}
            {crop && (
              <SvgCrop
                cropId={tile.cropId}
                stage={tile.stage}
                cx={cx} cy={cy}
                glow={isHarvest}
              />
            )}
          </g>
        )
      })}
    </svg>
  )
}
