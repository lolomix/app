import { Grid, Paper, Skeleton, Stack, Typography } from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import TokenPerformanceSvgChart from "../charts/TokenPerformanceSvgChart";
import useCoinPairPrice from "../../hooks/pricefeed/useCoinPairPrice";
import { coinPairImplode } from "../../utils/helpers";
import { formatCurrency } from "../../utils/formatters";

/**
 * @param token
 * @returns {JSX.Element}
 * @constructor
 */
function RecipeCreateTokenPresenter({ token }) {
  /**
   * @type {string}
   *
   * @todo dynamically set preferred quote currency depending on user's choice
   */
  const preferredQuoteCurrency = "USDT";
  const preferredQuoteSymbol = "$";

  const { data } = useCoinPairPrice(
    coinPairImplode([token.symbol, preferredQuoteCurrency])
  );

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
              {data?.price ? (
                `${preferredQuoteSymbol}${formatCurrency(data.price)}`
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
              <Grid item xs="auto">
                {/* @todo provide performance of token */}
                <TokenPerformanceSvgChart
                  fontSize="large"
                  sx={{
                    display: "block",
                    color: "error.main",
                  }}
                />
              </Grid>
              <Grid item xs="auto">
                {/* @todo remove hard coded performance */}
                <Typography color="error" variant="caption" fontWeight="medium">
                  -12.5%
                </Typography>
              </Grid>
            </Grid>
          </Stack>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default RecipeCreateTokenPresenter;
