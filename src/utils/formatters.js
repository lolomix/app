/**
 * @param num
 * @returns {string}
 */
export function formatCurrency (num) {
  // if undefined then browser default will be used
  return new Intl.NumberFormat(undefined, {
    maximumFractionDigits: 2
  }).format(num)
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
export function truncate(string, after = 6, before = Infinity, replacement = '...') {
  return `${string.slice(0, after)}${replacement}${string.slice(before)}`;
}