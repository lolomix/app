const TOTAL_PERCENTAGE = 100;

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
