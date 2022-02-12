import { useContractFunction } from "@usedapp/core";
import { NETWORKS, TARGET_CHAIN } from "../../web3/constants";
import abi from "../../web3/abi/CryptoChefsERC721Facet.json";
import { Contract } from "@ethersproject/contracts";

/**
 * @returns {(((...args: any[]) => Promise<void>)|TransactionStatus|LogDescription[]|(() => void))[]}
 */
export function useRecipeCalculateId() {
  const address = NETWORKS[TARGET_CHAIN].contractMaster;
  const contract = new Contract(address, abi);

  const { send, state, events, resetState } = useContractFunction(
    contract,
    "calculateRecipeId",
    {
      transactionName: "Calculate Recipe ID",
    }
  );

  return [send, state, events, resetState];
}