import { useTokensOfOwner } from "../useTokensOfOwner";
import abi from "../../web3/abi/CryptoChefsERC721Facet.json";
import { useConfig } from "@usedapp/core";

/**
 * Returns the chefIds of the current account
 *
 * @returns {(any)[]|*[]}
 */
export function useChefIdsOfOwner() {
  const {
    readOnlyChainSettings: { masterContractAddress: address },
  } = useConfig();

  return useTokensOfOwner(abi, address);
}
