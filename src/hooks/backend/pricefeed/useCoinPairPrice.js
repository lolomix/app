import { useQuery } from "react-query";
import { useConfig } from '@usedapp/core'

/**
 * @param {string} symbol
 * @param {string} priceFeedApiUrl
 * @returns {Promise<any>}
 */
const getCoinPairPriceBySymbol = async (symbol, priceFeedApiUrl) => {
  const response = await fetch(
    `${priceFeedApiUrl}/binance/marketData/current/price?symbol=${symbol}`
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

/**
 * @param {string} symbol
 * @returns {{ data, dataUpdatedAt, error, errorUpdatedAt, failureCount, isError, isFetched, isFetchedAfterMount, isFetching, isIdle, isLoading, isLoadingError, isPlaceholderData, isPreviousData, isRefetchError, isRefetching, isStale, isSuccess, refetch, remove, status }}
 */
export default function useCoinPairPrice(symbol) {
  const {
    readOnlyChainSettings: { priceFeedApiUrl },
  } = useConfig();

  return useQuery(
    ["coinPairPrice", symbol],
    () => getCoinPairPriceBySymbol(symbol, priceFeedApiUrl),
    {
      enabled: !!symbol && !!priceFeedApiUrl,
      staleTime: 3600000, // mark it as stale after an hour
    }
  );
}
