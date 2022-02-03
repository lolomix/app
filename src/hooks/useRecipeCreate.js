import { useContractFunction } from "@usedapp/core";
import { NETWORKS, TARGET_CHAIN } from "../web3/constants";
import abi from "../web3/abi/CryptoChefsERC721Facet.json";
import { Contract } from "@ethersproject/contracts";

/**
 * @returns {{send, state, events, resetState}}
 */
export function useRecipeCreate() {
  const address = NETWORKS[TARGET_CHAIN].contractMaster;
  const contract = new Contract(address, abi);

  return useContractFunction(contract, "createRecipe", {
    transactionName: "Create a Recipe",
  });
}
