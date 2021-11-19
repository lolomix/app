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



