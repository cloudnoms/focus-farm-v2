import { useState, useEffect, useRef, useCallback } from 'react'
import {
  FOCUS_DURATION,
  SHORT_BREAK,
  LONG_BREAK,
  SESSIONS_BEFORE_LONG_BREAK,
} from '../constants/gameConfig.js'

export function useTimer(onFocusComplete) {
  const [sessionType, setSessionType] = useState('focus') // 'focus' | 'short' | 'long'
  const [timeLeft, setTimeLeft] = useState(FOCUS_DURATION)
  const [isRunning, setIsRunning] = useState(false)
  const [sessionCount, setSessionCount] = useState(0)
  const [showCompletion, setShowCompletion] = useState(false)
  const [completionRewards, setCompletionRewards] = useState(null)

  const intervalRef = useRef(null)
  const sessionTypeRef = useRef('focus')

  const getDuration = (type) => {
    if (type === 'focus') return FOCUS_DURATION
    if (type === 'short') return SHORT_BREAK
    return LONG_BREAK
  }

  const clearTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }

  useEffect(() => {
    if (!isRunning) return

    intervalRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearTimer()
          handleComplete()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return clearTimer
  }, [isRunning]) // eslint-disable-line

  const handleComplete = useCallback(() => {
    const current = sessionTypeRef.current

    if (current === 'focus') {
      const rewards = onFocusComplete()
      setCompletionRewards(rewards)
      setShowCompletion(true)

      setSessionCount(prev => {
        const newCount = prev + 1
        const nextType = newCount % SESSIONS_BEFORE_LONG_BREAK === 0 ? 'long' : 'short'
        sessionTypeRef.current = nextType
        setSessionType(nextType)
        setTimeLeft(getDuration(nextType))
        return newCount
      })
    } else {
      sessionTypeRef.current = 'focus'
      setSessionType('focus')
      setTimeLeft(FOCUS_DURATION)
    }

    setIsRunning(false)
  }, [onFocusComplete])

  const start = useCallback(() => setIsRunning(true), [])
  const pause = useCallback(() => setIsRunning(false), [])

  const reset = useCallback(() => {
    clearTimer()
    setIsRunning(false)
    setTimeLeft(getDuration(sessionTypeRef.current))
  }, [])

  const skip = useCallback(() => {
    clearTimer()
    setIsRunning(false)
    const next = sessionTypeRef.current === 'focus' ? 'short' : 'focus'
    sessionTypeRef.current = next
    setSessionType(next)
    setTimeLeft(getDuration(next))
  }, [])

  const dismissCompletion = useCallback(() => {
    setShowCompletion(false)
    setCompletionRewards(null)
  }, [])

  const progress = timeLeft / getDuration(sessionType)

  return {
    timeLeft,
    isRunning,
    sessionType,
    sessionCount,
    progress,
    showCompletion,
    completionRewards,
    start,
    pause,
    reset,
    skip,
    dismissCompletion,
  }
}
