import { utils } from "ethers";
import { formatRecipe } from "../../utils/formatters";
import { useCall } from "@usedapp/core";
import abi from "../../web3/abi/CryptoChefsERC721Facet.json";
import { NETWORKS, TARGET_CHAIN } from "../../web3/constants";
import { Contract } from "@ethersproject/contracts";
import { logUseCall } from "../../utils/loggers";

/**
 * Returns the recipe buy its id
 *
 * @param {string|undefined} recipeId
 * @returns {{}|{name: string, chefId: *, id: *, coinPairs: *, stakedAroma: *, timestamp: *, date: *}|undefined}
 */
export function useRecipeById(recipeId) {
  const abiInterface = new utils.Interface(abi);
  const address = NETWORKS[TARGET_CHAIN].contractMaster;
  const defaultResult = {};

  const call = recipeId && {
    contract: new Contract(address, abiInterface),
    method: "getRecipeById",
    args: [recipeId],
  };

  const result = useCall(call) ?? defaultResult;

  logUseCall(result, call);

  if (!result?.value) {
    return defaultResult;
  }

  return formatRecipe({ ...result?.value?.[0], id: recipeId });
}
