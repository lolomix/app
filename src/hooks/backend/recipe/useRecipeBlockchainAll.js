import { useQuery } from "react-query";
import { NETWORKS } from "../../../web3/constants";
import { useConfig } from "@usedapp/core";

/**
 * @param {string} rewardsApi
 * @returns {Promise<any>}
 */
const getRecipeBlockchainAll = async (rewardsApi) => {
  const response = await fetch(`${rewardsApi}/blockchain/recipe/all`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

/*
 * @returns {UseQueryResult<*, unknown>}
 */
export default function useRecipeBlockchainAll() {
  const { readOnlyChainId } = useConfig();
  const rewardsApi = NETWORKS[readOnlyChainId].rewardsApi;

  return useQuery(["getRecipeBlockchainAll"], () => getRecipeBlockchainAll(rewardsApi), {
    enabled: !!rewardsApi,
    staleTime: 3600000, // mark it as stale after an hour
  });
}
