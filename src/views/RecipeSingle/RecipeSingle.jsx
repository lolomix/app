import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import NftCard from "../../components/web3/NftCard";
import tokenAbi from "../../web3/abi/CryptoChefsERC721Facet.json";
import { NETWORKS, TARGET_CHAIN } from "../../web3/constants";
import Grid from "@mui/material/Grid";
import { Box, Card, CardContent, Container, Typography } from "@mui/material";
import { theme } from "../../utils/theme";
import { useRecipeById } from "../../hooks/useRecipeById";
import RecipePerformanceChart from "../../components/charts/RecipePerformanceChart";
import RecipeCreateTokenPresenter from "../../components/common/RecipeCreateTokenPresenter";

/**
 * @returns {JSX.Element}
 * @constructor
 *
 * @todo fix error handling
 */
function RecipeSingle() {
  const { recipeId } = useParams();
  const [recipe, recipeFormatted] = useRecipeById(recipeId);
  const tokenAddress = NETWORKS[TARGET_CHAIN].contractMaster;

  useEffect(() => {
    console.log(recipe, recipeFormatted);
  }, [recipe, recipeFormatted]);

  return (
    <Container>
      <Grid container item mt={5} spacing={2} justifyContent="center">
        <Grid item xs={12} md={8}>
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
                <Grid item xs={8} sm={5} md={5}>
                  <NftCard
                    variant="outlined"
                    tokenAbi={tokenAbi}
                    tokenAddress={tokenAddress}
                    tokenID={recipeFormatted?.chefId}
                  />
                </Grid>
                <Grid container item xs={12} sm={7} spacing={2}>
                  <Grid item xs={6}>
                    <Typography variant="h5">Launched</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="h6">
                      {recipeFormatted?.date}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="h5">Total Earned</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="h6">N/A</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="h5">Staked</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="h6">
                      {recipeFormatted?.stakedAroma} AROMA
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="h5">Daily</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="h6">N/A</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="h5">Weekly</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="h6">N/A</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="h5">Monthly</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="h6">N/A</Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Typography variant="h6" textAlign="left" gutterBottom>
                The overall performance of your recipe
              </Typography>
              <RecipePerformanceChart />
              <Typography mt={4} variant="h6" textAlign="left" gutterBottom>
                Selected Tokens
              </Typography>
              <Grid container spacing={3}>
                {recipeFormatted?.coinPairs?.map((token) => (
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
                    <Grid item xs={5} sm={8.5} md={10} lg={8}>
                      {token.percentage}
                    </Grid>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default RecipeSingle;
