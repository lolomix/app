import { useConfig, useTokenBalance } from "@usedapp/core";
import { formatUnits } from "@ethersproject/units";
import { useEffect, useState } from "react";

/**
 * Returns the balance of an AROMA token for an address
 *
 * @param targetAccount
 * @returns {(BigNumber|string)[]|*[]}
 */
export function useAromaBalanceOf(targetAccount) {
  const {
    readOnlyChainSettings: { aromaContractAddress: tokenAddress },
  } = useConfig();
  const balance = useTokenBalance(tokenAddress, targetAccount);
  const [balanceFormatted, setBalanceFormatted] = useState();

  useEffect(() => {
    balance && setBalanceFormatted(formatUnits(balance));
  }, [balance]);

  return [balance, balanceFormatted];
}
