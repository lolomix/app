import { useCall, useConfig } from "@usedapp/core";
import { ethers, utils } from "ethers";
import abi from "../../web3/abi/CryptoChefsERC721Facet.json";
import { Contract } from "@ethersproject/contracts";
import { logUseCall } from "../../utils/loggers";

/**
 * Returns the coin pair id by a symbol
 *
 * @param {string|undefined} symbol
 * @returns {number|undefined}
 *
 * @todo handle retries exhausted error if incorrect coin pair symbol supplied
 */
export function useCoinPairId(symbol) {
  const {
    readOnlyChainSettings: { masterContractAddress: address },
  } = useConfig();
  const abiInterface = new utils.Interface(abi);
  const defaultResult = undefined;

  const call = symbol && {
    contract: new Contract(address, abiInterface),
    method: "getCoinPairId",
    args: [ethers.utils.formatBytes32String(symbol)],
  };

  const result = useCall(call) ?? defaultResult;

  logUseCall(result, call);

  if (!result?.value) {
    return defaultResult;
  }

  return result?.value?.[0]?.toNumber();
}
