import React from 'react'

export default function CropInfo({ tile, cropDef, onHarvest, onClose }) {
  if (!tile || !cropDef) return null

  const maxStage = cropDef.stages.length - 1
  const isHarvestReady = tile.stage >= maxStage
  const nextStageLabel = isHarvestReady ? null : cropDef.stageLabels[tile.stage + 1]
  const sessionsNeeded = isHarvestReady ? 0 : cropDef.sessionsPerStage - tile.sessionsAtStage

  return (
    <div className="bg-white rounded-2xl shadow-md p-4 mx-4 mb-4 animate-slide-up">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl">{cropDef.stages[tile.stage]}</span>
            <div>
              <p className="font-bold text-gray-800">{cropDef.name}</p>
              <p className="text-xs text-gray-500">{cropDef.stageLabels[tile.stage]}</p>
            </div>
          </div>

          {!isHarvestReady && (
            <div className="mt-2">
              <p className="text-xs text-gray-400 mb-1">Next: {nextStageLabel}</p>
              <div className="flex gap-1">
                {Array.from({ length: cropDef.sessionsPerStage }).map((_, i) => (
                  <div
                    key={i}
                    className={`h-2 w-6 rounded-full ${i < tile.sessionsAtStage ? 'bg-leaf-400' : 'bg-gray-200'}`}
                  />
                ))}
              </div>
              <p className="text-xs text-gray-400 mt-1">{sessionsNeeded} session{sessionsNeeded !== 1 ? 's' : ''} to grow</p>
            </div>
          )}
        </div>

        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 text-lg leading-none p-1"
        >
          ✕
        </button>
      </div>

      {isHarvestReady && (
        <button
          onClick={onHarvest}
          className="mt-3 w-full py-2 bg-amber-400 hover:bg-amber-500 text-white font-bold rounded-xl transition-colors animate-pulse-soft"
        >
          Harvest! +{cropDef.harvestCoins} 🪙
        </button>
      )}
    </div>
  )
}
