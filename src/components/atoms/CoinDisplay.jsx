import React from 'react'

export default function CoinDisplay({ coins }) {
  return (
    <div className="flex items-center gap-1 bg-amber-50 border border-amber-200 rounded-full px-3 py-1">
      <span className="text-lg">🪙</span>
      <span className="font-bold text-amber-700 text-sm">{coins}</span>
    </div>
  )
}
