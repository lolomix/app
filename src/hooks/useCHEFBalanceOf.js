import { AROMA_DECIMALS_DIGIT, NETWORKS, TARGET_CHAIN } from '../web3/constants'
import abi from '../web3/abi/CryptoChefsERC721Facet.json'
import { formatUnits } from '@ethersproject/units'
import { useContractCall } from '@usedapp/core'
import { utils } from 'ethers'

/**
 * Returns the balance of an CHEF NFTs for an address
 *
 * @param targetAccount
 * @returns {undefined}
 */
export function useCHEFBalanceOf(targetAccount) {
  const abiInterface = new utils.Interface(abi)
  const address = NETWORKS[TARGET_CHAIN].contractMaster;

  const [balance] =
    useContractCall(
      targetAccount && {
        abi: abiInterface,
        address: address,
        method: 'balanceOf',
        args: [targetAccount],
      }
    ) ?? []

  if (balance === undefined) return [];

  let balanceFormatted = formatUnits(balance, AROMA_DECIMALS_DIGIT)

  return [ balance, balanceFormatted ]
}


