import React from 'react'
import ProgressRing from '../atoms/ProgressRing.jsx'
import CoinDisplay from '../atoms/CoinDisplay.jsx'
import EnergyDisplay from '../atoms/EnergyDisplay.jsx'
import StreakBadge from '../atoms/StreakBadge.jsx'
import SessionLabel from './SessionLabel.jsx'
import TimerControls from './TimerControls.jsx'
import CompletionOverlay from './CompletionOverlay.jsx'
import { useTimer } from '../../hooks/useTimer.js'

function formatTime(seconds) {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0')
  const s = (seconds % 60).toString().padStart(2, '0')
  return `${m}:${s}`
}

const RING_COLORS = { focus: '#22c55e', short: '#38bdf8', long: '#a78bfa' }

export default function TimerScreen({ coins, energy, streak, onSessionComplete }) {
  const timer = useTimer(onSessionComplete)

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] px-4 py-8 bg-gradient-to-b from-leaf-50 to-white">
      <div className="flex gap-2 mb-10">
        <CoinDisplay coins={coins} />
        <EnergyDisplay energy={energy} />
        <StreakBadge streak={streak} />
      </div>

      <SessionLabel sessionType={timer.sessionType} />

      <div className="relative my-6">
        <ProgressRing
          progress={timer.progress}
          size={typeof window !== 'undefined' && window.innerWidth >= 768 ? 320 : 240}
          strokeWidth={14}
          color={RING_COLORS[timer.sessionType]}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-5xl md:text-7xl font-bold text-gray-800 tabular-nums tracking-tight">
            {formatTime(timer.timeLeft)}
          </span>
        </div>
      </div>

      <TimerControls
        isRunning={timer.isRunning}
        sessionType={timer.sessionType}
        onStart={timer.start}
        onPause={timer.pause}
        onReset={timer.reset}
        onSkip={timer.skip}
      />

      <p className="mt-8 text-sm text-gray-400 font-medium">
        Session {timer.sessionCount + 1} · Stay focused
      </p>

      <CompletionOverlay
        visible={timer.showCompletion}
        rewards={timer.completionRewards}
        onDismiss={timer.dismissCompletion}
      />
    </div>
  )
}
