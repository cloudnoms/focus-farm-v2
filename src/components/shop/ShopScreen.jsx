import React from 'react'
import ShopItem from './ShopItem.jsx'
import CoinDisplay from '../atoms/CoinDisplay.jsx'
import EnergyDisplay from '../atoms/EnergyDisplay.jsx'
import { useShop } from '../../hooks/useShop.js'
import { CROP_LIST } from '../../constants/cropData.js'

export default function ShopScreen({ coins, energy, inventory, buyItem }) {
  const shop = useShop(coins, inventory, buyItem)

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white max-w-2xl mx-auto">
      <div className="px-4 pt-4 pb-2">
        <div className="flex items-center justify-between mb-1">
          <h1 className="font-bold text-gray-800 text-lg">Seed Shop</h1>
          <div className="flex gap-2">
            <CoinDisplay coins={coins} />
            <EnergyDisplay energy={energy} />
          </div>
        </div>
        <p className="text-xs text-gray-400">Complete focus sessions to earn coins and energy</p>
      </div>

      <div className="px-4 py-2 space-y-3">
        {CROP_LIST.map(crop => (
          <ShopItem
            key={crop.id}
            crop={crop}
            coins={coins}
            quantity={inventory[crop.id] || 0}
            onBuy={() => shop.purchaseSeed(crop.id)}
          />
        ))}
      </div>

      <div className="px-4 py-4">
        <div className="bg-leaf-50 border border-leaf-200 rounded-2xl p-4">
          <p className="text-sm font-semibold text-leaf-700 mb-1">How it works</p>
          <ul className="text-xs text-leaf-600 space-y-1">
            <li>• Complete focus sessions to earn 🪙 coins and ⚡ energy</li>
            <li>• Buy seeds here, then plant them on your farm</li>
            <li>• Each session advances your crops one step</li>
            <li>• Harvest ready crops for bonus coins</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
