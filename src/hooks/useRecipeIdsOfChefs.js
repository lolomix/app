import { useContractCalls } from "@usedapp/core";
import { NETWORKS, TARGET_CHAIN } from "../web3/constants";
import abi from "../web3/abi/CryptoChefsERC721Facet.json";
import { utils } from "ethers";

/**
 * Returns the recipe ids of multiple CHEFs
 *
 * @param chefIds
 * @param flatten
 * @returns {*[]|string[]}
 */
export function useRecipeIdsOfChefs(chefIds, flatten = false) {
  const abiInterface = new utils.Interface(abi);
  const address = NETWORKS[TARGET_CHAIN].contractMaster;

  let recipeIds = useContractCalls(
    chefIds?.map((chefId) => ({
      abi: abiInterface,
      address: address,
      method: "getRecipesOfChef",
      args: [chefId],
    })) ?? []
  );

  if (flatten) {
    recipeIds = recipeIds?.flat();
  }

  return recipeIds?.filter((recipeId) => recipeId);
}
