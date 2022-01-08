import { useContractFunction } from '@usedapp/core'
import { NETWORKS, TARGET_CHAIN } from '../web3/constants'
import { Contract } from '@ethersproject/contracts'
import abi from "../web3/abi/AROMATokenMatic.json";

/**
 * @returns {(((...args: any[]) => Promise<void>)|TransactionStatus|LogDescription[])[]}
 */
export function useAromaApprove() {
  const contractAddress = NETWORKS[TARGET_CHAIN].contractAroma;
  const contract = new Contract(contractAddress, abi)

  const {send, state, events} = useContractFunction(
    contract,
    'approve',
    {
      transactionName: 'Approve AROMA',
    }
  )

  return [ send, state, events ]
}

