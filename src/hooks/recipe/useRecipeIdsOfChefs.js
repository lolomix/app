import { useCalls, useConfig } from "@usedapp/core";
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
  const {
    readOnlyChainSettings: { masterContractAddress: address },
  } = useConfig();
  const abiInterface = new utils.Interface(abi);
  const defaultResults = undefined;

  const calls =
    chefIds?.map((chefId) => ({
      contract: new Contract(address, abiInterface),
      method: "getRecipesOfChef",
      args: [chefId],
    })) ?? [];

  let results = useCalls(calls) ?? defaultResults;

  logUseCalls(results, calls);

  if (
    results?.length <= 0 ||
    results?.some((result) => !result || result.error)
  ) {
    return defaultResults;
  }

  results = results?.map((result) => result?.value?.[0]);

  return flatten ? results?.flat() : results;
}
