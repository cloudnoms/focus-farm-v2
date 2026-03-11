export function getTodayString() {
  return new Date().toISOString().slice(0, 10)
}

export function isNewDay(lastDate) {
  if (!lastDate) return true
  return lastDate !== getTodayString()
}

export function updateStreak(streak, isFirstSessionToday) {
  if (!isFirstSessionToday) return streak

  const today = getTodayString()
  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10)

  if (streak.lastSessionDate === yesterday) {
    return { count: streak.count + 1, lastSessionDate: today }
  } else if (streak.lastSessionDate === today) {
    return streak
  } else {
    return { count: 1, lastSessionDate: today }
  }
}
