import { utils } from "ethers";
import { useEffect, useState } from "react";
import { formatRecipe } from "../utils/formatters";
import { useContractCall } from "@usedapp/core";
import abi from "../web3/abi/CryptoChefsERC721Facet.json";
import { NETWORKS, TARGET_CHAIN } from "../web3/constants";

/**
 * @param recipeId
 * @returns {any[]}
 */
export function useRecipeById(recipeId) {
  const abiInterface = new utils.Interface(abi);
  const address = NETWORKS[TARGET_CHAIN].contractMaster;
  const [recipeFormatted, setRecipeFormatted] = useState();

  const [recipe] =
    useContractCall(
      recipeId && {
        abi: abiInterface,
        address: address,
        method: "getRecipeById",
        args: [recipeId],
      }
    ) ?? [];

  useEffect(() => {
    if (!recipe) return;

    setRecipeFormatted(formatRecipe({ ...recipe, recipeId }));
  }, [recipe, recipeId]);

  return [recipe, recipeFormatted];
}
