import { useQuery } from "react-query";
import { NETWORKS } from "../../web3/constants";
import { useConfig } from "@usedapp/core";

/**
 * @param {string} rewardsApi
 * @returns {Promise<any>}
 */
const getRecipePerformanceAll = async (rewardsApi) => {
  const response = await fetch(`${rewardsApi}/performance/recipe/cached/all`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

/**
 * @returns {{ data, dataUpdatedAt, error, errorUpdatedAt, failureCount, isError, isFetched, isFetchedAfterMount, isFetching, isIdle, isLoading, isLoadingError, isPlaceholderData, isPreviousData, isRefetchError, isRefetching, isStale, isSuccess, refetch, remove, status }}
 */
export default function useRecipePerformanceAll() {
  const { readOnlyChainId } = useConfig();
  const rewardsApi = NETWORKS[readOnlyChainId].rewardsApi;

  return useQuery(["getRecipePerformanceAll"], () => getRecipePerformanceAll(rewardsApi), {
    enabled: !!rewardsApi,
    staleTime: 3600000, // mark it as stale after an hour
  });
}
