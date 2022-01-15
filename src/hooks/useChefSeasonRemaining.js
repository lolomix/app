import { useChefSeasonSupply } from "./useChefSeasonSupply";
import { useChefTotalSupply } from "./useChefTotalSupply";

/**
 * Returns the remaining amount of CHEFs for sale in the Season.
 *
 * @returns {*[]}
 */
export function useChefSeasonRemaining() {
  const [totalSupply] = useChefTotalSupply();
  const [seasonSupply] = useChefSeasonSupply();

  if (seasonSupply === undefined || totalSupply === undefined) return [];

  const seasonRemaining = seasonSupply.sub(totalSupply);
  const seasonRemainingFormatted = seasonRemaining.toNumber();

  return [seasonRemaining, seasonRemainingFormatted];
}
