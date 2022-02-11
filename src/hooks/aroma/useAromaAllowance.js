import {
  AROMA_DECIMALS_DIGIT,
  NETWORKS,
  TARGET_CHAIN,
} from "../../web3/constants";
import { useEthers, useTokenAllowance } from "@usedapp/core";
import { formatUnits } from "@ethersproject/units";
import { useEffect, useState } from "react";

/**
 * Returns the allowance of an AROMA token for an address
 *
 * @param ownerAddress
 * @param spenderAddress
 * @returns {[]}
 */

export function useAromaAllowance(
  ownerAddress,
  spenderAddress = NETWORKS[TARGET_CHAIN].contractMaster
) {
  const tokenAddress = NETWORKS[TARGET_CHAIN].contractAroma;
  const { account } = useEthers();

  const allowance = useTokenAllowance(
    tokenAddress,
    ownerAddress ?? account,
    spenderAddress
  );
  const [balanceFormatted, setBalanceFormatted] = useState();

  useEffect(() => {
    allowance &&
      setBalanceFormatted(formatUnits(allowance, AROMA_DECIMALS_DIGIT));
  }, [allowance]);

  return [allowance, balanceFormatted];
}
