// Pomodoro timing (in seconds)
export const FOCUS_DURATION = 25 * 60
export const SHORT_BREAK = 5 * 60
export const LONG_BREAK = 15 * 60
export const SESSIONS_BEFORE_LONG_BREAK = 4

// Grid
export const GRID_SIZE = 8
export const TOTAL_TILES = GRID_SIZE * GRID_SIZE

// Rewards per session
export const COINS_PER_SESSION = 10
export const ENERGY_PER_SESSION = 1
export const MILESTONE_BONUS_COINS = 25
export const MILESTONE_INTERVAL = 4
export const STREAK_BONUS_COINS = 50

// Starting resources
export const STARTING_COINS = 100
export const STARTING_ENERGY = 3

// Energy costs
export const ENERGY_TO_PLANT = 1

// Harvest rewards
export const HARVEST_COINS = {
  tomato: 30,
  corn: 45,
  potato: 45,
  cabbage: 55,
}

// Farm expansion milestones (totalSessions)
export const MILESTONES = [
  { sessions: 5, id: 'river', label: 'River', icon: '🏞️' },
  { sessions: 15, id: 'barn', label: 'Barn', icon: '🏚️' },
  { sessions: 30, id: 'orchard', label: 'Orchard', icon: '🌳' },
  { sessions: 50, id: 'pond', label: 'Pond', icon: '🌊' },
]

// Morning check-in passive reward
export const MORNING_COINS = 5

// localStorage
export const STORAGE_KEY = 'focusfarm_v1'
export const STORAGE_VERSION = 1
