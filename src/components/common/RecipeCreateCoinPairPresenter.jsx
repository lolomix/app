import { Grid, Paper, Skeleton, Stack, Typography } from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { coinPairImplode } from "../../utils/helpers";
import { formatCurrency } from "../../utils/formatters";
import useCoinPairOneDayChangeStatistics from "../../hooks/backend/pricefeed/useCoinPairOneDayChangeStatistics";
import Icon from "react-crypto-icons";
import useCoinPairWeekDayChangeStatistics from "../../hooks/backend/pricefeed/useCoinPairOneWeekChangeStatistics";

/**
 * @param {object} coinPair
 * @returns {JSX.Element}
 * @constructor
 */
function RecipeCreateCoinPairPresenter({ coinPair }) {
  /**
   * @type {string}
   *
   * @todo dynamically set preferred quote currency depending on user's choice
   */
  const preferredQuoteCurrency = "USDT";

  /**
   * @type {string}
   */
  const preferredQuoteSymbol = "$";

  /**
   * @type {string|undefined}
   */
  const coinPairSymbol = coinPairImplode([
    coinPair.symbol,
    preferredQuoteCurrency,
  ]);

  const { data } = useCoinPairOneDayChangeStatistics(coinPairSymbol);
  const oneWeekStatistics = useCoinPairWeekDayChangeStatistics(coinPairSymbol);

  return (
    <Paper variant="outlined" sx={{ py: 1.5, px: 3 }}>
      <Grid container alignItems="center">
        <Grid item xs="auto">
          {coinPair?.icon ? (
            <Icon name={coinPair.icon} size={23} />
          ) : (
            <HelpOutlineIcon fontSize="medium" />
          )}
          <Typography variant="subtitle2" color="grey.A400">
            {coinPair.symbol ?? <Skeleton />}
          </Typography>
        </Grid>
        <Grid item xs>
          <Stack>
            <Typography
              textAlign="right"
              fontWeight="medium"
              color="text.secondary"
            >
              {data?.lastPrice !== undefined ? (
                `${preferredQuoteSymbol}${formatCurrency(data.lastPrice)}`
              ) : (
                <Skeleton width="80px" sx={{ display: "inline-block" }} />
              )}
            </Typography>
            <Grid
              container
              justifyContent="flex-end"
              alignItems="center"
              spacing={1}
            >
              {/*<Grid item xs="auto">*/}
              {/*  /!* @todo provide performance of token *!/*/}
              {/*  <TokenPerformanceSvgChart*/}
              {/*    fontSize="large"*/}
              {/*    sx={{*/}
              {/*      display: "block",*/}
              {/*      color: "error.main",*/}
              {/*    }}*/}
              {/*  />*/}
              {/*</Grid>*/}
              <Grid item xs="auto">
                <Typography
                  color={
                    oneWeekStatistics?.percentage >= 0
                      ? "success.main"
                      : "error.main"
                  }
                  variant="caption"
                  fontWeight="medium"
                >
                  {oneWeekStatistics?.percentage !== undefined ? (
                    `${oneWeekStatistics?.percentage?.toFixed(2)}%`
                  ) : (
                    <Skeleton width="25px" />
                  )}
                </Typography>
              </Grid>
            </Grid>
          </Stack>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default RecipeCreateCoinPairPresenter;
