import { useQuery } from "react-query";
import { useConfig } from "@usedapp/core";

/**
 * @param {string} rewardsApiUrl
 * @returns {Promise<any>}
 */
const getRecipePerformanceAll = async (rewardsApiUrl) => {
  const response = await fetch(
    `${rewardsApiUrl}/performance/recipe/cached/all`
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

/**
 * @returns {{ data, dataUpdatedAt, error, errorUpdatedAt, failureCount, isError, isFetched, isFetchedAfterMount, isFetching, isIdle, isLoading, isLoadingError, isPlaceholderData, isPreviousData, isRefetchError, isRefetching, isStale, isSuccess, refetch, remove, status }}
 */
export default function useRecipePerformanceAll() {
  const {
    readOnlyChainSettings: { rewardsApiUrl },
  } = useConfig();

  return useQuery(
    ["getRecipePerformanceAll"],
    () => getRecipePerformanceAll(rewardsApiUrl),
    {
      enabled: !!rewardsApiUrl,
      staleTime: 3600000, // mark it as stale after an hour
    }
  );
}
