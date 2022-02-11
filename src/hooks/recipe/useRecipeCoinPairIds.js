import { useEffect, useState } from "react";
import { useContractCall } from "@usedapp/core";
import { NETWORKS, TARGET_CHAIN } from "../../web3/constants";
import abi from "../../web3/abi/CryptoChefsERC721Facet.json";
import { utils } from "ethers";

/**
 * Returns the available coin pair id-s in the contract
 *
 * @returns {any[]}
 *
 * @todo move formatted value to the first place in return array
 */
export function useRecipeCoinPairIds() {
  const abiInterface = new utils.Interface(abi);
  const address = NETWORKS[TARGET_CHAIN].contractMaster;

  const [coinPairsFormatted, setCoinPairsFormatted] = useState();

  const [coinPairIds] =
    useContractCall({
      abi: abiInterface,
      address: address,
      method: "getAllCoinPairs",
      args: [],
    }) ?? [];

  useEffect(() => {
    setCoinPairsFormatted(coinPairIds?.map((pair) => pair.toNumber()));
  }, [coinPairIds]);

  return [coinPairIds, coinPairsFormatted];
}
