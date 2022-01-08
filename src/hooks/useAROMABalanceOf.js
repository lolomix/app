import { AROMA_DECIMALS_DIGIT, NETWORKS, TARGET_CHAIN } from '../web3/constants'
import { useTokenBalance } from '@usedapp/core'
import { formatUnits } from '@ethersproject/units'

/**
 * Returns the balance of an AROMA token for an address
 *
 * @param targetAccount
 * @returns {(BigNumber|string)[]|*[]}
 */
export function useAROMABalanceOf(targetAccount) {
  const tokenAddress = NETWORKS[TARGET_CHAIN].contractAroma;
  const balance = useTokenBalance(tokenAddress, targetAccount);

  if (balance === undefined) return [];

  let balanceFormatted = formatUnits(balance, AROMA_DECIMALS_DIGIT)

  return [ balance, balanceFormatted ]
}