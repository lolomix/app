import { useQuery } from "react-query";

const getCoinPairPriceBySymbol = async (symbol) => {
  const response = await fetch(
    `https://price-feed-api-3-bmefzfc5ta-oa.a.run.app/binance/marketData/current/price?symbol=${symbol}`
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

/**
 * @param symbol
 * @returns {UseQueryResult<unknown, unknown>}
 */
export default function useCoinPairPrice(symbol) {
  return useQuery(["coinPair", symbol], () => getCoinPairPriceBySymbol(symbol));
}
