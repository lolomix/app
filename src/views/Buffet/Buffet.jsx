import { useState, useEffect } from "react";
import {
  Box,
  Button,
  TabUnstyled,
  TabsUnstyled,
  TabsListUnstyled,
  tabUnstyledClasses,
  CardActions,
  Card,
  CardContent,
  Typography,
  Grid,
  List,
  ListItemButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import Layout from "../../components/layout/Layout";
import BuffetIcon from "../../components/icons/BuffetIcon";
import ChessQueenIcon from "../../components/icons/ChessQueenIcon";
import styled from "@emotion/styled";
import { Link as RouterLink } from "react-router-dom";
import { theme } from "../../utils/theme";
import { useRecipesOfOwner } from "../../hooks/recipe/useRecipesOfOwner";
import { ChefImageById } from "../../components/common/ChefImage";
import useRecipePerformanceAll from "../../hooks/backend/recipe/useRecipePerformanceAll";
import useRecipeBlockchainAll from "../../hooks/backend/recipe/useRecipeBlockchainAll";
import { coinPairExplode } from "../../utils/helpers";

const MY_RECIPES_FILTER = "my-recipes";
const ALL_RECIPES_FILTER = "all-recipes";

// Date from Sunday to Sunday

function getParticularDayTimestamp(lastWeekDay) {
  let currentWeekMonday = new Date().getDate() - new Date().getDay() + 1;
  return new Date().setDate(currentWeekMonday - lastWeekDay);
}

let currentSunday = new Date(getParticularDayTimestamp(1));
let lastSunday = new Date(getParticularDayTimestamp(8));

let currentSundayDay = currentSunday.getDate() - currentSunday.getDay();
let currentSundayMonth = currentSunday.toLocaleString("default", {
  month: "short",
});

let lastSundayDay = lastSunday.getDate() - lastSunday.getDay();
let lastSundayMonth = lastSunday.toLocaleString("default", { month: "short" });

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
  const myRecipes = useRecipesOfOwner();

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
    setMyRecipesWithPerformance(
      myRecipes?.map((recipe) => {
        return {
          ...recipe,
          ...allRecipesPerformance?.find(
            (findRecipe) => findRecipe?.recipeId === recipe?.id
          ),
        };
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(allRecipesPerformance), JSON.stringify(myRecipes)]);

  useEffect(() => {
    setAllRecipesWithPerformance(
      allRecipes
        ?.map((recipe) => {
          return {
            ...recipe,
            ...allRecipesPerformance?.find(
              (findRecipe) => findRecipe?.recipeId === recipe?.recipeId
            ),
          };
        })
        ?.sort(
          (a, b) =>
            (+b.overallPerformancePriceChangePercent || -99999) -
            (+a.overallPerformancePriceChangePercent || -99999)
        )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(allRecipesPerformance), JSON.stringify(allRecipes)]);

  const handleClickMyRecipes = () => {
    setRecipesFilter(MY_RECIPES_FILTER);
  };

  const handleClickAllRecipes = () => {
    setRecipesFilter(ALL_RECIPES_FILTER);
  };

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
              backgroundColor:
                recipesFilter === MY_RECIPES_FILTER
                  ? "common.white"
                  : "#4B6272",
              color:
                recipesFilter === MY_RECIPES_FILTER
                  ? "common.black"
                  : "common.white",
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
              backgroundColor:
                recipesFilter === ALL_RECIPES_FILTER
                  ? "common.white"
                  : "#4B6272",
              color:
                recipesFilter === ALL_RECIPES_FILTER
                  ? "common.black"
                  : "common.white",
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
                  {`${lastSundayDay} ${lastSundayMonth} - ${currentSundayDay} ${currentSundayMonth}`}
                </Typography>
                {(!recipesToShow || recipesToShow?.length === 0) && (
                  <Box my={10}>
                    <Typography>Seems like you have no recipes...</Typography>
                  </Box>
                )}
                <List>
                  {recipesToShow &&
                    recipesToShow?.length > 0 &&
                    recipesToShow?.map((recipe) => (
                      <ListItem
                        key={recipe.recipeId || recipe.id}
                        disablePadding
                        secondaryAction={
                          <Typography
                            variant="h5"
                            color={
                              !recipe?.overallPerformancePriceChangePercent
                                ? "secondary"
                                : recipe?.overallPerformancePriceChangePercent <=
                                  0
                                ? "error.main"
                                : "success.main"
                            }
                          >
                            {recipe?.overallPerformancePriceChangePercent
                              ? recipe?.overallPerformancePriceChangePercent?.toFixed(
                                  2
                                ) + "%"
                              : "New"}
                          </Typography>
                        }
                        sx={{
                          "&>.MuiListItemButton-root": {
                            pr: 12,
                          },
                        }}
                      >
                        <ListItemButton
                          to={`/buffet/recipe/${recipe.recipeId || recipe.id}`}
                          component={RouterLink}
                        >
                          <ListItemAvatar sx={{ pr: 2 }}>
                            <Box
                              position="relative"
                              width="85px"
                              height="85px"
                              border={`2px solid ${theme.palette.grey.A200}`}
                              borderRadius={`${theme.shape.borderRadius}px`}
                            >
                              <ChefImageById
                                wrapperProps={{
                                  sx: {
                                    py: 0.5,
                                    px: 1,
                                  },
                                }}
                                imgProps={{ sizes: "5vw" }}
                                tokenId={recipe.chefId}
                              />
                              <Typography
                                as="div"
                                textAlign="center"
                                variant="overline"
                                color="grey.A400"
                                fontWeight="bold"
                                position="absolute"
                                lineHeight="1"
                                bottom="1px"
                                width="100%"
                              >
                                #{recipe.chefId}
                              </Typography>
                            </Box>
                          </ListItemAvatar>
                          <ListItemText
                            primary={recipe.name || recipe.recipeName}
                            primaryTypographyProps={{ fontWeight: "bold" }}
                            secondary={recipe?.coinPairs
                              ?.filter((cp) => cp?.symbol)
                              ?.map((cp) => coinPairExplode(cp.symbol)?.[0])
                              ?.join(", ")}
                          />
                        </ListItemButton>
                      </ListItem>
                    ))}
                </List>
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
