import { useTokenTotalSupply } from "../useTokenTotalSupply";
import { NETWORKS } from "../../web3/constants";
import abi from "../../web3/abi/CryptoChefsERC721Facet.json";
import { useConfig } from '@usedapp/core'

/**
 * @returns {*}
 */
export function useChefTotalSupply() {
  const { readOnlyChainId } = useConfig()
  const address = NETWORKS[readOnlyChainId].contractMaster;

  return useTokenTotalSupply(address, abi);
}
