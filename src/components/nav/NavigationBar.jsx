import React from 'react'
import { playNavClick } from '../../utils/audioUtils.js'

const TABS = [
  { id: 'timer', label: 'Focus', icon: '⏱️' },
  { id: 'farm', label: 'Farm', icon: '🌾' },
  { id: 'shop', label: 'Shop', icon: '🛒' },
  { id: 'world', label: 'World', icon: '🗺️' },
  { id: 'achievements', label: 'Goals', icon: '🏆' },
]

export default function NavigationBar({ activeScreen, onNavigate }) {
  function handleClick(id) {
    playNavClick()
    onNavigate(id)
  }

  return (
    <>
      {/* Desktop: left sidebar */}
      <nav className="hidden md:flex flex-col fixed left-0 top-0 bottom-0 w-20 bg-white border-r border-gray-200 z-40 py-6 gap-1 items-center">
        <div className="text-2xl mb-6">🌱</div>
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => handleClick(tab.id)}
            className={`w-16 flex flex-col items-center py-3 px-1 rounded-xl transition-all gap-1 ${
              activeScreen === tab.id
                ? 'bg-leaf-50 text-leaf-600'
                : 'text-gray-400 hover:bg-gray-50 hover:text-gray-600'
            }`}
          >
            <span className="text-xl">{tab.icon}</span>
            <span className="text-[10px] font-semibold leading-none">{tab.label}</span>
          </button>
        ))}
      </nav>

      {/* Mobile: bottom bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur border-t border-gray-200 z-40">
        <div className="flex">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => handleClick(tab.id)}
              className={`flex-1 flex flex-col items-center py-3 transition-all relative ${
                activeScreen === tab.id ? 'text-leaf-600' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              {activeScreen === tab.id && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-leaf-500 rounded-full" />
              )}
              <span className="text-xl">{tab.icon}</span>
              <span className="text-[10px] mt-0.5 font-semibold">{tab.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </>
  )
}
