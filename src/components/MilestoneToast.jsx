import React, { useEffect } from 'react'

export default function MilestoneToast({ milestone, onDismiss }) {
  useEffect(() => {
    if (!milestone) return
    const t = setTimeout(onDismiss, 4000)
    return () => clearTimeout(t)
  }, [milestone, onDismiss])

  if (!milestone) return null

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 animate-slide-up">
      <div className="bg-white rounded-2xl shadow-xl border border-leaf-200 px-5 py-3 flex items-center gap-3">
        <span className="text-3xl">{milestone.icon}</span>
        <div>
          <p className="font-bold text-gray-800">{milestone.label} Unlocked!</p>
          <p className="text-xs text-gray-500">Your farm has a new feature</p>
        </div>
      </div>
    </div>
  )
}
