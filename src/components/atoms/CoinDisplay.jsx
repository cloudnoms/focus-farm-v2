import React from 'react'
import { CoinIcon } from '../../assets/uiIcons.jsx'

export default function CoinDisplay({ coins }) {
  return (
    <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-200 rounded-full px-3 py-1">
      <CoinIcon size={18} />
      <span className="font-bold text-amber-700 text-sm">{coins}</span>
    </div>
  )
}
