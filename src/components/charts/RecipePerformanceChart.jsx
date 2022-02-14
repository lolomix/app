import { createChart } from "lightweight-charts";
import { useEffect, useRef, useState } from "react";
import useCoinPairsPriceHistorical from "../../hooks/pricefeed/useCoinPairsPriceHistorical";
import { coinPairImplode } from "../../utils/helpers";
import { calculatePerformanceOfCoinPairs } from "../../utils/calculators";

/**
 * @returns {JSX.Element|null}
 * @constructor
 */
function RecipePerformanceChart({ tokens }) {
  const chartContainerRef = useRef();
  const symbols =
    tokens?.map((token) => coinPairImplode([token.symbol, "USDT"])) ?? [];
  const coinPairsPriceHistorical = useCoinPairsPriceHistorical(symbols);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (
      !coinPairsPriceHistorical ||
      !coinPairsPriceHistorical.length ||
      coinPairsPriceHistorical.some(({ data }) => !data)
    ) {
      return;
    }

    let performances = calculatePerformanceOfCoinPairs(
      coinPairsPriceHistorical?.map(({ data }) => data)
    );

    setChartData(
      performances?.[0].map(({ closeDate, performance }) => ({
        // @todo refactor to parse date properly as this is horrible
        time: closeDate
          .substring(0, closeDate.indexOf(" "))
          .split("/")
          .reverse()
          .join("-"), //yyyy-mm-dd,
        value: performance,
      }))
    );
    // @todo resolve providing an array dependency causing an infinite loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(coinPairsPriceHistorical)]);

  useEffect(() => {
    const handleResize = () => {
      chart.applyOptions({ width: chartContainerRef.current.clientWidth });
    };

    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 300,
    });
    chart.timeScale().fitContent();

    const newSeries = chart.addAreaSeries();
    newSeries.setData(chartData);

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);

      chart.remove();
    };
  }, [chartData]);

  return <div ref={chartContainerRef} />;
}

export default RecipePerformanceChart;
