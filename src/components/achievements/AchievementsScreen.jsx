import React from 'react'
import AchievementCard from './AchievementCard.jsx'
import { ACHIEVEMENTS } from '../../constants/achievementsData.js'

export default function AchievementsScreen({ achievements, totalSessions, streak }) {
  const earned = ACHIEVEMENTS.filter(a => achievements[a.id])
  const locked = ACHIEVEMENTS.filter(a => !achievements[a.id])

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-b from-amber-50 to-white">
      <div className="px-4 pt-4 pb-2">
        <h1 className="font-bold text-gray-800 text-lg">Achievements</h1>
        <p className="text-xs text-gray-400 mt-0.5">
          {earned.length} of {ACHIEVEMENTS.length} unlocked
        </p>
      </div>

      {/* Stats row */}
      <div className="px-4 mb-4">
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-white rounded-2xl border border-gray-100 p-3 text-center shadow-sm">
            <p className="text-2xl font-bold text-leaf-600">{totalSessions}</p>
            <p className="text-xs text-gray-400 mt-0.5">Sessions</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-3 text-center shadow-sm">
            <p className="text-2xl font-bold text-orange-500">{streak}</p>
            <p className="text-xs text-gray-400 mt-0.5">Day Streak</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-3 text-center shadow-sm">
            <p className="text-2xl font-bold text-amber-500">{earned.length}</p>
            <p className="text-xs text-gray-400 mt-0.5">Earned</p>
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="px-4 mb-4">
        <div className="flex justify-between text-xs text-gray-400 mb-1">
          <span>Progress</span>
          <span>{earned.length}/{ACHIEVEMENTS.length}</span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-amber-400 rounded-full transition-all duration-500"
            style={{ width: `${(earned.length / ACHIEVEMENTS.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Earned */}
      {earned.length > 0 && (
        <div className="px-4 mb-4">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Unlocked</p>
          <div className="space-y-2">
            {earned.map(a => (
              <AchievementCard key={a.id} achievement={a} earned />
            ))}
          </div>
        </div>
      )}

      {/* Locked */}
      {locked.length > 0 && (
        <div className="px-4 pb-6">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Locked</p>
          <div className="space-y-2">
            {locked.map(a => (
              <AchievementCard key={a.id} achievement={a} earned={false} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
