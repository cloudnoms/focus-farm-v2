import { STORAGE_KEY, STORAGE_VERSION } from '../constants/gameConfig.js'

export function loadState(defaults) {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    // Version mismatch — wipe and start fresh
    if (parsed.version !== STORAGE_VERSION) return null
    // Merge with defaults so any fields added after initial save are populated
    return {
      ...defaults,
      ...parsed,
      achievements: { ...defaults.achievements, ...parsed.achievements },
      inventory: { ...defaults.inventory, ...parsed.inventory },
    }
  } catch {
    return null
  }
}

export function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    // Storage quota exceeded — silently fail
  }
}
