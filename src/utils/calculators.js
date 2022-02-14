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
        performance = getRelativePercentageDifferenceBetween(
          currentCoinPairPrice.close,
          array[i - 1].close
        );
      }
      return { ...currentCoinPairPrice, performance: performance };
    });
  });
}

/**
 * @param {number} newValue
 * @param {number} referenceValue
 * @returns {number}
 */
export function getRelativePercentageDifferenceBetween(
  newValue,
  referenceValue
) {
  return ((newValue - referenceValue) / referenceValue) * TOTAL_PERCENTAGE;
}

/**
 * @param {array} ticksOfCoinPairs
 * @param {array} percentages
 * @returns {any[]}
 */
export function calculateAggregatedPerformanceOfCoinPairs(
  ticksOfCoinPairs,
  percentages
) {
  let aggregatedPerformances = [];

  if (
    ticksOfCoinPairs.length !== percentages.length ||
    ticksOfCoinPairs?.some(
      (performances) =>
        !performances ||
        !Array.isArray(performances) ||
        performances.length === 0
    )
  ) {
    return aggregatedPerformances;
  }

  ticksOfCoinPairs.forEach((ticks, ticksIndex) => {
    ticks.forEach((tick, tickIndex) => {
      aggregatedPerformances[tickIndex] =
        (aggregatedPerformances?.[tickIndex] ?? 0) +
        getPercentageOfValue(percentages[ticksIndex], tick.performance);
    });
  });

  return aggregatedPerformances;
}

/**
 * @param {number} percentage
 * @param {number} value
 * @returns {number}
 */
export function getPercentageOfValue(percentage, value) {
  return (value / TOTAL_PERCENTAGE) * percentage;
}
