import { useContractCalls } from "@usedapp/core";
import { useEffect, useState } from "react";
import { ethers, utils } from "ethers";
import abi from "../web3/abi/CryptoChefsERC721Facet.json";
import { NETWORKS, TARGET_CHAIN } from "../web3/constants";
import { useRecipeCoinPairIds } from "./useRecipeCoinPairIds";
import coinPairsMetadata from "../web3/coinPairsMetadata.json";

/**
 * Returns the available coin pair id-s in the contract merged with
 * metadata stored locally.
 *
 * @returns {*[]}
 *
 * @todo move formatted value to the first place in return array
 */
export function useRecipeCoinPairs() {
  const abiInterface = new utils.Interface(abi);
  const address = NETWORKS[TARGET_CHAIN].contractMaster;
  const [coinPairIds, coinPairIdsFormatted] = useRecipeCoinPairIds();
  const [symbolsFormatted, setSymbolsFormatted] = useState();
  const [pairs, setPairs] = useState();
  const [pairsFormatted, setPairsFormatted] = useState();

  const symbols = useContractCalls(
    coinPairIdsFormatted?.map((id) => ({
      abi: abiInterface,
      address: address,
      method: "getCoinPairSymbol",
      args: [id],
    })) ?? []
  );

  useEffect(() => {
    setSymbolsFormatted(
      symbols
        ?.filter((symbol) => symbol)
        ?.map((value) => {
          return value?.[0] && ethers.utils.parseBytes32String(value[0]);
        })
    );
  }, [symbols]);

  useEffect(() => {
    setPairsFormatted(
      coinPairIdsFormatted?.map((value, index) => {
        return {
          id: value,
          ...coinPairsMetadata.find(
            (item) => item.contractSymbol === symbolsFormatted[index]
          ),
        };
      })
    );
  }, [symbolsFormatted, coinPairIdsFormatted]);

  useEffect(() => {
    setPairs(
      coinPairIds?.map((value, index) => {
        return {
          id: value,
          contractSymbol: symbols?.[index]?.[0],
        };
      })
    );
  }, [symbols, coinPairIds]);

  return [pairs, pairsFormatted];
}
