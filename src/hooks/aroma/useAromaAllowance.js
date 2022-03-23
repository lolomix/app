import { useCall, useConfig, useEthers } from "@usedapp/core";
import { formatUnits, parseUnits } from "@ethersproject/units";
import { Contract } from "@ethersproject/contracts";
import { logUseCall } from "../../utils/loggers";
import { ERC20Interface } from "@usedapp/core";

/**
 * Returns the allowance of an AROMA token for an address
 *
 * @param {string|undefined} ownerAddress
 * @param {string|undefined} spenderAddress
 * @returns {{}|{bnAllowance: any, allowance: (any|string), hasAllowance: (function(*=))}}
 */
export function useAromaAllowance(
  ownerAddress = undefined,
  spenderAddress = undefined
) {
  const { readOnlyChainSettings } = useConfig();
  const tokenAddress = readOnlyChainSettings.aromaContractAddress;
  const { account } = useEthers();
  const defaultResult = {
    allowance: undefined,
    bnAllowance: undefined,
    hasAllowance: () => undefined,
  };

  spenderAddress = spenderAddress || readOnlyChainSettings.masterContractAddress;
  ownerAddress = ownerAddress || account;

  const call = {
    contract: new Contract(tokenAddress, ERC20Interface),
    method: "allowance",
    args: [ownerAddress, spenderAddress],
  };

  const result = useCall(call) ?? defaultResult;

  logUseCall(result, call);

  if (!result?.value) {
    return defaultResult;
  }

  return {
    allowance: result?.value?.[0] && formatUnits(result?.value?.[0]),
    bnAllowance: result?.value?.[0],
    hasAllowance: (amount) => {
      amount = (amount && parseFloat(amount)) || Number.MAX_SAFE_INTEGER;
      const bnAmount = parseUnits(amount.toString());
      return bnAmount && result?.value?.[0]?.gte(bnAmount);
    },
  };
}
