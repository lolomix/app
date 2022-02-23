import { useConfig, useContractCall } from '@usedapp/core'
import { NETWORKS } from "../../web3/constants";
import { utils } from "ethers";
import abi from "../../web3/abi/CryptoChefsERC721Facet.json";
import { useEffect, useState } from "react";

/**
 * Returns the total amount of CHEFs in the Season.
 *
 * @returns {(any)[]|*[]}
 */
export function useChefSeasonSupply() {
  const { readOnlyChainId } = useConfig()
  const abiInterface = new utils.Interface(abi);
  const address = NETWORKS[readOnlyChainId].contractMaster;
  const [seasonSupplyFormatted, setSeasonSupplyFormatted] = useState();

  const [seasonSupply] =
    useContractCall(
      address &&
        abiInterface && {
          abi: abiInterface,
          address: address,
          method: "getCryptoChefSeasonSupply",
          args: [],
        }
    ) ?? [];

  useEffect(() => {
    setSeasonSupplyFormatted(seasonSupply?.toNumber());
  }, [seasonSupply]);

  return [seasonSupply, seasonSupplyFormatted];
}
