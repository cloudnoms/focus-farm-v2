import React from 'react'
import { playTimerStart, playTimerPause, playTimerReset } from '../../utils/audioUtils.js'

export default function TimerControls({ isRunning, onStart, onPause, onReset, onSkip, sessionType }) {
  async function handleStart() { await playTimerStart(); onStart() }
  async function handlePause() { await playTimerPause(); onPause() }
  function handleReset() { playTimerReset(); onReset() }

  return (
    <div className="flex items-center gap-3 mt-6">
      <button
        onClick={handleReset}
        className="w-11 h-11 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 transition-colors text-lg"
        aria-label="Reset"
      >
        ↩
      </button>

      {isRunning ? (
        <button
          onClick={handlePause}
          className="w-16 h-16 flex items-center justify-center rounded-full bg-leaf-500 hover:bg-leaf-600 text-white shadow-lg hover:shadow-xl transition-all text-2xl font-bold"
          aria-label="Pause"
        >
          ⏸
        </button>
      ) : (
        <button
          onClick={handleStart}
          className="w-16 h-16 flex items-center justify-center rounded-full bg-leaf-500 hover:bg-leaf-600 text-white shadow-lg hover:shadow-xl transition-all text-2xl"
          aria-label="Start"
        >
          ▶
        </button>
      )}

      {sessionType !== 'focus' && (
        <button
          onClick={onSkip}
          className="w-11 h-11 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 transition-colors text-lg"
          aria-label="Skip break"
        >
          ⏭
        </button>
      )}
    </div>
  )
}
