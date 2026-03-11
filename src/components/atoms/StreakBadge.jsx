import React from 'react'

export default function StreakBadge({ streak }) {
  if (streak === 0) return null
  return (
    <div className="flex items-center gap-1 bg-orange-50 border border-orange-200 rounded-full px-3 py-1">
      <span className="text-lg">🔥</span>
      <span className="font-bold text-orange-600 text-sm">{streak}</span>
    </div>
  )
}
