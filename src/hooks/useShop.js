import { useCallback } from 'react'
import { CROP_LIST } from '../constants/cropData.js'

export function useShop(coins, inventory, buyItem) {
  const purchaseSeed = useCallback((cropId) => {
    const crop = CROP_LIST.find(c => c.id === cropId)
    if (!crop) return
    if (coins < crop.seedCost) return
    buyItem(cropId, crop.seedCost)
  }, [coins, buyItem])

  const canAfford = useCallback((cost) => coins >= cost, [coins])

  return { purchaseSeed, canAfford }
}
