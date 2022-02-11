import { useContractCall } from "@usedapp/core";
import {
  AROMA_DECIMALS_DIGIT,
  NETWORKS,
  TARGET_CHAIN,
} from "../../web3/constants";
import abi from "../../web3/abi/CryptoChefsERC721Facet.json";
import { utils } from "ethers";
import { formatUnits } from "@ethersproject/units";
import { useEffect, useState } from "react";

/**
 * Returns the current price of AROMA token
 *
 * @returns {(any|string)[]|*[]}
 */
export function useAromaPrice() {
  const abiInterface = new utils.Interface(abi);
  const address = NETWORKS[TARGET_CHAIN].contractMaster;
  const [priceFormatted, setPriceFormatted] = useState();

  const [price] =
    useContractCall({
      abi: abiInterface,
      address: address,
      method: "getAROMAPrice",
      args: [],
    }) ?? [];

  useEffect(() => {
    price && setPriceFormatted(formatUnits(price, AROMA_DECIMALS_DIGIT));
  }, [price]);

  return [price, priceFormatted];
}
