import { useConfig, useContractFunction } from "@usedapp/core";
import { Contract } from "@ethersproject/contracts";
import abi from "../../web3/abi/AROMATokenMatic.json";

export function useAromaApprove() {
  const {
    readOnlyChainSettings: { aromaContractAddress: contractAddress },
  } = useConfig();
  const contract = new Contract(contractAddress, abi);

  const { send, state, events } = useContractFunction(contract, "approve", {
    transactionName: "Approve AROMA",
  });

  return [send, state, events];
}
