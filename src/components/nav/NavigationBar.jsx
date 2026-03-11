import React from 'react'

const TABS = [
  { id: 'timer', label: 'Focus', icon: '⏱️' },
  { id: 'farm', label: 'Farm', icon: '🌾' },
  { id: 'shop', label: 'Shop', icon: '🛒' },
  { id: 'world', label: 'World', icon: '🗺️' },
  { id: 'achievements', label: 'Goals', icon: '🏆' },
]

export default function NavigationBar({ activeScreen, onNavigate }) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur border-t border-gray-200 z-40">
      <div className="max-w-md mx-auto flex">
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => onNavigate(tab.id)}
            className={`flex-1 flex flex-col items-center py-3 transition-all ${
              activeScreen === tab.id
                ? 'text-leaf-600'
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <span className="text-xl">{tab.icon}</span>
            <span className={`text-xs mt-0.5 font-semibold ${activeScreen === tab.id ? 'text-leaf-600' : ''}`}>
              {tab.label}
            </span>
            {activeScreen === tab.id && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-leaf-500 rounded-full" />
            )}
          </button>
        ))}
      </div>
    </nav>
  )
}
