import { useTokenTotalSupply } from './useTokenTotalSupply'
import { NETWORKS, TARGET_CHAIN } from '../web3/constants'
import tokenAbi from "../web3/abi/CryptoChefsERC721Facet.json";
import { useCHEFSeasonSupply } from './useCHEFSeasonSupply'

/**
 * Returns the remaining amount of CHEFs for sale in the Season.
 *
 * @returns {undefined}
 */
export function useCHEFSeasonRemaining() {
  const tokenAddress = NETWORKS[TARGET_CHAIN].contractMaster;

  const totalSupply = useTokenTotalSupply(tokenAbi, tokenAddress)
  const seasonSupply = useCHEFSeasonSupply()

  return (seasonSupply - totalSupply);
}

