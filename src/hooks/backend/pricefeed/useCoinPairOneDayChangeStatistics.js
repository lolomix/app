import { useQuery } from "react-query";
import { useConfig } from '@usedapp/core'

/**
 * @param {string} symbol
 * @param {string} priceFeedApiUrl
 * @returns {Promise<any>}
 */
const getCoinPairOneDayChangeStatisticsBySymbol = async (symbol, priceFeedApiUrl) => {
  const response = await fetch(
    `${priceFeedApiUrl}/binance/marketData/current/oneDayChangeStatistics?symbol=${symbol}`
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
  const {
    readOnlyChainSettings: { priceFeedApiUrl },
  } = useConfig();

  return useQuery(
    ["coinPairOneDayChangeStatistics", symbol],
    () => getCoinPairOneDayChangeStatisticsBySymbol(symbol, priceFeedApiUrl),
    {
      enabled: !!symbol && !!priceFeedApiUrl,
      staleTime: 3600000, // mark it as stale after an hour
    }
  );
}
