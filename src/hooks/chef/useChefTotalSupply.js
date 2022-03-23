import { useTokenTotalSupply } from "../useTokenTotalSupply";
import abi from "../../web3/abi/CryptoChefsERC721Facet.json";
import { useConfig } from "@usedapp/core";

/**
 * @returns {*}
 */
export function useChefTotalSupply() {
  const {
    readOnlyChainSettings: { masterContractAddress: address },
  } = useConfig();

  return useTokenTotalSupply(address, abi);
}
