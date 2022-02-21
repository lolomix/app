import { getHours, isSunday, previousSunday } from "date-fns";

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
  if (coinPairChunks.length !== 2 || coinPairChunks.some((symbol) => !symbol)) {
    return;
  }

  return coinPairChunks.join("/");
}

/**
 * Gets last Sunday precisely to the hours defined
 *
 * @param {int} hours
 * @param {Date} date
 */
export function getLastSundayAt(hours = 0, date = new Date()) {
  let sunday = previousSunday(date);

  if (isSunday(date) && getHours(date) >= hours) {
    sunday = date;
  }

  sunday.setHours(hours);
  sunday.setMinutes(0);
  sunday.setSeconds(0);

  return sunday;
}
