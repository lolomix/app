import { useContractCalls } from "@usedapp/core";
import { NETWORKS, TARGET_CHAIN } from "../web3/constants";
import abi from "../web3/abi/CryptoChefsERC721Facet.json";
import { utils } from "ethers";
import { useEffect, useState } from "react";
import { formatRecipe } from "../utils/formatters";

/**
 * Returns the recipes by ids
 *
 * @param recipeIds
 * @returns {*[]}
 */
export function useRecipesByIds(recipeIds) {
  const abiInterface = new utils.Interface(abi);
  const address = NETWORKS[TARGET_CHAIN].contractMaster;
  const [recipesFormatted, setRecipesFormatted] = useState();
  const [recipes, setRecipes] = useState();

  const results = useContractCalls(
    recipeIds?.map((recipeId) => ({
      abi: abiInterface,
      address: address,
      method: "getRecipeById",
      args: [recipeId],
    })) ?? []
  );

  useEffect(() => {
    setRecipes(
      results?.map((result, i) => {
        return result?.[0] && { ...result[0], recipeId: recipeIds[i] };
      })
    );
  }, [results]);

  useEffect(() => {
    setRecipesFormatted(recipes?.map((recipe) => formatRecipe(recipe)));
  }, [recipes]);

  return [recipes, recipesFormatted];
}
