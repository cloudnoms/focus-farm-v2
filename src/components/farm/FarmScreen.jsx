import React, { useEffect } from 'react'
import { startFarmMusic, stopFarmMusic } from '../../utils/audioUtils.js'
import FarmGrid from './FarmGrid.jsx'
import CropInfo from './CropInfo.jsx'
import MorningCheckin from './MorningCheckin.jsx'
import { useFarm } from '../../hooks/useFarm.js'
import { CROPS, CROP_LIST } from '../../constants/cropData.js'
import { MILESTONES } from '../../constants/gameConfig.js'

const TREES = ['🌲','🌳','🌲','🌳','🌲','🌳','🌲','🌳','🌲','🌳']
const FLOWERS = ['🌸','🌼','🌺','🌻','🌷','🌸','🌼','🌺','🌻','🌷']

function TreeBorder({ row = false }) {
  return (
    <div className={`flex ${row ? 'flex-row' : 'flex-col'} items-center justify-around`}
      style={{ gap: '1px' }}>
      {TREES.slice(0, row ? 10 : 6).map((t, i) => (
        <span key={i} style={{ fontSize: row ? '18px' : '16px', lineHeight: 1 }}>{t}</span>
      ))}
    </div>
  )
}

export default function FarmScreen({ gameState, plantCrop, harvestCrop, morningRewards, onDismissMorning }) {
  useEffect(() => {
    startFarmMusic()
    return () => stopFarmMusic()
  }, [])

  const farm = useFarm(gameState, plantCrop, harvestCrop)
  const inventoryItems = CROP_LIST.filter(c => gameState.inventory[c.id] > 0)
  const nextMilestone = MILESTONES.find(m => !gameState.unlockedMilestones.includes(m.id))
  const hasRiver = gameState.unlockedMilestones.includes('river')

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] md:h-screen overflow-hidden" style={{ background: '#1a2e0a' }}>
      <MorningCheckin visible={!!morningRewards} rewards={morningRewards} onCollect={onDismissMorning} />

      {/* Sky */}
      <div className="flex items-center justify-between px-4 py-1"
        style={{ background: 'linear-gradient(to bottom, #4a90c4, #7ab8e8)', minHeight: '36px' }}>
        <span className="text-white text-xs font-semibold opacity-80">☁️  My Farm</span>
        <div className="flex items-center gap-2">
          {nextMilestone && (
            <span className="text-white text-xs opacity-70">
              {nextMilestone.icon} {nextMilestone.sessions - gameState.totalSessions} sessions
            </span>
          )}
          {gameState.unlockedMilestones.map(id => {
            const m = MILESTONES.find(x => x.id === id)
            return m ? <span key={id} className="text-base" title={m.label}>{m.icon}</span> : null
          })}
        </div>
      </div>

      {/* Placement banner */}
      {farm.placingCropId && (
        <div className="mx-3 mt-2 px-3 py-1.5 rounded-lg flex items-center justify-between"
          style={{ background: 'rgba(134,239,172,0.15)', border: '1px solid #4ade80' }}>
          <p className="text-xs text-green-300 font-semibold">
            🌱 Tap a soil tile to plant {CROPS[farm.placingCropId]?.name}
          </p>
          <button onClick={farm.cancelPlacing} className="text-green-400 text-xs font-bold px-2">Cancel</button>
        </div>
      )}

      {/* Farm world — trees + grid */}
      <div className="flex-1 flex flex-col items-center justify-center px-2 py-1 overflow-hidden">
        {/* Top tree row */}
        <div className="w-full flex justify-around px-4 mb-0.5">
          {TREES.map((t, i) => <span key={i} style={{ fontSize: '16px' }}>{t}</span>)}
        </div>

        {/* Middle: side trees + grid */}
        <div className="flex items-center gap-1 w-full">
          <div className="flex flex-col justify-around" style={{ minWidth: '22px', gap: '2px' }}>
            {['🌲','🌳','🌿','🌲','🌳','🌿'].map((t,i) => (
              <span key={i} style={{ fontSize: '14px' }}>{t}</span>
            ))}
          </div>

          <div className="flex-1">
            <FarmGrid
              grid={gameState.farmGrid}
              selectedTile={farm.selectedTile}
              placingCropId={farm.placingCropId}
              onTileClick={farm.selectTile}
            />
          </div>

          <div className="flex flex-col justify-around" style={{ minWidth: '22px', gap: '2px' }}>
            {['🌳','🌲','🌿','🌳','🌲','🌿'].map((t,i) => (
              <span key={i} style={{ fontSize: '14px' }}>{t}</span>
            ))}
          </div>
        </div>

        {/* Bottom flowers row */}
        <div className="w-full flex justify-around px-4 mt-0.5">
          {FLOWERS.map((f, i) => <span key={i} style={{ fontSize: '13px' }}>{f}</span>)}
        </div>

        {/* River (milestone unlock) */}
        {hasRiver && (
          <div className="w-full mt-1 rounded-lg flex items-center justify-center gap-1 py-1"
            style={{ background: 'linear-gradient(to right, #2563eb, #3b82f6, #2563eb)', minHeight: '20px' }}>
            {Array.from({ length: 12 }).map((_, i) => (
              <span key={i} style={{ fontSize: '10px' }}>🌊</span>
            ))}
          </div>
        )}
      </div>

      {/* Crop info */}
      {farm.selectedTileData?.type === 'crop' && farm.selectedCropDef && (
        <CropInfo
          tile={farm.selectedTileData}
          cropDef={farm.selectedCropDef}
          onHarvest={() => farm.harvest(farm.selectedTile)}
          onClose={() => farm.selectTile(farm.selectedTile)}
        />
      )}

      {/* Inventory bar */}
      <div className="px-3 py-3" style={{ background: '#2a1a0a', borderTop: '2px solid #1a0e05' }}>
        {inventoryItems.length > 0 ? (
          <div>
            <p className="text-xs text-amber-400/70 mb-2 font-semibold uppercase tracking-wide">
              Seeds — tap to plant
            </p>
            <div className="flex gap-2 flex-wrap">
              {inventoryItems.map(crop => (
                <button
                  key={crop.id}
                  onClick={() => farm.startPlacing(crop.id)}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg transition-all"
                  style={{
                    background: farm.placingCropId === crop.id ? '#4ade80' : '#3d2410',
                    border: `1px solid ${farm.placingCropId === crop.id ? '#22c55e' : '#5c3a1e'}`,
                    color: farm.placingCropId === crop.id ? '#14532d' : '#d6b896',
                  }}
                >
                  <span className="text-base">{crop.stages[0]}</span>
                  <span className="text-xs font-bold">{crop.name}</span>
                  <span className="text-xs px-1.5 py-0.5 rounded font-bold"
                    style={{ background: 'rgba(0,0,0,0.3)' }}>
                    {gameState.inventory[crop.id]}
                  </span>
                </button>
              ))}
            </div>
            {gameState.energy === 0 && (
              <p className="text-xs text-amber-400/60 mt-2">⚡ Complete a focus session to earn planting energy</p>
            )}
          </div>
        ) : (
          <div className="text-center py-2">
            <p className="text-sm text-amber-400/50">No seeds — visit the Shop to buy some 🌱</p>
          </div>
        )}
      </div>
    </div>
  )
}
