import {
  AROMA_DECIMALS_DIGIT,
  NETWORKS,
  TARGET_CHAIN,
} from "../web3/constants";
import { useTokenBalance } from "@usedapp/core";
import { formatUnits } from "@ethersproject/units";
import { useEffect, useState } from "react";

/**
 * Returns the balance of an AROMA token for an address
 *
 * @param targetAccount
 * @returns {(BigNumber|string)[]|*[]}
 */
export function useAromaBalanceOf(targetAccount) {
  const tokenAddress = NETWORKS[TARGET_CHAIN].contractAroma;
  const balance = useTokenBalance(tokenAddress, targetAccount);
  const [balanceFormatted, setBalanceFormatted] = useState();

  useEffect(() => {
    balance && setBalanceFormatted(formatUnits(balance, AROMA_DECIMALS_DIGIT));
  }, [balance]);

  return [balance, balanceFormatted];
}
