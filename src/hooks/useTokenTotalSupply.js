import { useContractCall } from "@usedapp/core";
import { ERC20Interface } from "@usedapp/core";
import { utils } from "ethers";
import { useEffect, useState } from "react";

/**
 * Returns the total amount of tokens stored by the contract.
 *
 * @param tokenAddress
 * @param tokenAbi
 * @returns {any}
 */
export function useTokenTotalSupply(tokenAddress, tokenAbi = null) {
  let abiInterface = ERC20Interface;

  if (tokenAbi !== null) {
    abiInterface = new utils.Interface(tokenAbi);
  }

  const [totalSupplyFormatted, setTotalSupplyFormatted] = useState();

  const [totalSupply] =
    useContractCall(
      tokenAddress && {
        abi: abiInterface,
        address: tokenAddress,
        method: "totalSupply",
        args: [],
      }
    ) ?? [];

  useEffect(() => {
    setTotalSupplyFormatted(totalSupply?.toNumber());
  }, [totalSupply]);

  return [totalSupply, totalSupplyFormatted];
}
