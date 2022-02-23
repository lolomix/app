import { NETWORKS } from "../../web3/constants";
import { useConfig, useEthers, useTokenAllowance } from "@usedapp/core";
import { formatUnits } from "@ethersproject/units";

/**
 * Returns the allowance of an AROMA token for an address
 *
 * @param {string|undefined} ownerAddress
 * @param {string|undefined} spenderAddress
 * @returns [{string|undefined},{BigNumber|undefined}]
 */
export function useAromaAllowance(
  ownerAddress = undefined,
  spenderAddress = undefined
) {
  const { readOnlyChainId } = useConfig();
  const tokenAddress = NETWORKS[readOnlyChainId].contractAroma;
  const { account } = useEthers();
  spenderAddress = spenderAddress || NETWORKS[readOnlyChainId].contractMaster;

  const allowance = useTokenAllowance(
    tokenAddress,
    ownerAddress ?? account,
    spenderAddress
  );

  return [allowance && formatUnits(allowance), allowance];
}
