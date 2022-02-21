import useCoinPairsPriceHistorical from "./useCoinPairsPriceHistorical";

/**
 * @param {string} symbol
 * @param {Date} start
 * @param {Date} end
 * @param {string} interval
 */
export default function useCoinPairPriceHistorical(
  symbol,
  start,
  end,
  interval
) {
  return useCoinPairsPriceHistorical([symbol], start, end, interval)?.[0];
}
