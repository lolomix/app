import { NETWORKS, TARGET_CHAIN } from "../../web3/constants";
import { useEthers, useTokenAllowance } from "@usedapp/core";
import { formatUnits } from "@ethersproject/units";

/**
 * Returns the allowance of an AROMA token for an address
 *
 * @param {string|undefined} ownerAddress
 * @param {string} spenderAddress
 * @returns [{string|undefined},{BigNumber|undefined}]
 */
export function useAromaAllowance(
  ownerAddress = undefined,
  spenderAddress = NETWORKS[TARGET_CHAIN].contractMaster
) {
  const tokenAddress = NETWORKS[TARGET_CHAIN].contractAroma;
  const { account } = useEthers();

  const allowance = useTokenAllowance(
    tokenAddress,
    ownerAddress ?? account,
    spenderAddress
  );

  return [allowance && formatUnits(allowance), allowance];
}
