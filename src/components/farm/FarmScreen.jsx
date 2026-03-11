import React, { useState } from 'react'
import FarmGrid from './FarmGrid.jsx'
import CropInfo from './CropInfo.jsx'
import MorningCheckin from './MorningCheckin.jsx'
import { useFarm } from '../../hooks/useFarm.js'
import { CROPS, CROP_LIST } from '../../constants/cropData.js'
import { MILESTONES } from '../../constants/gameConfig.js'

export default function FarmScreen({
  gameState,
  plantCrop,
  harvestCrop,
  morningRewards,
  onDismissMorning,
}) {
  const farm = useFarm(gameState, plantCrop, harvestCrop)
  const [showInventory, setShowInventory] = useState(false)

  const inventoryItems = CROP_LIST.filter(c => gameState.inventory[c.id] > 0)
  const nextMilestone = MILESTONES.find(m => !gameState.unlockedMilestones.includes(m.id))

  return (
    <div className="flex flex-col min-h-[calc(100vh-64px)] bg-gradient-to-b from-sky-50 to-leaf-50">
      <MorningCheckin
        visible={!!morningRewards}
        rewards={morningRewards}
        onCollect={onDismissMorning}
      />

      {/* Farm header */}
      <div className="px-4 pt-4 pb-2">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="font-bold text-gray-800 text-lg">My Farm</h1>
            {nextMilestone && (
              <p className="text-xs text-gray-400">
                {nextMilestone.icon} {nextMilestone.label} in {nextMilestone.sessions - gameState.totalSessions} more sessions
              </p>
            )}
          </div>

          <div className="flex items-center gap-2">
            {gameState.unlockedMilestones.map(id => {
              const m = MILESTONES.find(x => x.id === id)
              return m ? <span key={id} className="text-xl" title={m.label}>{m.icon}</span> : null
            })}
          </div>
        </div>

        {/* Placement mode banner */}
        {farm.placingCropId && (
          <div className="bg-amber-100 border border-amber-300 rounded-xl p-2 flex items-center justify-between mb-2">
            <p className="text-sm text-amber-700 font-semibold">
              Tap an empty tile to plant {CROPS[farm.placingCropId]?.name}
            </p>
            <button
              onClick={farm.cancelPlacing}
              className="text-amber-500 hover:text-amber-700 text-sm font-bold px-2"
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      {/* Farm grid */}
      <div className="px-3">
        <FarmGrid
          grid={gameState.farmGrid}
          selectedTile={farm.selectedTile}
          placingCropId={farm.placingCropId}
          onTileClick={farm.selectTile}
        />
      </div>

      {/* Crop info panel */}
      {farm.selectedTileData?.type === 'crop' && farm.selectedCropDef && (
        <CropInfo
          tile={farm.selectedTileData}
          cropDef={farm.selectedCropDef}
          onHarvest={() => farm.harvest(farm.selectedTile)}
          onClose={() => farm.selectTile(farm.selectedTile)}
        />
      )}

      {/* Inventory bar */}
      <div className="mt-auto px-4 py-3">
        {inventoryItems.length > 0 ? (
          <div>
            <p className="text-xs text-gray-400 mb-2 font-semibold uppercase tracking-wide">
              Inventory — tap seed to plant
            </p>
            <div className="flex gap-2 flex-wrap">
              {inventoryItems.map(crop => (
                <button
                  key={crop.id}
                  onClick={() => farm.startPlacing(crop.id)}
                  className={`flex items-center gap-1 px-3 py-2 rounded-xl border transition-all ${
                    farm.placingCropId === crop.id
                      ? 'bg-leaf-500 border-leaf-600 text-white'
                      : 'bg-white border-gray-200 hover:border-leaf-400 text-gray-700'
                  }`}
                >
                  <span className="text-lg">{crop.stages[0]}</span>
                  <span className="text-sm font-semibold">{crop.name}</span>
                  <span className={`text-xs px-1.5 py-0.5 rounded-full font-bold ${
                    farm.placingCropId === crop.id ? 'bg-leaf-400' : 'bg-gray-100 text-gray-500'
                  }`}>
                    {gameState.inventory[crop.id]}
                  </span>
                </button>
              ))}
            </div>
            {gameState.energy === 0 && (
              <p className="text-xs text-amber-600 mt-2">⚡ Complete a focus session to earn energy for planting</p>
            )}
          </div>
        ) : (
          <div className="text-center py-4 text-gray-400">
            <p className="text-sm">No seeds in inventory.</p>
            <p className="text-xs mt-1">Visit the Shop to buy seeds 🌱</p>
          </div>
        )}
      </div>
    </div>
  )
}
