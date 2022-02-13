import { useRecipeIdsOfChefs } from "./useRecipeIdsOfChefs";
import { useRecipesByIds } from "./useRecipesByIds";

/**
 * Returns the recipes of CHEFs
 *
 * @param {array|undefined} chefIds
 * @param {boolean} flatten
 * @returns {*[]|({name: string, chefId: *, id: *, coinPairs: *, stakedAroma: *, timestamp: *, date: *}|undefined)[]|unknown[]|undefined}
 */
export function useRecipesOfChefs(chefIds, flatten = false) {
  const recipeIdsOfChefs = useRecipeIdsOfChefs(chefIds);
  const recipes = useRecipesByIds(recipeIdsOfChefs?.flat());

  return flatten
    ? recipes
    : recipeIdsOfChefs?.map((recipeIds) => {
        return recipeIds.map((recipeId) =>
          recipes.find((recipe) => recipe?.id === recipeId)
        );
      });
}
