import { useConfig, useContractFunction } from "@usedapp/core";
import abi from "../../web3/abi/CryptoChefsERC721Facet.json";
import { Contract } from "@ethersproject/contracts";

/**
 * @returns {{send, state, events, resetState}}
 */
export function useRecipeBurn() {
  const {
    readOnlyChainSettings: { masterContractAddress: address },
  } = useConfig();
  const contract = new Contract(address, abi);

  return useContractFunction(contract, "burnRecipe", {
    transactionName: "Burn a Recipe",
  });
}
