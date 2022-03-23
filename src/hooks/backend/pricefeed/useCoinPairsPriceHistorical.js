import { useQueries } from "react-query";
import { useConfig } from '@usedapp/core'

/**
 * Format time as API only allows one type of datetime format (`13/02/2022 08:29`)
 *
 * @param {Date[], string[], number[]} dateTimes
 * @returns {string[]}
 */
const formatDateTimesToAPISpecification = (dateTimes) => {
  const formatter = new Intl.DateTimeFormat("en-GB", {
    dateStyle: "short",
  });

  return dateTimes.map(
    (datetime) => formatter.format(new Date(datetime)) + " 00:00"
  );
};

/**
 * @param {string} symbol
 * @param {string} startTime
 * @param {string} endTime
 * @param {string} interval
 * @param {string} priceFeedUrl
 * @returns {Promise<any>}
 */
const getCoinPairPriceHistoricalBySymbol = async (
  symbol,
  startTime,
  endTime,
  interval,
  priceFeedUrl
) => {
  const response = await fetch(
    `${priceFeedUrl}/binance/marketData/historical/candlestickData?symbol=${symbol}&startTime=${startTime}&endTime=${endTime}&interval=${interval}`
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

/**
 * @param {array} symbols
 * @param {Date} start
 * @param {Date} end
 * @param {string} interval
 */
export default function useCoinPairsPriceHistorical(
  symbols,
  start = new Date(),
  end = new Date(),
  interval = "1d"
) {
  const {
    readOnlyChainSettings: { priceFeedApiUrl },
  } = useConfig();
  const [startTime, endTime] = formatDateTimesToAPISpecification([start, end]);

  return useQueries(
    symbols.map((symbol) => {
      return {
        queryKey: ["user", symbol, startTime, endTime],
        queryFn: () =>
          getCoinPairPriceHistoricalBySymbol(
            symbol,
            startTime,
            endTime,
            interval,
            priceFeedApiUrl
          ),
        enabled: !!symbol && !!priceFeedApiUrl,
        staleTime: 3600000, // mark it as stale after an hour
      };
    })
  );
}
