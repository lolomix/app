import { useState, Fragment, useEffect } from "react";
import {
  Box,
  Button,
  TabUnstyled,
  TabsUnstyled,
  TabPanelUnstyled,
  TabsListUnstyled,
  tabUnstyledClasses,
  CardActions,
  Card,
  CardContent,
  Typography,
  Divider,
  Grid,
  Link,
  Skeleton,
} from "@mui/material";
import Layout from "../../components/layout/Layout";
import BuffetIcon from "../../components/icons/BuffetIcon";
import ChessQueenIcon from "../../components/icons/ChessQueenIcon";
import styled from "@emotion/styled";
import { Link as RouterLink } from "react-router-dom";
import { theme } from "../../utils/theme";
import { useRecipesOfOwner } from "../../hooks/recipe/useRecipesOfOwner";
import { ChefImageById } from "../../components/common/ChefImage";
import useRecipeBlockchainAll from "../../hooks/recipe/useRecipeBlockchainAll";
import useRecipePerformanceAll from "../../hooks/recipe/useRecipeBlockchainAll";
import { useChefIdsOfOwner } from "../../hooks/chef/useChefIdsOfOwner";

const MY_RECIPES_FILTER = "my-recipes";
const ALL_RECIPES_FILTER = "all-recipes";

// Date from Sunday to Sunday
let today = new Date();
let lastWeekMonth = new Date(
  today.getFullYear(),
  today.getMonth() + 1,
  0
).toLocaleString("default", { month: "short" });
let lastWeekDay = today.getDate() - today.getDay();
let nextWeekDay = lastWeekDay + 7;
let nextWeekMonth = today.toLocaleString("default", { month: "short" });

export const CustomContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== "color" && prop !== "size",
})(({ theme }) => ({
  ...{
    width: "fit-content",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: 15,
    [theme.breakpoints.down("md")]: {
      width: "100%",
      position: "static",
      flexDirection: "row",
      marginBottom: 20,
    },
  },
}));

const Tab = styled(TabUnstyled)`
  width: 100%;
  color: white;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: bold;
  background-color: #55378d;
  padding-top: 15px;
  padding-bottom: 15px;
  margin: 4px 4px;
  border: none;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  letter-spacing: 0.21px;

  &:hover {
    background-color: #805ac6;
  }

  &.${tabUnstyledClasses.selected} {
    background-color: #805ac6;
  }

  &.${tabUnstyledClasses.disabled} {
    opacity: 0.7;
  }

  &.${tabUnstyledClasses.disabled}:hover {
    background-color: #55378d;
  }
`;

const TabsList = styled(TabsListUnstyled)`
  width: 100%;
  background-color: #55378d;
  border-radius: 12px;
  display: flex;
`;

/**
 * @returns {JSX.Element}
 * @constructor
 */
function Buffet() {
  const { data: allRecipes } = useRecipeBlockchainAll();
  const { data: allRecipesPerformance } = useRecipePerformanceAll();
  const chefIds = useChefIdsOfOwner();

  const [recipesToShow, setRecipesToShow] = useState();
  const [myRecipesWithPerformance, setMyRecipesWithPerformance] = useState();
  const [allRecipesWithPerformance, setAllRecipesWithPerformance] = useState();
  const [recipesFilter, setRecipesFilter] = useState(ALL_RECIPES_FILTER);


  useEffect(() => {
    if (recipesFilter !== MY_RECIPES_FILTER) return;
    setRecipesToShow(myRecipesWithPerformance);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(myRecipesWithPerformance), recipesFilter]);

  useEffect(() => {
    if (recipesFilter !== ALL_RECIPES_FILTER) return;
    setRecipesToShow(allRecipesWithPerformance);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(allRecipesWithPerformance), recipesFilter]);

  useEffect(() => {
    console.log("test");
    setMyRecipesWithPerformance(
      allRecipes
        ?.filter((recipe) =>
          chefIds?.some((chefId) => recipe.chefId && chefId.eq(recipe.chefId))
        )
        ?.map((recipe) => {
          return {
            ...recipe,
            ...allRecipesPerformance?.find(
              (findRecipe) => findRecipe?.recipeId == recipe?.recipeId
            ),
          };
        })
    );
  }, [
    JSON.stringify(allRecipesPerformance),
    JSON.stringify(allRecipes),
    JSON.stringify(chefIds),
  ]);

  useEffect(() => {
    console.log("test2");
    setAllRecipesWithPerformance(
      allRecipes?.map((recipe) => {
        return {
          ...recipe,
          ...allRecipesPerformance?.find(
            (findRecipe) => findRecipe?.recipeId == recipe?.recipeId
          ),
        };
      })
    );
  }, [JSON.stringify(allRecipesPerformance), JSON.stringify(allRecipes)]);

  const handleClickMyRecipes = () => {
    setRecipesFilter(MY_RECIPES_FILTER);
  };

  const handleClickAllRecipes = () => {
    setRecipesFilter(ALL_RECIPES_FILTER);
  };

  useEffect(() => {
    console.log(recipesToShow);
  }, [recipesToShow]);

  return (
    <Layout
      helmetTitle="Buffet"
      title="Buffet"
      subTitle="Here you see your recipes and their performances"
      icon={<BuffetIcon sx={{ fontSize: 55, marginTop: 0.2 }} />}
      buttonType="back"
    >
      <Grid
        container
        item
        md={10}
        lg={8}
        justifyContent="flex-start"
        alignItems="flex-start"
        columnGap={5}
      >
        <CustomContainer>
          <Button
            variant="contained"
            size="xlarge"
            sx={{
              backgroundColor: recipesFilter === MY_RECIPES_FILTER ? "common.white" : "#4B6272",
              color: recipesFilter === MY_RECIPES_FILTER ? "common.black" : "common.white",
              boxShadow: "none",
              "&:hover, &:active": {
                color: "common.black",
                boxShadow: "none",
              },
            }}
            onClick={handleClickMyRecipes}
          >
            My Recipes
          </Button>
          <Button
            variant="contained"
            size="xlarge"
            sx={{
              backgroundColor: recipesFilter === ALL_RECIPES_FILTER ? "common.white" : "#4B6272",
              color: recipesFilter === ALL_RECIPES_FILTER ? "common.black" : "common.white",
              boxShadow: "none",
              "&:hover, &:active": {
                color: "common.black",
                boxShadow: "none",
              },
            }}
            onClick={handleClickAllRecipes}
          >
            All Recipes
          </Button>
        </CustomContainer>
        <Grid item xs={12} md={8}>
          <Card sx={{ textAlign: "center" }}>
            <TabsUnstyled defaultValue={1}>
              <CardActions>
                <TabsList>
                  <Tab disabled>
                    <ChessQueenIcon sx={{ fontSize: 15, marginRight: 0.6 }} />
                    Daily
                  </Tab>
                  <Tab>
                    <ChessQueenIcon sx={{ fontSize: 15, marginRight: 0.6 }} />
                    Weekly
                  </Tab>
                  <Tab disabled>
                    <ChessQueenIcon sx={{ fontSize: 15, marginRight: 0.6 }} />
                    Monthly
                  </Tab>
                </TabsList>
              </CardActions>
              <CardContent>
                <Typography variant="h5" color="grey.500">
                  {`${lastWeekDay} ${lastWeekMonth} - ${nextWeekDay} ${nextWeekMonth}`}
                </Typography>
                {(!recipesToShow || recipesToShow?.length === 0) && (
                  <Box my={10}>
                    <Typography>Seems like you have no recipes...</Typography>
                  </Box>
                )}
                {recipesToShow &&
                  recipesToShow?.length > 0 &&
                  recipesToShow?.map((recipe) => (
                    <Fragment key={recipe.recipeId || recipe.id}>
                      <TabPanelUnstyled value={0} />
                      <TabPanelUnstyled value={1}>
                        <Link
                          rel="noreferrer nofollow"
                          href={`/buffet/recipe/${
                            recipe.recipeId || recipe.id
                          }`}
                          style={{
                            textDecoration: "none",
                          }}
                        >
                          <Grid
                            container
                            py={2.5}
                            alignItems="center"
                            sx={{
                              margin: "0.3vw",
                              "&:hover": {
                                backgroundColor: "grey.200",
                                borderRadius: `${theme.shape.borderRadius}px`,
                              },
                            }}
                          >
                            <Grid item mr={2}>
                              <Box
                                sx={{
                                  width: "75px",
                                  minWidth: "75px",
                                  border: "2px solid #E8E8E8",
                                  borderRadius: `${theme.shape.borderRadius}px`,
                                  paddingX: 0.5,
                                }}
                              >
                                <ChefImageById tokenId={recipe.chefId} />
                              </Box>
                            </Grid>
                            <Grid item xs={6} md={8.2} xl={10} textAlign="left">
                              <Typography
                                variant="h5"
                                color="common.black"
                                sx={{ padding: 1 }}
                              >
                                {recipe.name || recipe.recipeName}
                              </Typography>
                            </Grid>
                            <Grid item xs={2} md={1.5}>
                              <Typography
                                variant="h5"
                                color={
                                  recipe?.overallPerformancePriceChangePercent >
                                  0
                                    ? "success.main"
                                    : "secondary"
                                }
                              >
                                {recipe?.overallPerformancePriceChangePercent?.toFixed(
                                  2
                                )}
                                %
                              </Typography>
                            </Grid>
                          </Grid>
                        </Link>
                        <Divider />
                      </TabPanelUnstyled>
                      <TabPanelUnstyled value={2}></TabPanelUnstyled>
                    </Fragment>
                  ))}
                {recipesFilter === MY_RECIPES_FILTER && (
                  <Button
                    bg="yellowContained"
                    size="massive"
                    elongatedwidth="30"
                    to="/kitchen/recipe/create/"
                    component={RouterLink}
                    sx={{ marginTop: 2.5 }}
                  >
                    Create a Recipe
                  </Button>
                )}
              </CardContent>
            </TabsUnstyled>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
}

export default Buffet;
