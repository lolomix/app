import { useQuery } from "react-query";
import { useConfig } from "@usedapp/core";

/**
 * @param {string} address
 * @param {string} rewardsApiUrl
 * @returns {Promise<any>}
 */
const getRewardAccumulated = async (address, rewardsApiUrl) => {
  const response = await fetch(
    `${rewardsApiUrl}/reward/all/accumulated/${address}`
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

/**
 * @param {string|undefined} address
 * @returns {{ data, dataUpdatedAt, error, errorUpdatedAt, failureCount, isError, isFetched, isFetchedAfterMount, isFetching, isIdle, isLoading, isLoadingError, isPlaceholderData, isPreviousData, isRefetchError, isRefetching, isStale, isSuccess, refetch, remove, status }}
 */
export default function useRewardAccumulated(address) {
  const {
    readOnlyChainSettings: { rewardsApiUrl },
  } = useConfig();

  const query = useQuery(
    ["getRewardAccumulated", address],
    () => getRewardAccumulated(address, rewardsApiUrl),
    {
      enabled: !!address && !!rewardsApiUrl,
      staleTime: 3600000, // mark it as stale after an hour
    }
  );

  return {
    ...query,
    reward: query?.data,
    hasReward: (amount) => query?.data !== 0 && query?.data >= (amount || 0),
  };
}
