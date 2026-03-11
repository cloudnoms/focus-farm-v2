import React, { useEffect, useState } from 'react'
import { playSessionComplete } from '../../utils/audioUtils.js'

const CONFETTI = ['🌟', '✨', '🎉', '🌱', '🪙', '⭐']

export default function CompletionOverlay({ visible, rewards, onDismiss }) {
  const [particles, setParticles] = useState([])

  useEffect(() => {
    if (!visible) return
    playSessionComplete()
    setParticles(
      Array.from({ length: 8 }, (_, i) => ({
        id: i,
        emoji: CONFETTI[i % CONFETTI.length],
        left: 10 + Math.random() * 80,
        delay: Math.random() * 0.4,
      }))
    )
  }, [visible])

  if (!visible) return null

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 animate-slide-up">
      <div className="relative bg-white rounded-3xl shadow-2xl p-8 mx-4 max-w-sm w-full text-center overflow-hidden">
        {particles.map(p => (
          <span
            key={p.id}
            className="absolute text-2xl animate-confetti-fall pointer-events-none"
            style={{ left: `${p.left}%`, top: '-10px', animationDelay: `${p.delay}s` }}
          >
            {p.emoji}
          </span>
        ))}

        <div className="text-5xl mb-3 animate-pulse-soft">🌱</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-1">Session Complete!</h2>
        <p className="text-gray-500 text-sm mb-5">Your farm is growing</p>

        <div className="flex justify-center gap-4 mb-6">
          <div className="bg-amber-50 rounded-2xl px-4 py-3">
            <div className="text-2xl font-bold text-amber-600">+{rewards?.coins || 10}</div>
            <div className="text-xs text-amber-500 font-semibold">🪙 Coins</div>
          </div>
          <div className="bg-emerald-50 rounded-2xl px-4 py-3">
            <div className="text-2xl font-bold text-emerald-600">+{rewards?.energy || 1}</div>
            <div className="text-xs text-emerald-500 font-semibold">⚡ Energy</div>
          </div>
        </div>

        <button
          onClick={onDismiss}
          className="w-full py-3 bg-leaf-500 hover:bg-leaf-600 text-white font-bold rounded-2xl transition-colors"
        >
          Back to Farm
        </button>
      </div>
    </div>
  )
}
