import { createChart } from "lightweight-charts";
import { useEffect, useRef, useState } from "react";
import useCoinPairsPriceHistorical from "../../hooks/backend/pricefeed/useCoinPairsPriceHistorical";
import { coinPairImplode, getLastSundayAt } from "../../utils/helpers";
import {
  calculateAggregatedPerformanceOfCoinPairs,
  calculatePerformanceOfCoinPairs,
} from "../../utils/calculators";
import { theme } from "../../utils/theme";
import { alpha } from "@mui/material";
import { format, subMonths } from "date-fns";

/**
 * @returns {JSX.Element|null}
 * @constructor
 */
function RecipePerformanceChart({ tokens }) {
  const chartContainerRef = useRef();

  const symbols =
    tokens?.map((token) => coinPairImplode([token.symbol, "USDT"])) ?? [];

  /**
   * @type {Date}
   */
  const end = getLastSundayAt(21);
  const start = subMonths(end, 3);

  const coinPairsPriceHistorical = useCoinPairsPriceHistorical(
    symbols,
    start,
    end,
    "1w"
  );

  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (
      !coinPairsPriceHistorical ||
      !coinPairsPriceHistorical.length ||
      coinPairsPriceHistorical.some(({ data }) => !data)
    ) {
      return;
    }

    // @todo caching
    let performances = calculatePerformanceOfCoinPairs(
      coinPairsPriceHistorical?.map(({ data }) => data)
    );

    let aggregatedPerformance = calculateAggregatedPerformanceOfCoinPairs(
      performances,
      tokens?.map(({ percentage }) => percentage)
    );

    setChartData(
      performances?.[0].map(({ closeTime }, index) => ({
        time: format(closeTime, "yyyy-MM-dd"),
        value: aggregatedPerformance?.[index],
      }))
    );
    // @todo resolve providing an array dependency causing an infinite loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    // eslint-disable-next-line react-hooks/exhaustive-deps
    JSON.stringify(coinPairsPriceHistorical),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    JSON.stringify(tokens?.map(({ percentage }) => percentage)),
  ]);

  useEffect(() => {
    const handleResize = () => {
      chart.applyOptions({ width: chartContainerRef.current.clientWidth });
    };

    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 300,
      handleScroll: false,
      handleScale: false,
      timeScale: {
        borderVisible: false,
      },
      grid: {
        vertLines: {
          color: theme.palette.grey.A200,
        },
        horzLines: {
          color: theme.palette.grey.A200,
        },
      },
      rightPriceScale: {
        borderVisible: false,
        // @todo play around with this as we might not have to calculate % but instead just give the price
        // mode: PriceScaleMode.Percentage
      },
      layout: {
        fontFamily: theme.typography.fontFamily,
      },
      watermark: {
        visible: true,
        text: "CryptoChefs",
        color: "rgba(0,0,0,0.04)",
        fontFamily: theme.typography.fontFamily,
      },
    });
    chart.timeScale().fitContent();

    console.debug("chartData", chartData);
    const newSeries = chart.addBaselineSeries({
      topLineColor: alpha(theme.palette.success.main, 1),
      topFillColor1: alpha(theme.palette.success.main, 0.28),
      topFillColor2: alpha(theme.palette.success.main, 0.05),
      bottomLineColor: alpha(theme.palette.error.main, 1),
      bottomFillColor1: alpha(theme.palette.error.main, 0.05),
      bottomFillColor2: alpha(theme.palette.error.main, 0.28),
      priceFormat: {
        type: "custom",
        formatter: (p) => p.toFixed(3) + "%",
        minMove: 0.001,
      },
    });
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
