import { useConfig, useContractFunction } from '@usedapp/core'
import { NETWORKS } from "../../web3/constants";
import { Contract } from "@ethersproject/contracts";
import abi from "../../web3/abi/AROMATokenMatic.json";

export function useAromaApprove() {
  const { readOnlyChainId } = useConfig();
  const contractAddress = NETWORKS[readOnlyChainId].contractAroma;
  const contract = new Contract(contractAddress, abi);

  const { send, state, events } = useContractFunction(contract, "approve", {
    transactionName: "Approve AROMA",
  });

  return [send, state, events];
}
