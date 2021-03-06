import { useConfig, useContractFunction } from "@usedapp/core";
import abi from "../../web3/abi/CryptoChefsERC721Facet.json";
import { Contract } from "@ethersproject/contracts";

/**
 * @returns {(((...args: any[]) => Promise<void>)|TransactionStatus|LogDescription[]|(() => void))[]}
 */
export function useRecipeCreate() {
  const {
    readOnlyChainSettings: { masterContractAddress: address },
  } = useConfig();
  const contract = new Contract(address, abi);

  const { send, state, events, resetState } = useContractFunction(
    contract,
    "createRecipe",
    {
      transactionName: "Create a Recipe",
    }
  );

  return [send, state, events, resetState];
}
