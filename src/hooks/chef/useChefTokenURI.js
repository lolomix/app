import { utils } from "ethers";
import { Contract } from "@ethersproject/contracts";
import { useCall, useConfig } from "@usedapp/core";
import { logUseCall } from "../../utils/loggers";
import abi from "../../web3/abi/CryptoChefsERC721Facet.json";

/**
 * @param {int|undefined} id
 * @returns {string|undefined}
 */
export function useChefTokenURI(id) {
  const {
    readOnlyChainSettings: { masterContractAddress: address },
  } = useConfig();
  const abiInterface = new utils.Interface(abi);
  const defaultResult = undefined;

  const call = id && {
    contract: new Contract(address, abiInterface),
    method: "tokenURI",
    args: [id],
  };

  const result = useCall(call) ?? defaultResult;

  logUseCall(result, call);

  if (!result?.value?.[0]) {
    return defaultResult;
  }

  return result?.value?.[0];
}
