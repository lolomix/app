/**
 * @param {array} results
 * @param {array} calls
 *
 * @todo introduce more sophisticated logger for useCall hooks
 * @todo add tests
 */
export function logUseCalls(results, calls) {
  results?.forEach((result, idx) => {
    if (!result?.error) {
      return;
    }
    console.debug(
      `Error encountered calling '${calls?.[idx]?.method}' on ${calls?.[idx]?.contract.address}: ${result.error.message}`
    );
  });
}

/**
 * @param {object|undefined} result
 * @param {object|undefined} call
 */
export function logUseCall(result, call) {
  logUseCalls([result], [call]);
}
