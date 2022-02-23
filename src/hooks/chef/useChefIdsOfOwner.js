import { useTokensOfOwner } from "../useTokensOfOwner";
import abi from "../../web3/abi/CryptoChefsERC721Facet.json";
import { NETWORKS } from "../../web3/constants";
import { useConfig } from '@usedapp/core'

/**
 * Returns the chefIds of the current account
 *
 * @returns {(any)[]|*[]}
 */
export function useChefIdsOfOwner() {
  const { readOnlyChainId } = useConfig();
  const address = NETWORKS[readOnlyChainId].contractMaster;

  return useTokensOfOwner(abi, address);
}
