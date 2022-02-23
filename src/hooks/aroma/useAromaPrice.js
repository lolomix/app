import { useCall, useConfig } from '@usedapp/core'
import { NETWORKS } from "../../web3/constants";
import abi from "../../web3/abi/CryptoChefsERC721Facet.json";
import { utils } from "ethers";
import { formatUnits } from "@ethersproject/units";
import { Contract } from "@ethersproject/contracts";
import { logUseCall } from "../../utils/loggers";

/**
 * Returns the current price of AROMA token
 *
 * @returns {string|undefined}
 */
export function useAromaPrice() {
  const { readOnlyChainId } = useConfig();
  const abiInterface = new utils.Interface(abi);
  const address = NETWORKS[readOnlyChainId].contractMaster;
  const defaultResult = undefined;

  const call = {
    contract: new Contract(address, abiInterface),
    method: "getAROMAPrice",
    args: [],
  };

  const result = useCall(call) ?? defaultResult;

  logUseCall(result, call);

  if (!result?.value) {
    return defaultResult;
  }

  return result?.value?.[0] && formatUnits(result?.value?.[0]);
}
