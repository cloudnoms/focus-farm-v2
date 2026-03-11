import React from 'react'

export default function AchievementCard({ achievement, earned }) {
  return (
    <div className={`flex items-center gap-4 p-4 rounded-2xl border transition-all ${
      earned
        ? 'bg-white border-amber-200 shadow-sm'
        : 'bg-gray-50 border-gray-100 opacity-60'
    }`}>
      <div className={`w-12 h-12 flex items-center justify-center rounded-xl text-2xl flex-shrink-0 ${
        earned ? 'bg-amber-50' : 'bg-gray-100 grayscale'
      }`}>
        {achievement.icon}
      </div>

      <div className="flex-1 min-w-0">
        <p className={`font-bold text-sm ${earned ? 'text-gray-800' : 'text-gray-400'}`}>
          {achievement.title}
        </p>
        <p className={`text-xs mt-0.5 ${earned ? 'text-gray-500' : 'text-gray-400'}`}>
          {achievement.description}
        </p>
      </div>

      <div className="flex-shrink-0 text-right">
        {earned ? (
          <div className="flex flex-col items-end gap-1">
            <span className="text-lg">✅</span>
            <span className="text-xs text-amber-600 font-semibold">{achievement.reward}</span>
          </div>
        ) : (
          <span className="text-xs text-gray-300 font-medium">🔒</span>
        )}
      </div>
    </div>
  )
}
