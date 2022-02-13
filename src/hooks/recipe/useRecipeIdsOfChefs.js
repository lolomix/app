import { useCalls } from "@usedapp/core";
import { NETWORKS, TARGET_CHAIN } from "../../web3/constants";
import abi from "../../web3/abi/CryptoChefsERC721Facet.json";
import { utils } from "ethers";
import { Contract } from "@ethersproject/contracts";
import { logUseCalls } from "../../utils/loggers";

/**
 * Returns the recipe ids of multiple CHEFs
 *
 * @param {array|undefined} chefIds
 * @param {boolean} flatten
 * @returns {*[]|FlatArray<*[], 1>[]|*[]}
 */
export function useRecipeIdsOfChefs(chefIds, flatten = false) {
  const abiInterface = new utils.Interface(abi);
  const address = NETWORKS[TARGET_CHAIN].contractMaster;
  const defaultResults = [];

  const calls =
    chefIds?.map((chefId) => ({
      contract: new Contract(address, abiInterface),
      method: "getRecipesOfChef",
      args: [chefId],
    })) ?? [];

  let results = useCalls(calls) ?? defaultResults;

  logUseCalls(results, calls);

  if (results.some((result) => !result || result.error)) {
    return defaultResults;
  }

  results = results.map((result) => result?.value?.[0]);

  return flatten ? results.flat() : results;
}
