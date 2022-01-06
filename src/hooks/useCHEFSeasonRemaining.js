import { useCHEFSeasonSupply } from './useCHEFSeasonSupply'
import { useCHEFTotalSupply } from './useCHEFTotalSupply'

/**
 * Returns the remaining amount of CHEFs for sale in the Season.
 *
 * @returns {undefined}
 */
export function useCHEFSeasonRemaining () {
  const [totalSupply] = useCHEFTotalSupply()
  const [seasonSupply] = useCHEFSeasonSupply()

  if (seasonSupply === undefined || totalSupply === undefined) return []

  const seasonRemaining = seasonSupply.sub(totalSupply)
  const seasonRemainingFormatted = seasonRemaining.toNumber()

  return [seasonRemaining, seasonRemainingFormatted]
}

