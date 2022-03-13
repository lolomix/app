import { useQuery } from "react-query";
import { PRICE_FEED_API } from "../../../web3/constants";

/**
 * @param {string} symbol
 * @returns {Promise<any>}
 */
const getCoinPairPriceBySymbol = async (symbol) => {
  const response = await fetch(
    `${PRICE_FEED_API}/binance/marketData/current/price?symbol=${symbol}`
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
  return useQuery(
    ["coinPairPrice", symbol],
    () => getCoinPairPriceBySymbol(symbol),
    {
      enabled: !!symbol,
      staleTime: 3600000, // mark it as stale after an hour
    }
  );
}
