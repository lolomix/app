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
import RecipeCreateCoinPairPresenter from "../../components/common/RecipeCreateCoinPairPresenter";
import GradualStepperInputField from "../../components/form/GradualStepperInputField";
import Layout from "../../components/layout/Layout";

/**
 * @returns {JSX.Element}
 * @constructor
 */
function RecipeSingle() {
  const { recipeId } = useParams();
  const tokenAddress = NETWORKS[TARGET_CHAIN].contractMaster;
  const recipeFormatted = useRecipeById(recipeId);
  // @todo refactor the name of the hook as it's ambiguous
  const availableCoinPairs = useRecipeCoinPairs();

  return (
    <Layout buttonType="back">
      <Grid container item mt={4} justifyContent="center">
        <Grid item xs={12} sm={10} md={9} lg={7} mt={{ xs: 3, md: -6 }}>
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
              <RecipePerformanceChart
                tokens={recipeFormatted?.coinPairs?.map((coinPair) => ({
                  ...coinPair,
                  symbol: availableCoinPairs.find(
                    (availableCoinPair) => availableCoinPair.id === coinPair.id
                  )?.symbol,
                }))}
              />
              <Typography variant="h6" textAlign="left" mt={3} gutterBottom>
                Selected Tokens
              </Typography>
              <Grid container spacing={3}>
                {recipeFormatted?.coinPairs?.length > 0 ? (
                  recipeFormatted?.coinPairs?.map((coinPair) => (
                    <Grid
                      key={coinPair.id}
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
                          <RecipeCreateCoinPairPresenter
                            coinPair={{
                              ...coinPair,
                              symbol: availableCoinPairs.find(
                                (availableCoinPair) =>
                                  availableCoinPair.id === coinPair.id
                              )?.symbol,
                              icon: availableCoinPairs.find(
                                (availableCoinPair) =>
                                  availableCoinPair.id === coinPair.id
                              )?.icon,
                            }}
                          />
                        </Box>
                      </Grid>
                      <Grid item xs={3} sm={5} md={6} lg={4}>
                        <GradualStepperInputField
                          value={coinPair.percentage}
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
