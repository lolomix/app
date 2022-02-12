import { Grid, Paper, Skeleton, Stack, Typography } from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { coinPairImplode } from "../../utils/helpers";
import { formatCurrency } from "../../utils/formatters";
import useCoinPairOneDayChangeStatistics from "../../hooks/pricefeed/useCoinPairOneDayChangeStatistics";

/**
 * @param token
 * @returns {JSX.Element}
 * @constructor
 */
function RecipeCreateCoinPairPresenter({ token }) {
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
    token.symbol,
    preferredQuoteCurrency,
  ]);

  const { data } = useCoinPairOneDayChangeStatistics(coinPairSymbol);

  return (
    <Paper variant="outlined" sx={{ py: 1.5, px: 3 }}>
      <Grid container alignItems="center">
        <Grid item xs="auto">
          <HelpOutlineIcon />
          <Typography variant="subtitle2" color="grey.A400">
            {token.symbol ?? <Skeleton />}
          </Typography>
        </Grid>
        <Grid item xs>
          <Stack>
            <Typography
              textAlign="right"
              fontWeight="medium"
              color="text.secondary"
            >
              {data?.lastPrice ? (
                `${preferredQuoteSymbol}${formatCurrency(data.lastPrice)}`
              ) : (
                <Skeleton width="55%" sx={{ display: "inline-block" }} />
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
                <Typography color="error" variant="caption" fontWeight="medium">
                  {data?.priceChangePercent ? (
                    `${data.priceChangePercent?.toFixed(2)}%`
                  ) : (
                    <Skeleton width="55%" sx={{ display: "inline-block" }} />
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
