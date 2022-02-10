import { ethers } from "ethers";

/**
 * @param num
 * @param locales
 * @returns {string}
 */
export function formatCurrency(num, locales) {
  // if undefined then browser default will be used
  return new Intl.NumberFormat(locales, {
    maximumFractionDigits: 2,
  }).format(num);
}

/**
 * Truncates a string and adds the replacement at the end. It can also
 * truncate a string in the middle.
 *
 * @param string
 * @param after
 * @param before
 * @param replacement
 * @returns {string}
 */
export function truncate(
  string,
  after = 6,
  before = Infinity,
  replacement = "..."
) {
  return `${string.slice(0, after)}${replacement}${string.slice(before)}`;
}

/**
 * Formats raw recipe object to readable object
 *
 * @param recipe
 * @returns {{name: string, chefId: *, coinPairs: *, stakedAroma: *, timestamp: *, date: *}}
 */
export function formatRecipe(recipe) {
  if (!recipe) return;

  return {
    chefId: recipe.chefId?.toNumber(),
    name: recipe.name && ethers.utils.parseBytes32String(recipe.name),
    recipeId: recipe.recipeId,
    coinPairs: recipe.coinPairs?.map((pair) => ({
      id: pair?.id?.toNumber(),
      percentage: pair?.percentage?.toNumber(),
    })),
    stakedAroma: recipe.stakedAroma?.toNumber(),
    timestamp: recipe.timestamp?.toNumber(),
    date: recipe.timestamp && new Date(recipe.timestamp?.toNumber() * 1000).toLocaleString(),
  };
}
