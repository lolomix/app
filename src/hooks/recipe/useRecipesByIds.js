import { useCalls, useConfig } from "@usedapp/core";
import abi from "../../web3/abi/CryptoChefsERC721Facet.json";
import { utils } from "ethers";
import { formatRecipe } from "../../utils/formatters";
import { Contract } from "@ethersproject/contracts";
import { logUseCalls } from "../../utils/loggers";

/**
 * Returns the recipes by their ids
 *
 * @param {array|undefined} recipeIds
 * @returns {*[]|({name: string, chefId: *, id: *, coinPairs: *, stakedAroma: *, timestamp: *, date: *}|undefined)[]}
 */
export function useRecipesByIds(recipeIds) {
  const {
    readOnlyChainSettings: { masterContractAddress: address },
  } = useConfig();
  const abiInterface = new utils.Interface(abi);
  const defaultResults = undefined;

  const calls =
    recipeIds?.map((recipeId) => ({
      contract: new Contract(address, abiInterface),
      method: "getRecipeById",
      args: [recipeId],
    })) ?? [];

  let results = useCalls(calls) ?? defaultResults;

  logUseCalls(results, calls);

  if (
    results?.length <= 0 ||
    results?.some((result) => !result || result.error)
  ) {
    return defaultResults;
  }

  return results?.map((result, i) =>
    formatRecipe({
      ...result?.value?.[0],
      id: recipeIds[i],
    })
  );
}
