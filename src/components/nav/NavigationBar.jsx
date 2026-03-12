import React from 'react'
import { playNavClick } from '../../utils/audioUtils.js'
import { TimerIcon, FarmIcon, ShopIcon, WorldIcon, TrophyIcon } from '../../assets/uiIcons.jsx'

const TABS = [
  { id: 'timer',        label: 'Focus',  Icon: TimerIcon  },
  { id: 'farm',         label: 'Farm',   Icon: FarmIcon   },
  { id: 'shop',         label: 'Shop',   Icon: ShopIcon   },
  { id: 'world',        label: 'World',  Icon: WorldIcon  },
  { id: 'achievements', label: 'Goals',  Icon: TrophyIcon },
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
        <div className="mb-6">
          <svg width="28" height="28" viewBox="0 0 12 12" shapeRendering="crispEdges" style={{ imageRendering: 'pixelated' }}>
            <rect x="5" y="0" width="2" height="2" fill="#4a9c1e" />
            <rect x="4" y="2" width="4" height="1" fill="#4a9c1e" />
            <rect x="3" y="3" width="6" height="2" fill="#7acc34" />
            <rect x="2" y="5" width="8" height="2" fill="#4a9c1e" />
            <rect x="5" y="7" width="2" height="4" fill="#8a5a14" />
          </svg>
        </div>
        {TABS.map(({ id, label, Icon }) => (
          <button
            key={id}
            onClick={() => handleClick(id)}
            className={`w-16 flex flex-col items-center py-3 px-1 rounded-xl transition-all gap-1 ${
              activeScreen === id
                ? 'bg-leaf-50 text-leaf-600'
                : 'text-gray-400 hover:bg-gray-50 hover:text-gray-600'
            }`}
          >
            <Icon size={22} active={activeScreen === id} />
            <span className="text-[10px] font-semibold leading-none">{label}</span>
          </button>
        ))}
      </nav>

      {/* Mobile: bottom bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur border-t border-gray-200 z-40">
        <div className="flex">
          {TABS.map(({ id, label, Icon }) => (
            <button
              key={id}
              onClick={() => handleClick(id)}
              className={`flex-1 flex flex-col items-center py-3 transition-all relative ${
                activeScreen === id ? 'text-leaf-600' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              {activeScreen === id && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-leaf-500 rounded-full" />
              )}
              <Icon size={22} active={activeScreen === id} />
              <span className="text-[10px] mt-0.5 font-semibold">{label}</span>
            </button>
          ))}
        </div>
      </nav>
    </>
  )
}
