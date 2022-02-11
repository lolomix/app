import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import { theme } from "../../utils/theme";
import { useParams } from "react-router-dom";
import NftCard from "../../components/web3/NftCard";
import { useRecipeById } from "../../hooks/recipe/useRecipeById";
import { NETWORKS, TARGET_CHAIN } from "../../web3/constants";
import tokenAbi from "../../web3/abi/CryptoChefsERC721Facet.json";
import { useRecipeCoinPairs } from "../../hooks/recipe/useRecipeCoinPairs";
import { Box, Card, CardContent, Skeleton, Typography } from "@mui/material";
import RecipePerformanceChart from "../../components/charts/RecipePerformanceChart";
import RecipeCreateTokenPresenter from "../../components/common/RecipeCreateTokenPresenter";
import GradualStepperInputField from "../../components/form/GradualStepperInputField";
import Layout from "../../components/layout/Layout";

/**
 * @returns {JSX.Element}
 * @constructor
 */
function RecipeSingle() {
  const [, coinParsFormatted] = useRecipeCoinPairs();
  const { recipeId } = useParams();
  const [, recipeFormatted] = useRecipeById(recipeId);
  const tokenAddress = NETWORKS[TARGET_CHAIN].contractMaster;
  const [coinPairs, setCoinPairs] = useState();

  /**
   * Add symbols to bare coin pairs
   */
  useEffect(() => {
    if (!coinParsFormatted || !recipeFormatted?.coinPairs) {
      return;
    }

    setCoinPairs(
      recipeFormatted.coinPairs?.map((recipeCoinPair) => {
        return {
          ...recipeCoinPair,
          symbol: coinParsFormatted.find(
            (coinPair) => coinPair.id === recipeCoinPair.id
          )?.symbol,
        };
      })
    );
  }, [coinParsFormatted, recipeFormatted]);

  return (
    <Layout>
      <Grid container item mt={4} justifyContent="center">
        <Grid item xs={12} sm={11} md={9} lg={7}>
          <Card sx={{ boxShadow: theme.blurredShadows }}>
            <CardContent>
              <Typography
                variant="h3"
                color="secondary"
                fontWeight={500}
                mb={3}
              >
                {recipeFormatted?.name}
              </Typography>
              <Grid container spacing={4} justifyContent="center">
                <Grid item xs={8} sm={6} md={5}>
                  <NftCard
                    variant="outlined"
                    tokenAbi={tokenAbi}
                    tokenAddress={tokenAddress}
                    tokenID={recipeFormatted?.chefId}
                  />
                </Grid>
                <Grid container item xs={12} sm={6} md={7} spacing={1}>
                  <Grid item xs={5}>
                    <Typography variant="h5">Launched</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="h6">
                      {recipeFormatted?.date ?? <Skeleton />}
                    </Typography>
                  </Grid>
                  <Grid item xs={5}>
                    <Typography variant="h5">Total Earned</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="h6">Coming Soon</Typography>
                  </Grid>
                  <Grid item xs={5}>
                    <Typography variant="h5">Staked</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="h6">
                      {recipeFormatted?.stakedAroma ? (
                        recipeFormatted.stakedAroma + " AROMA"
                      ) : (
                        <Skeleton />
                      )}
                    </Typography>
                  </Grid>
                  <Grid item xs={5}>
                    <Typography variant="h5">Daily</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="h6">Coming Soon</Typography>
                  </Grid>
                  <Grid item xs={5}>
                    <Typography variant="h5">Weekly</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="h6">Coming Soon</Typography>
                  </Grid>
                  <Grid item xs={5}>
                    <Typography variant="h5">Monthly</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="h6">Coming Soon</Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Typography variant="h6" textAlign="left" mt={3} gutterBottom>
                The overall performance of your recipe
              </Typography>
              <RecipePerformanceChart />
              <Typography variant="h6" textAlign="left" mt={3} gutterBottom>
                Selected Tokens
              </Typography>
              <Grid container spacing={3}>
                {coinPairs?.length > 0 ? (
                  coinPairs?.map((token) => (
                    <Grid
                      key={token.id}
                      item
                      container
                      xs={12}
                      sm={6}
                      md={4}
                      spacing={2}
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Grid item xs={7} sm={12}>
                        <Box position="relative">
                          <RecipeCreateTokenPresenter token={token} />
                        </Box>
                      </Grid>
                      <Grid item xs={3} sm={5} md={6} lg={4}>
                        <GradualStepperInputField
                          value={token.percentage}
                          valueSuffix="%"
                          hideSteppers
                        />
                      </Grid>
                    </Grid>
                  ))
                ) : (
                  <Grid item xs={12}>
                    <Skeleton variant="rectangular" height="10rem" />
                  </Grid>
                )}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
}

export default RecipeSingle;
