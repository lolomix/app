import { useContractCall } from "@usedapp/core";
import { NETWORKS, TARGET_CHAIN } from "../web3/constants";
import abi from "../web3/abi/CryptoChefsERC721Facet.json";
import { utils } from "ethers";

/**
 * Returns the recipe id-s of a CHEF
 *
 * @param chefId
 * @returns {*[]|string[]}
 */
export function useRecipeIdsOfChef(chefId) {
  const abiInterface = new utils.Interface(abi);
  const address = NETWORKS[TARGET_CHAIN].contractMaster;

  const [recipeIds] =
    useContractCall(
      chefId && {
        abi: abiInterface,
        address: address,
        method: "getRecipesOfChef",
        args: [chefId],
      }
    ) ?? [];

  return recipeIds;
}
