import { useChefIdsOfOwner } from "./useChefIdsOfOwner";
import { useRecipesOfChefs } from "./useRecipesOfChefs";

/**
 * Returns the recipes of the current account
 *
 * @returns {*[]|string[]}
 */
export function useRecipesOfOwner() {
  const chefIds = useChefIdsOfOwner();
  return useRecipesOfChefs(chefIds, true);
}
