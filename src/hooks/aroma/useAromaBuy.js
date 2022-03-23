import { useConfig, useContractFunction } from "@usedapp/core";
import { Contract } from "@ethersproject/contracts";
import abi from "../../web3/abi/CryptoChefsERC721Facet.json";

export function useAromaBuy() {
  const {
    readOnlyChainSettings: { masterContractAddress: contractAddress },
  } = useConfig();
  const contract = new Contract(contractAddress, abi);
  const { send, state, events } = useContractFunction(contract, "buyAROMA", {
    transactionName: "Buy AROMA",
  });

  return [send, state, events];
}
