import {
  AROMA_DECIMALS_DIGIT,
  NETWORKS,
  TARGET_CHAIN,
} from "../../web3/constants";
import abi from "../../web3/abi/CryptoChefsERC721Facet.json";
import { formatUnits } from "@ethersproject/units";
import { useContractCall } from "@usedapp/core";
import { utils } from "ethers";
import { useEffect, useState } from "react";

/**
 * Returns the balance of an CHEF NFTs for an address
 *
 * @param targetAccount
 * @returns {undefined}
 */
export function useChefBalanceOf(targetAccount) {
  const abiInterface = new utils.Interface(abi);
  const address = NETWORKS[TARGET_CHAIN].contractMaster;
  const [balanceFormatted, setBalanceFormatted] = useState();

  const [balance] =
    useContractCall(
      targetAccount && {
        abi: abiInterface,
        address: address,
        method: "balanceOf",
        args: [targetAccount],
      }
    ) ?? [];

  useEffect(() => {
    balance && setBalanceFormatted(formatUnits(balance, AROMA_DECIMALS_DIGIT));
  }, [balance]);

  return [balance, balanceFormatted];
}
