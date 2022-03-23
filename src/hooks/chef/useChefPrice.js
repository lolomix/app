import { useCall, useConfig } from "@usedapp/core";
import abi from "../../web3/abi/CryptoChefsERC721Facet.json";
import { utils } from "ethers";
import { formatUnits } from "@ethersproject/units";
import { Contract } from "@ethersproject/contracts";
import { logUseCall } from "../../utils/loggers";

/**
 * Returns the current price of a CHEF
 *
 * @returns {string|undefined}
 */
export function useChefPrice() {
  const {
    readOnlyChainSettings: { masterContractAddress: address },
  } = useConfig();
  const abiInterface = new utils.Interface(abi);
  const defaultResult = undefined;

  const call = {
    contract: new Contract(address, abiInterface),
    method: "getCryptoChefPrice",
    args: [],
  };

  const result = useCall(call) ?? defaultResult;

  logUseCall(result, call);

  if (!result?.value) {
    return defaultResult;
  }

  return result?.value?.[0] && formatUnits(result?.value?.[0]);
}
