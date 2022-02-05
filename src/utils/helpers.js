/**
 * Explodes a string representation of a coin-pair into an array.
 *
 * @param {string} coinPair
 * @returns {undefined|array}
 */
export function coinPairExplode(coinPair) {
  let coinPairChunks = coinPair.split("/");

  if (coinPairChunks.length !== 2) {
    return;
  }

  return coinPairChunks;
}

/**
 * Implodes an array representation of a coin-pair into a string.
 *
 * @param {array} coinPairChunks
 * @returns {undefined|string}
 */
export function coinPairImplode(coinPairChunks) {
  if (coinPairChunks.length !== 2) {
    return;
  }

  return coinPairChunks.join("/");
}
