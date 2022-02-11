import { useContractCalls } from "@usedapp/core";
import { NETWORKS, TARGET_CHAIN } from "../../web3/constants";
import abi from "../../web3/abi/CryptoChefsERC721Facet.json";
import { utils } from "ethers";
import { useEffect, useState } from "react";

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
  const [recipeIds, setRecipeIds] = useState();

  const calls = useContractCalls(
    chefIds?.map((chefId) => ({
      abi: abiInterface,
      address: address,
      method: "getRecipesOfChef",
      args: [chefId],
    })) ?? []
  );

  useEffect(() => {
    if (!calls || calls.some((call) => !call)) {
      return;
    }

    let ids = calls?.map((call) => call?.[0]);

    setRecipeIds(flatten ? ids.flat() : ids);
  }, [calls, flatten]);

  return recipeIds;
}
