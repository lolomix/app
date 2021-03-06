import { useCall, useConfig } from "@usedapp/core";
import abi from "../../web3/abi/CryptoChefsERC721Facet.json";
import { utils } from "ethers";
import { Contract } from "@ethersproject/contracts";
import { logUseCall } from "../../utils/loggers";

/**
 * Returns the available coin pair id-s in the contract
 *
 * @returns {*[]|*}
 */
export function useRecipeCoinPairIds() {
  const {
    readOnlyChainSettings: { masterContractAddress: address },
  } = useConfig();
  const abiInterface = new utils.Interface(abi);
  const defaultResult = [];

  const call = {
    contract: new Contract(address, abiInterface),
    method: "getAllCoinPairs",
    args: [],
  };

  const result = useCall(call) ?? defaultResult;

  logUseCall(result, call);

  if (!result?.value) {
    return defaultResult;
  }

  return result?.value?.[0]?.map((pair) => pair.toNumber());
}
