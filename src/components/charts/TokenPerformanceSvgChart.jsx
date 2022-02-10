import { SvgIcon } from "@mui/material";

/**
 * @returns {JSX.Element|null}
 * @constructor
 *
 * @todo remove hard-coded variables
 */
function TokenPerformanceSvgChart(props) {
  let width = 120;
  let height = 60;

  let hourlyPrices = [
    3.4, 3.67, 3.98, 3.67, 3.56, 3.02, 3.23, 3.12, 3.0, 2.98, 2.78, 2.67,
  ];
  let minPrice = hourlyPrices.reduce((p, v) => (p < v ? p : v));
  let maxPrice = hourlyPrices.reduce((p, v) => (p > v ? p : v));

  let points = hourlyPrices.map(
    (value, index) =>
      index +
      "0," +
      (height - ((value - minPrice) / (maxPrice - minPrice)) * height)
  );
  let pointsString = points.join(" ");

  return (
    <SvgIcon viewBox={`0 0 ${width} ${height}`} {...props}>
      <polyline
        fill="none"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeLinecap="round"
        strokeWidth="8"
        points={pointsString}
      />
    </SvgIcon>
  );
}

export default TokenPerformanceSvgChart;
