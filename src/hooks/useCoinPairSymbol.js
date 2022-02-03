import { useEffect, useState } from "react";
import { useContractCall } from "@usedapp/core";
import { NETWORKS, TARGET_CHAIN } from "../web3/constants";
import abi from "../web3/abi/CryptoChefsERC721Facet.json";
import { ethers, utils } from "ethers";

/**
 *
 * Returns the coin pair symbol by an id
 *
 *
 * @param id
 * @returns {(any)[]}
 */
export function useRecipeCoinPairSymbol(id) {
  const abiInterface = new utils.Interface(abi);
  const address = NETWORKS[TARGET_CHAIN].contractMaster;
  const [coinPairSymbolFormatted, setCoinPairSymbolFormatted] = useState();

  const [coinPairSymbol] =
    useContractCall(
      id && {
        abi: abiInterface,
        address: address,
        method: "getCoinPairSymbol",
        args: [id],
      }
    ) ?? [];

  useEffect(() => {
    setCoinPairSymbolFormatted(
      coinPairSymbol && ethers.utils.parseBytes32String(coinPairSymbol)
    );
  }, [coinPairSymbol]);

  return [coinPairSymbol, coinPairSymbolFormatted];
}
