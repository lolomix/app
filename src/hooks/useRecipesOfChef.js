import { useRecipeIdsOfChefs } from "./useRecipeIdsOfChefs";
import { useRecipesByIds } from "./useRecipesByIds";

/**
 * Returns the recipes of a CHEF
 *
 * @param chefId
 * @returns {*[]|string[]}
 */
export function useRecipesOfChef(chefId) {
  const recipeIds = useRecipeIdsOfChefs([chefId], true);
  return useRecipesByIds(recipeIds);
}
