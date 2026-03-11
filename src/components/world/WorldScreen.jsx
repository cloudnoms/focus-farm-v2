import React from 'react'
import WorldCard from './WorldCard.jsx'
import { WORLDS } from '../../constants/worldData.js'

export default function WorldScreen({ totalSessions, activeWorldId, onSelectWorld }) {
  const unlockedCount = WORLDS.filter(w => totalSessions >= w.sessionsRequired).length
  const nextLocked = WORLDS.find(w => totalSessions < w.sessionsRequired)
  const sessionsToNext = nextLocked ? nextLocked.sessionsRequired - totalSessions : 0

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-b from-sky-50 to-white">
      <div className="px-4 pt-4 pb-2">
        <h1 className="font-bold text-gray-800 text-lg">World Map</h1>
        <p className="text-xs text-gray-400 mt-0.5">
          {unlockedCount} of {WORLDS.length} worlds unlocked
          {nextLocked && ` · ${sessionsToNext} session${sessionsToNext !== 1 ? 's' : ''} to next`}
        </p>
      </div>

      {/* Progress */}
      <div className="px-4 mb-4">
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-sky-400 rounded-full transition-all duration-500"
            style={{ width: `${(unlockedCount / WORLDS.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Active world banner */}
      {activeWorldId && (
        <div className="px-4 mb-3">
          <div className="bg-leaf-50 border border-leaf-200 rounded-2xl px-4 py-2 flex items-center gap-2">
            <span className="text-xl">{WORLDS.find(w => w.id === activeWorldId)?.icon}</span>
            <p className="text-sm text-leaf-700 font-semibold">
              Farming in: {WORLDS.find(w => w.id === activeWorldId)?.name}
            </p>
          </div>
        </div>
      )}

      <div className="px-4 pb-6 space-y-3">
        {WORLDS.map(world => (
          <WorldCard
            key={world.id}
            world={world}
            isActive={activeWorldId === world.id}
            isUnlocked={totalSessions >= world.sessionsRequired}
            onSelect={() => onSelectWorld(world.id)}
          />
        ))}
      </div>

      <div className="px-4 pb-6">
        <div className="bg-sky-50 border border-sky-200 rounded-2xl p-4">
          <p className="text-sm font-semibold text-sky-700 mb-1">How worlds work</p>
          <ul className="text-xs text-sky-600 space-y-1">
            <li>• Complete focus sessions to unlock new environments</li>
            <li>• Your active world sets the farm's visual theme</li>
            <li>• Each world has its own atmosphere and style</li>
            <li>• Switch worlds anytime from this screen</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
