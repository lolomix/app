import { Grid, Paper, Stack, Typography } from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import TokenPerformanceSvgChart from "../charts/TokenPerformanceSvgChart";

/**
 * @param token
 * @returns {JSX.Element}
 * @constructor
 */
function RecipeCreateTokenPresenter({ token }) {
  return (
    <Paper variant="outlined" sx={{ py: 1.5, px: 3 }}>
      <Grid container alignItems="center">
        <Grid item xs="auto">
          <HelpOutlineIcon />
          <Typography variant="subtitle2" color="grey.A400">
            {token.symbol}
          </Typography>
        </Grid>
        <Grid item xs>
          <Stack>
            {/* @todo remove hard coded price */}
            <Typography
              textAlign="right"
              fontWeight="medium"
              color="text.secondary"
            >
              $33.46
            </Typography>
            <Grid container justifyContent="flex-end" alignItems="center" spacing={1}>
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
