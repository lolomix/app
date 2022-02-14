import { NETWORKS, TARGET_CHAIN } from "../../web3/constants";
import abi from "../../web3/abi/CryptoChefsERC721Facet.json";
import { useCall } from "@usedapp/core";
import { utils } from "ethers";
import { Contract } from "@ethersproject/contracts";
import { logUseCall } from "../../utils/loggers";

/**
 * Returns the balance of an CHEF NFTs for an address
 *
 * @param {string|undefined} targetAccount
 * @returns {number|undefined}
 */
export function useChefBalanceOf(targetAccount) {
  const abiInterface = new utils.Interface(abi);
  const address = NETWORKS[TARGET_CHAIN].contractMaster;
  const defaultResult = undefined;

  const call = targetAccount && {
    contract: new Contract(address, abiInterface),
    method: "balanceOf",
    args: [targetAccount],
  };

  const result = useCall(call) ?? defaultResult;

  logUseCall(result, call);

  if (!result?.value) {
    return defaultResult;
  }

  return result?.value?.[0]?.toNumber();
}
