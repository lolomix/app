import { useEffect, useState } from "react";
import { useContractCall } from "@usedapp/core";
import { NETWORKS, TARGET_CHAIN } from "../web3/constants";
import { ethers, utils } from "ethers";
import abi from "../web3/abi/CryptoChefsERC721Facet.json";

/**
 *
 * Returns the coin pair id by a symbol
 *
 * @param {undefined|string} symbol
 * @returns {(any)[]}
 *
 * @todo handle retries exhausted error if incorrect coin pair symbol supplied
 */
export function useRecipeCoinPairId(symbol) {
  const abiInterface = new utils.Interface(abi);
  const address = NETWORKS[TARGET_CHAIN].contractMaster;
  const [coinPairIdFormatted, setCoinPairIdFormatted] = useState();

  const [coinPairId] =
    useContractCall(
      symbol && {
        abi: abiInterface,
        address: address,
        method: "getCoinPairId",
        args: [ethers.utils.formatBytes32String(symbol)],
      }
    ) ?? [];

  useEffect(() => {
    setCoinPairIdFormatted(coinPairId?.toNumber());
  }, [coinPairId]);

  return [coinPairId, coinPairIdFormatted];
}
