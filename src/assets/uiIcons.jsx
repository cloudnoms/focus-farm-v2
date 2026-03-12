import React from 'react'

// Pixel-art style SVG icons replacing emoji in UI

export function CoinIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" shapeRendering="crispEdges" style={{ imageRendering: 'pixelated' }}>
      <rect x="4" y="1" width="4" height="1" fill="#b88010" />
      <rect x="2" y="2" width="8" height="1" fill="#b88010" />
      <rect x="1" y="3" width="10" height="1" fill="#f0c020" />
      <rect x="1" y="4" width="10" height="1" fill="#f0c020" />
      <rect x="1" y="5" width="3"  height="1" fill="#f0c020" />
      <rect x="4" y="5" width="2"  height="1" fill="#ffe87a" />
      <rect x="6" y="5" width="5"  height="1" fill="#f0c020" />
      <rect x="1" y="6" width="10" height="1" fill="#f0c020" />
      <rect x="1" y="7" width="10" height="1" fill="#d4aa18" />
      <rect x="2" y="8" width="8"  height="1" fill="#b88010" />
      <rect x="4" y="9" width="4"  height="1" fill="#b88010" />
    </svg>
  )
}

export function EnergyIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" shapeRendering="crispEdges" style={{ imageRendering: 'pixelated' }}>
      <rect x="7" y="1" width="3" height="1" fill="#7acc34" />
      <rect x="5" y="2" width="4" height="1" fill="#7acc34" />
      <rect x="3" y="3" width="5" height="1" fill="#4a9c1e" />
      <rect x="4" y="4" width="4" height="1" fill="#4a9c1e" />
      <rect x="3" y="5" width="5" height="1" fill="#7acc34" />
      <rect x="4" y="6" width="4" height="1" fill="#7acc34" />
      <rect x="2" y="7" width="5" height="1" fill="#4a9c1e" />
      <rect x="3" y="8" width="4" height="1" fill="#4a9c1e" />
      <rect x="2" y="9" width="3" height="1" fill="#7acc34" />
      <rect x="2" y="10" width="2" height="1" fill="#4a9c1e" />
    </svg>
  )
}

export function FireIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" shapeRendering="crispEdges" style={{ imageRendering: 'pixelated' }}>
      <rect x="5" y="0" width="2" height="1" fill="#f0a020" />
      <rect x="4" y="1" width="4" height="1" fill="#f0a020" />
      <rect x="3" y="2" width="6" height="1" fill="#e06010" />
      <rect x="2" y="3" width="8" height="1" fill="#e06010" />
      <rect x="2" y="4" width="8" height="1" fill="#d03010" />
      <rect x="1" y="5" width="10" height="1" fill="#d03010" />
      <rect x="1" y="6" width="10" height="1" fill="#e04010" />
      <rect x="2" y="6" width="3"  height="1" fill="#f0a020" />
      <rect x="1" y="7" width="10" height="1" fill="#e06010" />
      <rect x="3" y="7" width="2"  height="1" fill="#f0c020" />
      <rect x="2" y="8" width="8"  height="1" fill="#d03010" />
      <rect x="3" y="9" width="6"  height="1" fill="#e04010" />
      <rect x="4" y="10" width="4" height="1" fill="#c02808" />
      <rect x="5" y="11" width="2" height="1" fill="#a01808" />
    </svg>
  )
}

// Nav icons — clean SVG (not pixel art, but consistent)
export function TimerIcon({ size = 22, active = false }) {
  const c = active ? '#16a34a' : '#9ca3af'
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round">
      <circle cx="12" cy="13" r="8" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="13" x2="15" y2="15" />
      <line x1="9" y1="3" x2="15" y2="3" />
    </svg>
  )
}

export function FarmIcon({ size = 22, active = false }) {
  const c = active ? '#16a34a' : '#9ca3af'
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round">
      <path d="M12 2 L3 9 L3 21 L9 21 L9 15 L15 15 L15 21 L21 21 L21 9 Z" />
      <line x1="12" y1="2" x2="12" y2="9" />
    </svg>
  )
}

export function ShopIcon({ size = 22, active = false }) {
  const c = active ? '#16a34a' : '#9ca3af'
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round">
      <path d="M6 2 L3 6 L3 8 C3 9.1 3.9 10 5 10 C6.1 10 7 9.1 7 8 C7 9.1 7.9 10 9 10 C10.1 10 11 9.1 11 8 C11 9.1 11.9 10 13 10 C14.1 10 15 9.1 15 8 C15 9.1 15.9 10 17 10 C18.1 10 19 9.1 19 8 L19 6 L16 2 Z" />
      <rect x="5" y="10" width="14" height="11" rx="1" />
      <line x1="10" y1="10" x2="10" y2="21" />
      <line x1="14" y1="10" x2="14" y2="21" />
    </svg>
  )
}

export function WorldIcon({ size = 22, active = false }) {
  const c = active ? '#16a34a' : '#9ca3af'
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 3 C9 6 9 18 12 21" />
      <path d="M12 3 C15 6 15 18 12 21" />
      <line x1="3" y1="9" x2="21" y2="9" />
      <line x1="3" y1="15" x2="21" y2="15" />
    </svg>
  )
}

export function TrophyIcon({ size = 22, active = false }) {
  const c = active ? '#16a34a' : '#9ca3af'
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round">
      <path d="M8 21 L16 21 L16 19 L12 17 L12 17 L8 19 Z" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <path d="M5 4 L5 12 C5 15.3 8.1 18 12 18 C15.9 18 19 15.3 19 12 L19 4 Z" />
      <path d="M5 6 C5 6 3 6 3 9 C3 12 5 12 5 12" />
      <path d="M19 6 C19 6 21 6 21 9 C21 12 19 12 19 12" />
    </svg>
  )
}
