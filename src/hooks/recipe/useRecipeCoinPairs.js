import { useCalls } from "@usedapp/core";
import { ethers, utils } from "ethers";
import abi from "../../web3/abi/CryptoChefsERC721Facet.json";
import { NETWORKS, TARGET_CHAIN } from "../../web3/constants";
import { useRecipeCoinPairIds } from "./useRecipeCoinPairIds";
import tokenMetadata from "../../web3/tokenMetadata.json";
import { coinPairExplode } from "../../utils/helpers";
import { Contract } from "@ethersproject/contracts";
import { logUseCalls } from "../../utils/loggers";

/**
 * Returns the available coin pair id-s in the contract merged with
 * metadata stored locally.
 *
 * @returns {*[]|unknown[]|undefined}
 */
export function useRecipeCoinPairs() {
  const abiInterface = new utils.Interface(abi);
  const address = NETWORKS[TARGET_CHAIN].contractMaster;
  const coinPairIds = useRecipeCoinPairIds();
  const defaultResults = [];

  const calls =
    coinPairIds?.map((coinPairId) => ({
      contract: new Contract(address, abiInterface),
      method: "getCoinPairSymbol",
      args: [coinPairId],
    })) ?? [];

  let results = useCalls(calls) ?? defaultResults;

  logUseCalls(results, calls);

  if (results.some((result) => !result || result.error)) {
    return defaultResults;
  }

  return results?.map((result, index) => {
    let coinPairSymbol =
      result?.value?.[0] && ethers.utils.parseBytes32String(result?.value?.[0]);
    let tokenSymbol = coinPairExplode(coinPairSymbol)?.[0];

    return {
      id: coinPairIds[index],
      symbol: tokenSymbol,
      ...tokenMetadata[tokenSymbol],
    };
  });
}
