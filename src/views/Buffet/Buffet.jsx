import { useState, Fragment } from "react";
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
} from "@mui/material";
import Layout from "../../components/layout/Layout";
import BuffetIcon from "../../components/icons/BuffetIcon";
import ChessQueenIcon from "../../components/icons/ChessQueenIcon";
//import PinkStar from "../../assets/stars/pink-star.svg";
//import PurpleStar from "../../assets/stars/purple-star.svg";
//import GreyStar from "../../assets/stars/grey-star.svg";
//import YellowStar from "../../assets/stars/yellow-star.svg";
import styled from "@emotion/styled";
import Image1 from "../../assets/nfts/1.png";
import Image3 from "../../assets/nfts/3.png";
import { Link as RouterLink } from "react-router-dom";

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

// Custom styles

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

// component

function Buffet() {
  // static arrays
  const allRecipes = [
    {
      id: 1,
      chefImage: Image1,
      recipeName: "Vanilla Icecream with Hot fudge Brownie",
      recipePerformance: 13.55,
      ranking: 1,
    },
    {
      id: 2,
      chefImage: Image3,
      recipeName: "Marshmallow",
      recipePerformance: 11.31,
      ranking: 2,
    },
    {
      id: 3,
      chefImage: Image1,
      recipeName: "Peanut Butter",
      recipePerformance: 10.26,
      diffFromYesterday: -3.154,
      ranking: 3,
    },
    {
      id: 4,
      chefImage: Image3,
      recipeName: "Chocolate Donut",
      recipePerformance: 9.05,
      ranking: 4,
    },
    {
      id: 5,
      chefImage: Image1,
      recipeName: "Springroll",
      recipePerformance: 8.35,
      ranking: 5,
    },
  ];

  const myRecipes = [
    {
      id: 3,
      chefImage: Image1,
      recipeName: "Peanut Butter",
      recipePerformance: 10.26,
      ranking: 3,
    },
    {
      id: 4,
      chefImage: Image3,
      recipeName: "Chocolate Donut",
      recipePerformance: 9.05,
      ranking: 4,
    },
    {
      id: 5,
      chefImage: Image1,
      recipeName: "Springroll",
      recipePerformance: 8.35,
      ranking: 5,
    },
  ];

  const [recipesToShow, setRecipesToShow] = useState(myRecipes);
  const [myRecipesOn, setMyRecipesOn] = useState(true);

  const handleClickMyRecipes = () => {
    setMyRecipesOn(true);
    setRecipesToShow(myRecipes);
  };

  const handleClickAllRecipes = () => {
    setMyRecipesOn(false);
    setRecipesToShow(allRecipes);
  };

  return (
    <Layout
      helmetTitle="Buffet"
      title="Buffet"
      subTitle="Lorem ipsum dolor sit amet, consetetur sadipscing elitr"
      icon={<BuffetIcon sx={{ fontSize: 55, marginTop: 0.2 }} />}
      buttonType="home"
    >
      <Grid
        container
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
                {recipesToShow.map((recipe) => (
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
                              borderRadius: "12px",
                            },
                          }}
                        >
                          {/*<Grid item xs={2} md={1.7}>
                          <Typography
                            variant="h5"
                            color="common.black"
                            minWidth="40px"
                            minHeight="40px"
                            sx={{
                              background: `transparent url(${
                                recipe.ranking === 1
                                  ? PurpleStar
                                  : recipe.ranking === 2
                                  ? GreyStar
                                  : recipe.ranking === 3
                                  ? PinkStar
                                  : YellowStar
                              }) no-repeat center`,
                              backgroundSize: "contain",
                              padding: 2,
                              paddingTop: 2.5,
                            }}
                          >
                            {recipe.ranking}
                          </Typography>
                         </Grid>*/}
                          <Grid item mr={2}>
                            <Box
                              sx={{
                                width: "75px",
                                minWidth: "75px",
                                border: "2px solid #E8E8E8",
                                borderRadius: "12px",
                                paddingX: 2,
                                paddingY: 1,
                              }}
                            >
                              <img
                                src={recipe.chefImage}
                                width="100%"
                                height="auto"
                                alt="recipeChef"
                              />
                            </Box>
                          </Grid>
                          <Grid item xs={6} md={8.2} xl={10} textAlign="left">
                            <Typography
                              variant="h5"
                              color="common.black"
                              sx={{ padding: 1 }}
                            >
                              {recipe.recipeName}
                            </Typography>
                          </Grid>
                          {/*<Grid item xs={2} md={1.5}>
                        <Typography
                          variant="h5"
                          color={
                            recipe.ranking <= 3 ? "success.main" : "secondary"
                          }
                        >
                          {recipe.recipePerformance}%
                        </Typography>
                      </Grid>*/}
                        </Grid>
                      </Link>
                      <Divider />
                    </TabPanelUnstyled>
                    <TabPanelUnstyled value={2}></TabPanelUnstyled>
                  </Fragment>
                ))}
                {myRecipesOn && (
                  <Button
                    bg="yellowContainedSmall"
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
