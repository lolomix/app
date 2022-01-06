import { useContractCall, useEthers } from '@usedapp/core'
import { utils } from 'ethers'

/**
 * @param abi
 * @param address
 * @returns {(any)[]|*[]}
 */
export function useTokensOfOwner(abi, address) {
  const abiInterface = new utils.Interface(abi)
  const { account } = useEthers()

  const [tokens] = useContractCall(
    address && {
      abi: abiInterface,
      address: address,
      method: "tokensOfOwner",
      args: [account]
    }
  ) ?? [];

  return tokens
}

