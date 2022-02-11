import { useRecipeIdsOfChefs } from "./useRecipeIdsOfChefs";
import { useRecipesByIds } from "./useRecipesByIds";
import { useEffect, useState } from "react";

/**
 * Returns the recipes of CHEFs
 *
 * @param chefIds
 * @param flatten
 * @returns {*[]|string[]}
 */
export function useRecipesOfChefs(chefIds, flatten = false) {
  const recipeIdsOfChefs = useRecipeIdsOfChefs(chefIds);
  const [, recipesFormatted] = useRecipesByIds(recipeIdsOfChefs?.flat());
  const [recipes, setRecipes] = useState();

  useEffect(() => {
    if (!recipesFormatted || !recipeIdsOfChefs) {
      return;
    }

    setRecipes(
      flatten
        ? recipesFormatted
        : recipeIdsOfChefs?.map((recipeIds) => {
            return recipeIds.map((recipeId) =>
              recipesFormatted.find((recipe) => recipe?.id === recipeId)
            );
          })
    );
  }, [recipesFormatted, recipeIdsOfChefs, flatten]);

  return recipes;
}
