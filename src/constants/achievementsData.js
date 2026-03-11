export const ACHIEVEMENTS = [
  {
    id: 'first_session',
    title: 'First Focus',
    description: 'Complete your very first focus session',
    icon: '⏱️',
    reward: '10 🪙',
  },
  {
    id: 'first_crop',
    title: 'Green Thumb',
    description: 'Plant your first seed on the farm',
    icon: '🌱',
    reward: '5 🪙',
  },
  {
    id: 'first_harvest',
    title: 'First Harvest',
    description: 'Harvest a fully grown crop',
    icon: '🌾',
    reward: '20 🪙',
  },
  {
    id: 'sessions_10',
    title: 'Deep Focus',
    description: 'Complete 10 focus sessions',
    icon: '🔟',
    reward: '50 🪙',
  },
  {
    id: 'streak_7',
    title: 'Week Warrior',
    description: 'Maintain a 7-day focus streak',
    icon: '🔥',
    reward: '75 🪙',
  },
  {
    id: 'sessions_25',
    title: 'Dedicated Farmer',
    description: 'Complete 25 focus sessions',
    icon: '🏅',
    reward: '100 🪙',
  },
  {
    id: 'sessions_50',
    title: 'Focus Master',
    description: 'Complete 50 focus sessions',
    icon: '🏆',
    reward: '200 🪙',
  },
  {
    id: 'streak_30',
    title: 'Monthly Habit',
    description: 'Maintain a 30-day focus streak',
    icon: '🌟',
    reward: '300 🪙',
  },
]

export const ACHIEVEMENTS_MAP = Object.fromEntries(ACHIEVEMENTS.map(a => [a.id, a]))
