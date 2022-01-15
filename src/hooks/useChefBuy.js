import { useContractFunction } from "@usedapp/core";
import { NETWORKS, TARGET_CHAIN } from "../web3/constants";
import { Contract } from "@ethersproject/contracts";
import abi from "../web3/abi/CryptoChefsERC721Facet.json";

export function useChefBuy() {
  const contractAddress = NETWORKS[TARGET_CHAIN].contractMaster;
  const contract = new Contract(contractAddress, abi);
  const { send, state, events } = useContractFunction(
    contract,
    "buyCryptoChef",
    {
      transactionName: "Buy CHEF",
    }
  );

  return [send, state, events];
}
