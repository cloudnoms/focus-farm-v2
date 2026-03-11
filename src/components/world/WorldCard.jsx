import React from 'react'

export default function WorldCard({ world, isActive, isUnlocked, onSelect }) {
  return (
    <button
      onClick={isUnlocked ? onSelect : undefined}
      disabled={!isUnlocked}
      className={`w-full text-left p-4 rounded-2xl border-2 transition-all ${
        isActive
          ? 'border-leaf-500 bg-white shadow-md scale-[1.01]'
          : isUnlocked
          ? 'border-gray-200 bg-white hover:border-leaf-300 hover:shadow-sm'
          : 'border-gray-100 bg-gray-50 opacity-60 cursor-not-allowed'
      }`}
    >
      <div className="flex items-center gap-3">
        <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-3xl flex-shrink-0 ${
          isUnlocked ? 'bg-gradient-to-br ' + world.bgFrom + ' ' + world.bgTo : 'bg-gray-100 grayscale'
        }`}>
          {world.icon}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <p className="font-bold text-gray-800 text-sm">{world.name}</p>
            {isActive && (
              <span className="text-xs bg-leaf-100 text-leaf-700 font-semibold px-2 py-0.5 rounded-full">
                Active
              </span>
            )}
          </div>
          <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{world.description}</p>

          {!isUnlocked && (
            <p className="text-xs text-amber-600 font-semibold mt-1">
              🔒 {world.unlockHint}
            </p>
          )}
        </div>

        {isUnlocked && !isActive && (
          <span className="text-gray-300 text-lg flex-shrink-0">›</span>
        )}
      </div>
    </button>
  )
}
