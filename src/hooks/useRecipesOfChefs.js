import { useRecipeIdsOfChefs } from "./useRecipeIdsOfChefs";
import { useRecipesByIds } from "./useRecipesByIds";

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

  if (flatten) {
    return recipesFormatted;
  }

  return recipeIdsOfChefs.map((recipeIds) => {
    return recipeIds.map((recipeId) =>
      recipesFormatted.find((recipe) => recipe.recipeId === recipeId)
    );
  });
}
