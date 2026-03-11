import React from 'react'

export default function EnergyDisplay({ energy }) {
  return (
    <div className="flex items-center gap-1 bg-emerald-50 border border-emerald-200 rounded-full px-3 py-1">
      <span className="text-lg">⚡</span>
      <span className="font-bold text-emerald-700 text-sm">{energy}</span>
    </div>
  )
}
