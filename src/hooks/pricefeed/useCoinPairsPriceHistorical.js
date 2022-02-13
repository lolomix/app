import { useQueries } from "react-query";

/**
 * Format time as API only allows one type of datetime format (`13/02/2022 08:29`)
 *
 * @param {Date[], string[], number[]} dateTimes
 * @returns {string[]}
 */
const formatDateTimesToAPISpecification = (dateTimes) => {
  const formatter = new Intl.DateTimeFormat("en-GB", {
    dateStyle: "short",
    timeStyle: "short",
  });

  return dateTimes.map((datetime) =>
    formatter.format(new Date(datetime)).replace(",", "")
  );
};

/**
 * @param symbol
 * @param startTime
 * @param endTime
 * @param startTime
 * @param endTime
 * @returns {Promise<any>}
 *
 * @todo abstract url from the hook
 */
const getCoinPairPriceHistoricalBySymbol = async (
  symbol,
  startTime,
  endTime
) => {
  const response = await fetch(
    `https://price-feed-api-3-bmefzfc5ta-oa.a.run.app/binance/marketData/historical/candlestickData?symbol=${symbol}&startTime=${startTime}&endTime=${endTime}`
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

/**
 * @param {array} symbols
 * @param {number} days
 */
export default function useCoinPairsPriceHistorical(symbols, days = 30) {
  const end = new Date();
  const start = new Date().setDate(end.getDate() - days);
  const [startTime, endTime] = formatDateTimesToAPISpecification([start, end]);

  return useQueries(
    symbols.map((symbol) => {
      return {
        queryKey: ["user", symbol, startTime, endTime],
        queryFn: () =>
          getCoinPairPriceHistoricalBySymbol(symbol, startTime, endTime),
        options: {
          enabled: !!symbol,
          refetchInterval: 3600000, // only refetch after an hour
        },
      };
    })
  );
}
