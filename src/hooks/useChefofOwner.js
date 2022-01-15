import { useTokensOfOwner } from "./useTokensOfOwner";
import abi from "../web3/abi/CryptoChefsERC721Facet.json";
import { NETWORKS, TARGET_CHAIN } from "../web3/constants";

/**
 * @returns {*[]}
 */
export function useChefofOwner() {
  const address = NETWORKS[TARGET_CHAIN].contractMaster;

  return useTokensOfOwner(abi, address);
}
