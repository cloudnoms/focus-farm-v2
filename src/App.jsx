import React, { useState } from 'react'
import TimerScreen from './components/timer/TimerScreen.jsx'
import FarmScreen from './components/farm/FarmScreen.jsx'
import ShopScreen from './components/shop/ShopScreen.jsx'
import WorldScreen from './components/world/WorldScreen.jsx'
import AchievementsScreen from './components/achievements/AchievementsScreen.jsx'
import NavigationBar from './components/nav/NavigationBar.jsx'
import MilestoneToast from './components/MilestoneToast.jsx'
import { useGameState } from './hooks/useGameState.js'

export default function App() {
  const [activeScreen, setActiveScreen] = useState('timer')
  const {
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
  } = useGameState()

  const handleSessionComplete = () => {
    const rewards = completeSession()
    setActiveScreen('timer')
    return rewards
  }

  return (
    <div className="max-w-md mx-auto relative min-h-screen">
      <MilestoneToast milestone={newMilestone} onDismiss={dismissMilestone} />

      <div className="pb-16">
        {activeScreen === 'timer' && (
          <TimerScreen
            coins={state.coins}
            energy={state.energy}
            streak={state.streak.count}
            onSessionComplete={handleSessionComplete}
          />
        )}
        {activeScreen === 'farm' && (
          <FarmScreen
            gameState={state}
            plantCrop={plantCrop}
            harvestCrop={harvestCrop}
            morningRewards={morningRewards}
            onDismissMorning={dismissMorningRewards}
          />
        )}
        {activeScreen === 'shop' && (
          <ShopScreen
            coins={state.coins}
            energy={state.energy}
            inventory={state.inventory}
            buyItem={buyItem}
          />
        )}
        {activeScreen === 'world' && (
          <WorldScreen
            totalSessions={state.totalSessions}
            activeWorldId={state.activeWorldId}
            onSelectWorld={setActiveWorld}
          />
        )}
        {activeScreen === 'achievements' && (
          <AchievementsScreen
            achievements={state.achievements}
            totalSessions={state.totalSessions}
            streak={state.streak.count}
          />
        )}
      </div>

      <NavigationBar activeScreen={activeScreen} onNavigate={setActiveScreen} />
    </div>
  )
}
