import { useTokensOfOwner } from "./useTokensOfOwner";
import abi from "../web3/abi/CryptoChefsERC721Facet.json";
import { NETWORKS, TARGET_CHAIN } from "../web3/constants";

/**
 * Returns the chefIds of the current account
 *
 * @returns {(any)[]|*[]}
 */
export function useChefIdsOfOwner() {
  const address = NETWORKS[TARGET_CHAIN].contractMaster;

  return useTokensOfOwner(abi, address);
}
