import { useContractCall } from "@usedapp/core";
import { NETWORKS, TARGET_CHAIN } from "../web3/constants";
import abi from "../web3/abi/CryptoChefsERC721Facet.json";
import { utils } from "ethers";
import { useEffect, useState } from "react";
import { formatRecipe } from "../utils/formatters";

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

    setRecipeFormatted(formatRecipe(recipe));
  }, [recipe]);

  return [recipe, recipeFormatted];
}
