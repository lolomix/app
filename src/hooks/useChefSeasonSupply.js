import { useContractCall } from '@usedapp/core'
import { NETWORKS, TARGET_CHAIN } from '../web3/constants'
import { utils } from 'ethers'
import abi from '../web3/abi/CryptoChefsERC721Facet.json'

/**
 * Returns the total amount of CHEFs in the Season.
 *
 * @returns {(any)[]|*[]}
 */
export function useChefSeasonSupply () {
  const abiInterface = new utils.Interface(abi)
  const address = NETWORKS[TARGET_CHAIN].contractMaster

  const [seasonSupply] = useContractCall(
    address &&
    abiInterface && {
      abi: abiInterface,
      address: address,
      method: 'getCryptoChefSeasonSupply',
      args: [],
    },
  ) ?? []

  if (seasonSupply === undefined) return []

  const seasonSupplyFormatted = seasonSupply.toNumber()

  return [seasonSupply, seasonSupplyFormatted]
}

