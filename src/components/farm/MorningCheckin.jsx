import React from 'react'
import { MORNING_COINS } from '../../constants/gameConfig.js'
import { playMorningCollect } from '../../utils/audioUtils.js'

export default function MorningCheckin({ visible, rewards, onCollect }) {
  if (!visible) return null

  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'

  return (
    <div className="fixed inset-0 bg-black/30 flex items-end justify-center z-50">
      <div className="bg-white rounded-t-3xl shadow-2xl p-6 w-full max-w-md animate-slide-up pb-10">
        <div className="text-center mb-5">
          <div className="text-5xl mb-3">🌅</div>
          <h2 className="text-xl font-bold text-gray-800">{greeting}!</h2>
          <p className="text-gray-500 text-sm mt-1">Your farm has been busy while you were away.</p>
        </div>

        <div className="bg-amber-50 rounded-2xl p-4 mb-5 flex items-center gap-3">
          <span className="text-3xl">🪙</span>
          <div>
            <p className="font-bold text-amber-700">+{MORNING_COINS} passive coins</p>
            <p className="text-xs text-amber-500">Your farm earned while you rested</p>
          </div>
        </div>

        <button
          onClick={() => { playMorningCollect(); onCollect() }}
          className="w-full py-3 bg-leaf-500 hover:bg-leaf-600 text-white font-bold rounded-2xl transition-colors"
        >
          Collect &amp; Start Your Day 🌱
        </button>
      </div>
    </div>
  )
}
