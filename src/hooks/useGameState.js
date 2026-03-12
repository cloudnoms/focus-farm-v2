import { useState, useEffect, useCallback } from 'react'
import {
  STARTING_COINS,
  STARTING_ENERGY,
  COINS_PER_SESSION,
  ENERGY_PER_SESSION,
  MILESTONE_BONUS_COINS,
  MILESTONE_INTERVAL,
  STREAK_BONUS_COINS,
  TOTAL_TILES,
  STORAGE_VERSION,
  MORNING_COINS,
  ENERGY_TO_PLANT,
  MILESTONES,
} from '../constants/gameConfig.js'
import { CROPS } from '../constants/cropData.js'
import { loadState, saveState } from '../utils/storage.js'
import { getTodayString, isNewDay, updateStreak } from '../utils/dateUtils.js'

function buildDefaultGrid() {
  return Array.from({ length: TOTAL_TILES }, (_, id) => ({
    id,
    type: 'empty',
    cropId: null,
    stage: 0,
    sessionsAtStage: 0,
    placedAt: null,
  }))
}

function buildDefaultState() {
  return {
    version: STORAGE_VERSION,
    coins: STARTING_COINS,
    energy: STARTING_ENERGY,
    totalSessions: 0,
    streak: { count: 0, lastSessionDate: null },
    lastOpenDate: null,
    achievements: {
      first_session: false,
      first_crop: false,
      first_harvest: false,
      sessions_10: false,
      streak_7: false,
      sessions_25: false,
      sessions_50: false,
      streak_30: false,
    },
    activeWorldId: 'farm',
    unlockedMilestones: [],
    inventory: {
      tomato: 0,
      corn: 0,
      potato: 0,
      cabbage: 0,
    },
    farmGrid: buildDefaultGrid(),
  }
}

export function useGameState() {
  const [state, setState] = useState(() => {
    const defaults = buildDefaultState()
    const saved = loadState(defaults)
    return saved || defaults
  })

  const [newMilestone, setNewMilestone] = useState(null)
  const [morningRewards, setMorningRewards] = useState(null)

  // Check morning check-in
  useEffect(() => {
    const today = getTodayString()
    if (state.lastOpenDate !== today) {
      const passiveCoins = MORNING_COINS
      setMorningRewards({ coins: passiveCoins })
      setState(prev => ({
        ...prev,
        lastOpenDate: today,
        coins: prev.coins + passiveCoins,
      }))
    }
  }, []) // eslint-disable-line

  // Persist on every change (backup — primary save is inside each mutation)
  useEffect(() => {
    saveState(state)
  }, [state])

  // Also save on tab close / page unload as final safety net
  useEffect(() => {
    const handler = () => saveState(state)
    window.addEventListener('beforeunload', handler)
    return () => window.removeEventListener('beforeunload', handler)
  }, [state])

  const advanceFarmGrowth = useCallback((grid) => {
    return grid.map(tile => {
      if (tile.type !== 'crop' || !tile.cropId) return tile
      const crop = CROPS[tile.cropId]
      if (!crop) return tile
      const maxStage = crop.stages.length - 1
      if (tile.stage >= maxStage) return tile

      const newSessionsAtStage = tile.sessionsAtStage + 1
      if (newSessionsAtStage >= crop.sessionsPerStage) {
        return { ...tile, stage: tile.stage + 1, sessionsAtStage: 0 }
      }
      return { ...tile, sessionsAtStage: newSessionsAtStage }
    })
  }, [])

  const completeSession = useCallback(() => {
    setState(prev => {
      const newTotal = prev.totalSessions + 1
      const today = getTodayString()
      const isFirstToday = prev.streak.lastSessionDate !== today
      const newStreak = updateStreak(prev.streak, isFirstToday)
      const isMilestone = newTotal % MILESTONE_INTERVAL === 0
      const isStreakMilestone = newStreak.count > 0 && newStreak.count % 7 === 0

      let bonusCoins = 0
      if (isMilestone) bonusCoins += MILESTONE_BONUS_COINS
      if (isStreakMilestone && isFirstToday) bonusCoins += STREAK_BONUS_COINS

      const newGrid = advanceFarmGrowth(prev.farmGrid)

      // Check milestone unlocks
      const newUnlocked = [...prev.unlockedMilestones]
      let latestMilestone = null
      for (const m of MILESTONES) {
        if (newTotal >= m.sessions && !newUnlocked.includes(m.id)) {
          newUnlocked.push(m.id)
          latestMilestone = m
        }
      }

      const newAchievements = { ...prev.achievements }
      if (!newAchievements.first_session) newAchievements.first_session = true
      if (newTotal >= 10) newAchievements.sessions_10 = true
      if (newTotal >= 25) newAchievements.sessions_25 = true
      if (newTotal >= 50) newAchievements.sessions_50 = true
      if (newStreak.count >= 7) newAchievements.streak_7 = true
      if (newStreak.count >= 30) newAchievements.streak_30 = true

      if (latestMilestone) {
        setTimeout(() => setNewMilestone(latestMilestone), 800)
      }

      const next = {
        ...prev,
        coins: prev.coins + COINS_PER_SESSION + bonusCoins,
        energy: prev.energy + ENERGY_PER_SESSION,
        totalSessions: newTotal,
        streak: newStreak,
        farmGrid: newGrid,
        unlockedMilestones: newUnlocked,
        achievements: newAchievements,
      }
      saveState(next)
      return next
    })

    return {
      coins: COINS_PER_SESSION,
      energy: ENERGY_PER_SESSION,
    }
  }, [advanceFarmGrowth])

  const buyItem = useCallback((cropId, cost) => {
    setState(prev => {
      if (prev.coins < cost) return prev
      const next = {
        ...prev,
        coins: prev.coins - cost,
        inventory: { ...prev.inventory, [cropId]: (prev.inventory[cropId] || 0) + 1 },
      }
      saveState(next)
      return next
    })
  }, [])

  const plantCrop = useCallback((tileId, cropId) => {
    setState(prev => {
      if (prev.energy < ENERGY_TO_PLANT) return prev
      if (!prev.inventory[cropId] || prev.inventory[cropId] < 1) return prev
      if (prev.farmGrid[tileId]?.type !== 'empty') return prev

      const newGrid = prev.farmGrid.map(tile =>
        tile.id === tileId
          ? { ...tile, type: 'crop', cropId, stage: 0, sessionsAtStage: 0, placedAt: new Date().toISOString() }
          : tile
      )

      const newAchievements = { ...prev.achievements }
      if (!newAchievements.first_crop) newAchievements.first_crop = true

      const next = {
        ...prev,
        energy: prev.energy - ENERGY_TO_PLANT,
        inventory: { ...prev.inventory, [cropId]: prev.inventory[cropId] - 1 },
        farmGrid: newGrid,
        achievements: newAchievements,
      }
      saveState(next)
      return next
    })
  }, [])

  const harvestCrop = useCallback((tileId) => {
    setState(prev => {
      const tile = prev.farmGrid[tileId]
      if (!tile || tile.type !== 'crop') return prev
      const crop = CROPS[tile.cropId]
      if (!crop) return prev
      const maxStage = crop.stages.length - 1
      if (tile.stage < maxStage) return prev

      const newGrid = prev.farmGrid.map(t =>
        t.id === tileId
          ? { id: t.id, type: 'empty', cropId: null, stage: 0, sessionsAtStage: 0, placedAt: null }
          : t
      )

      const newAchievements = { ...prev.achievements }
      if (!newAchievements.first_harvest) newAchievements.first_harvest = true

      const next = {
        ...prev,
        coins: prev.coins + crop.harvestCoins,
        farmGrid: newGrid,
        achievements: newAchievements,
      }
      saveState(next)
      return next
    })
  }, [])

  const dismissMorningRewards = useCallback(() => {
    setMorningRewards(null)
  }, [])

  const dismissMilestone = useCallback(() => {
    setNewMilestone(null)
  }, [])

  const setActiveWorld = useCallback((worldId) => {
    setState(prev => ({ ...prev, activeWorldId: worldId }))
  }, [])

  return {
    state,
    completeSession,
    buyItem,
    plantCrop,
    harvestCrop,
    morningRewards,
    dismissMorningRewards,
    newMilestone,
    dismissMilestone,
    setActiveWorld,
  }
}
