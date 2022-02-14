const TOTAL_PERCENTAGE = 100;

/**
 * @param {array} coinPairs
 * @param {array} percentages
 * @returns {any[]}
 *
 * @todo refactor for performance
 */
export function calculateAggregatedPerformanceOfCoinPairs(
  coinPairs,
  percentages
) {
  let aggregatedPerformanceOfCoinPairs = [];

  coinPairs.forEach((coinPairPerformances, coinPairPerformancesIndex) => {
    coinPairPerformances?.forEach(
      (coinPairPerformance, coinPairPerformanceIndex) => {
        aggregatedPerformanceOfCoinPairs[coinPairPerformanceIndex] =
          (aggregatedPerformanceOfCoinPairs?.[coinPairPerformanceIndex] ?? 0) +
          (coinPairPerformance.performance / 100) *
            percentages[coinPairPerformancesIndex];
      }
    );
  });

  return aggregatedPerformanceOfCoinPairs;
}

/**
 * @param {array} coinPairs
 * @returns {any[]}
 */
export function calculatePerformanceOfCoinPairs(coinPairs) {
  return coinPairs.map((coinPairPrices) => {
    return coinPairPrices.map((currentCoinPairPrice, i, array) => {
      let performance = 0;

      if (i !== 0) {
        performance = getPercentageChangeBetweenPrices(
          currentCoinPairPrice.close,
          array[i - 1].close
        );
      }
      return { ...currentCoinPairPrice, performance: performance };
    });
  });
}

/**
 * @param {number} newPrice
 * @param {number} oldPrice
 * @returns {number}
 */
function getPercentageChangeBetweenPrices(newPrice, oldPrice) {
  return ((newPrice - oldPrice) / oldPrice) * TOTAL_PERCENTAGE;
}
