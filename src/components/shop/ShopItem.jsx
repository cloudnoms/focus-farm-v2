import React from 'react'
import { playBuySound } from '../../utils/audioUtils.js'
import PixelCrop from '../atoms/PixelCrop.jsx'
import { CoinIcon } from '../../assets/uiIcons.jsx'

export default function ShopItem({ crop, coins, quantity, onBuy }) {
  const canAfford = coins >= crop.seedCost

  function handleBuy() { if (canAfford) { playBuySound(); onBuy() } }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex items-center gap-3">
      <div className="w-14 h-14 flex items-center justify-center bg-leaf-50 rounded-xl flex-shrink-0">
        <PixelCrop cropId={crop.id} stage={3} size={44} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-bold text-gray-800">{crop.seedName}</p>
        <p className="text-xs text-gray-400 mt-0.5">
          {crop.stageLabels.join(' → ')}
        </p>
        <p className="text-xs text-gray-400">
          {crop.sessionsPerStage * (crop.stages.length - 1)} sessions to harvest · +{crop.harvestCoins}
          <span className="inline-flex ml-1 align-middle"><CoinIcon size={12} /></span>
        </p>
        {quantity > 0 && (
          <p className="text-xs text-leaf-600 font-semibold mt-1">In inventory: {quantity}</p>
        )}
      </div>
      <div className="flex flex-col items-end gap-2 flex-shrink-0">
        <div className="flex items-center gap-1">
          <CoinIcon size={16} />
          <span className="font-bold text-amber-600 text-sm">{crop.seedCost}</span>
        </div>
        <button
          onClick={handleBuy}
          disabled={!canAfford}
          className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
            canAfford
              ? 'bg-leaf-500 hover:bg-leaf-600 text-white shadow-sm hover:shadow'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          {canAfford ? 'Buy' : 'Need more'}
        </button>
      </div>
    </div>
  )
}
