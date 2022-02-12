import { useQuery } from "react-query";

/**
 * @param symbol
 * @returns {Promise<any>}
 *
 * @todo abstract url from the hook
 */
const getCoinPairOneDayChangeStatisticsbySymbol = async (symbol) => {
  const response = await fetch(
    `https://price-feed-api-3-bmefzfc5ta-oa.a.run.app/binance/marketData/current/oneDayChangeStatistics?symbol=${symbol}`
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

/**
 * @param symbol
 * @returns {{ data, dataUpdatedAt, error, errorUpdatedAt, failureCount, isError, isFetched, isFetchedAfterMount, isFetching, isIdle, isLoading, isLoadingError, isPlaceholderData, isPreviousData, isRefetchError, isRefetching, isStale, isSuccess, refetch, remove, status }}
 */
export default function useCoinPairOneDayChangeStatistics(symbol) {
  return useQuery(
    ["coinPairOneDayChangeStatistics", symbol],
    () => getCoinPairOneDayChangeStatisticsbySymbol(symbol),
    {
      enabled: !!symbol,
      refetchInterval: 3600000, // only refetch after an hour
    }
  );
}
