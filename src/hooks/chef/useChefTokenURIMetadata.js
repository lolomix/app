import { useQuery } from "react-query";

/**
 * @param {string} url
 * @returns {Promise<any>}
 */
const getChefTokenURIMetadata = async (url) => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

/**
 * @param {string|undefined} url
 * @returns {{ data, dataUpdatedAt, error, errorUpdatedAt, failureCount, isError, isFetched, isFetchedAfterMount, isFetching, isIdle, isLoading, isLoadingError, isPlaceholderData, isPreviousData, isRefetchError, isRefetching, isStale, isSuccess, refetch, remove, status }}
 */
export default function useChefTokenURIMetadata(url) {
  return useQuery(
    ["chefTokenURIMetadata", url],
    () => getChefTokenURIMetadata(url),
    {
      enabled: !!url,
      staleTime: 3600000, // mark it as stale after an hour
    }
  );
}
