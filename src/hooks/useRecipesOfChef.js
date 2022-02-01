import { useRecipeIdsOfChef } from "./useRecipeIdsOfChef";
import { useRecipesByIds } from "./useRecipesByIds";

/**
 * Returns the recipes of a CHEF
 *
 * @param chefId
 * @returns {*[]|string[]}
 */
export function useRecipesOfChef(chefId) {
  const recipeIds = useRecipeIdsOfChef(chefId);
  return useRecipesByIds(recipeIds);
}
