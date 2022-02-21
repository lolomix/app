import { getLastSundayAt } from "../../utils/helpers";
import { subWeeks } from "date-fns";
import useCoinPairPriceHistorical from "./useCoinPairPriceHistorical";
import { getRelativePercentageDifferenceBetween } from "../../utils/calculators";

/**
 * @param symbol
 * @returns {{ data, dataUpdatedAt, error, errorUpdatedAt, failureCount, isError, isFetched, isFetchedAfterMount, isFetching, isIdle, isLoading, isLoadingError, isPlaceholderData, isPreviousData, isRefetchError, isRefetching, isStale, isSuccess, refetch, remove, status }}
 */
export default function useCoinPairWeekDayChangeStatistics(symbol) {
  const end = getLastSundayAt(21);
  const start = subWeeks(end, 1);

  const weeklyStatistics = useCoinPairPriceHistorical(symbol, start, end, "1w");

  return (
    weeklyStatistics?.data?.[0] && {
      ...weeklyStatistics.data[0],
      percentage: getRelativePercentageDifferenceBetween(
        weeklyStatistics.data[0].close,
        weeklyStatistics.data[0].open
      ),
    }
  );
}
