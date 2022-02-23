import { useCall, useConfig } from '@usedapp/core'
import { NETWORKS } from "../../web3/constants";
import abi from "../../web3/abi/CryptoChefsERC721Facet.json";
import { ethers, utils } from "ethers";
import { Contract } from "@ethersproject/contracts";
import { logUseCall } from "../../utils/loggers";

/**
 * Returns the coin pair symbol of an id
 *
 * @param {number|undefined} id
 * @returns {string|undefined}
 */
export function useCoinPairSymbol(id) {
  const { readOnlyChainId } = useConfig();
  const abiInterface = new utils.Interface(abi);
  const address = NETWORKS[readOnlyChainId].contractMaster;
  const defaultResult = undefined;

  const call = id && {
    contract: new Contract(address, abiInterface),
    method: "getCoinPairSymbol",
    args: [id],
  };

  const result = useCall(call) ?? defaultResult;

  logUseCall(result, call);

  if (!result?.value) {
    return defaultResult;
  }

  return (
    result?.value?.[0] && ethers.utils.parseBytes32String(result?.value?.[0])
  );
}
