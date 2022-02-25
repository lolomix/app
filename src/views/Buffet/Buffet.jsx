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
  const allRecipes = [
    {
      id: "0x353ea1a5dabc160f00c0b4ecc285adasd9eb61cf03a56f411b4578c1464cf5674",
      chefId: 1,
      name: "Vanilla Icecream with Hot fudge Brownie",
    },
    {
      id: "0x353ea1a5dabc160f00c0b4ecc2851daasdb61cf03a56f411b4578c1464cf5674",
      chefId: 1,
      name: "Marshmallow",
    },
    {
      id: "0x353ea1a5dabc160f00c0b4ecc2851da19eb61cf03a56f4sdfsdf4578c1464c724",
      chefId: 1,
      name: "Peanut Butter",
      diffFromYesterday: -3.154,
    },
    {
      id: "0x353ea1a5dabc160f00c0b4ecc2851da19eb61cf03a56f411b4578c1464cf523423",
      chefId: 1,
      name: "Chocolate Donut",
    },
    {
      id: "0x353ea1a5dabc160f00c0b4ecc2851da19eb61cf03a56f411b4578c1464cf1234",
      chefId: 1,
      name: "Springroll",
    },
  ];
  const myRecipes = useRecipesOfOwner();

  const [recipesToShow, setRecipesToShow] = useState();
  const [recipesFilter, setRecipesFilter] = useState(MY_RECIPES_FILTER);

  useEffect(() => {
    if (recipesFilter !== MY_RECIPES_FILTER) return;
    setRecipesToShow(myRecipes);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(myRecipes), recipesFilter]);

  useEffect(() => {
    if (recipesFilter !== ALL_RECIPES_FILTER) return;
    setRecipesToShow(allRecipes);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(allRecipes), recipesFilter]);

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
              backgroundColor: "#4B6272",
              color: "common.white",
              boxShadow: "none",
              "&:hover": {
                color: "common.black",
              },
            }}
            onClick={handleClickMyRecipes}
          >
            My Recipes
          </Button>
          <Button
            variant="contained"
            size="xlarge"
            sx={{ backgroundColor: "common.white", boxShadow: "none" }}
            onClick={handleClickAllRecipes}
            disabled
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
                {!recipesToShow && (
                  <Skeleton
                    variant="rectangular"
                    height="100px"
                    sx={{ borderRadius: `${theme.shape.borderRadius}px` }}
                  />
                )}
                {recipesToShow && recipesToShow?.length === 0 && (
                  <Typography>Seems like you have no recipes</Typography>
                )}
                {recipesToShow &&
                  recipesToShow?.length > 0 &&
                  recipesToShow?.map((recipe) => (
                    <Fragment key={recipe.id}>
                      <TabPanelUnstyled value={0} />
                      <TabPanelUnstyled value={1}>
                        <Link
                          rel="noreferrer nofollow"
                          href={`/buffet/recipe/${recipe.id}`}
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
                                <ChefImageById
                                  tokenId={recipe.chefId}
                                  imgProps={{
                                    width: "100%",
                                    height: "auto",
                                    alt: "recipeChef",
                                  }}
                                />
                              </Box>
                            </Grid>
                            <Grid item xs={6} md={8.2} xl={10} textAlign="left">
                              <Typography
                                variant="h5"
                                color="common.black"
                                sx={{ padding: 1 }}
                              >
                                {recipe.name}
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
