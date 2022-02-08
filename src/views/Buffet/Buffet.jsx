import React, { useState } from "react";
import { withTranslation } from "react-i18next";
// material-ui
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
  Stack,
  Divider,
} from "@mui/material";
// custom
import Layout from "../../components/layout/Layout";
import BuffetIcon from "../../components/icons/BuffetIcon";
import ChessQueenIcon from "../../components/icons/ChessQueenIcon";
import PinkStar from "../../assets/stars/pink-star.svg";
import PurpleStar from "../../assets/stars/purple-star.svg";
import GreyStar from "../../assets/stars/grey-star.svg";
import YellowStar from "../../assets/stars/yellow-star.svg";
import styled from "@emotion/styled";
import Image1 from "../../assets/nfts/1.png";
import Image2 from "../../assets/nfts/2.png";
import Image3 from "../../assets/nfts/3.png";
import Image4 from "../../assets/nfts/4.png";
import Image5 from "../../assets/nfts/5.png";

// Date

let today = new Date();
let todayMonth = today.toLocaleString("default", { month: "short" });
let todayDay = today.getDate();
let lastWeek = new Date(
  today.getFullYear(),
  today.getMonth(),
  today.getDate() - 7
);
let lastWeekMonth = lastWeek.toLocaleString("default", { month: "short" });
let lastWeekDay = lastWeek.getDate();

// Custom styles

const CustomContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== "color" && prop !== "size",
})(({ theme }) => ({
  ...{
    width: "30%",
    position: "relative",
    right: 250,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
    gap: 15,
    marginBottom: -127,
    [theme.breakpoints.down("lg")]: {
      width: "100%",
      position: "static",
      flexDirection: "row",
      marginBottom: 20,
    },
  },
}));

const Tab = styled(TabUnstyled)`
  color: white;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: bold;
  background-color: #55378d;
  padding: 15px 3vw;
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
    opacity: 0.5;
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
  align-items: center;
  justify-content: center;
  align-content: space-between;
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
      diffFromYesterday: +1.61,
      ranking: 1,
    },
    {
      id: 2,
      chefImage: Image2,
      recipeName: "Marshmallow",
      recipePerformance: 11.31,
      diffFromYesterday: -1.14,
      ranking: 2,
    },
    {
      id: 3,
      chefImage: Image3,
      recipeName: "Peanut Butter",
      recipePerformance: 10.26,
      diffFromYesterday: -3.154,
      ranking: 3,
    },
    {
      id: 4,
      chefImage: Image4,
      recipeName: "Chocolate Donut",
      recipePerformance: 9.05,
      diffFromYesterday: +0.08,
      ranking: 4,
    },
    {
      id: 5,
      chefImage: Image5,
      recipeName: "Springroll",
      recipePerformance: 8.35,
      diffFromYesterday: -2.1454,
      ranking: 5,
    },
  ];

  const myRecipes = [
    {
      id: 3,
      chefImage: Image3,
      recipeName: "Peanut Butter",
      recipePerformance: 10.26,
      diffFromYesterday: -3.154,
      ranking: 3,
    },
    {
      id: 4,
      chefImage: Image4,
      recipeName: "Chocolate Donut",
      recipePerformance: 9.05,
      diffFromYesterday: +0.08,
      ranking: 4,
    },
    {
      id: 5,
      chefImage: Image5,
      recipeName: "Springroll",
      recipePerformance: 8.35,
      diffFromYesterday: -2.14,
      ranking: 5,
    },
  ];

  // on click handlers

  const [recipesToShow, setRecipesToShow] = useState(allRecipes);
  const [myRecipesState, setMyRecipesState] = useState(false);

  const handleClickMyRecipes = () => {
    setMyRecipesState(true);
    setRecipesToShow(myRecipes);
  };

  const handleClickAllRecipes = () => {
    setMyRecipesState(false);
    setRecipesToShow(allRecipes);
  };

  return (
    <Layout
      helmetTitle="Buffet"
      title="Buffet"
      subTitle="Lorem ipsum dolor sit amet, consetetur sadipscing elitr"
      icon={<BuffetIcon sx={{ fontSize: 55, marginTop: 0.2 }} />}
    >
      <Box >
        <CustomContainer>
          <Button
            variant="contained"
            size="xlarge"
            sx={{ backgroundColor: "common.white", boxShadow: "none" }}
            onClick={handleClickAllRecipes}
          >
            All Recipes
          </Button>
          <Button
            variant="contained"
            size="xlarge"
            sx={{
              backgroundColor: "#4B6272",
              color: "common.white",
              boxShadow: "none",
            }}
            onClick={handleClickMyRecipes}
          >
            My Recipes
          </Button>
        </CustomContainer>
        <Card sx={{ textAlign: "center"}}>
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
                {`${lastWeekDay} ${lastWeekMonth} - ${todayDay} ${todayMonth}`}
              </Typography>
              {recipesToShow.map(() => (
                <TabPanelUnstyled value={0}></TabPanelUnstyled>
              ))}
              {recipesToShow.map((recipe, index) => (
                <TabPanelUnstyled value={1}>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    px="0.2vw"
                    spacing="2vw"
                  >
                    <Stack
                      py={2.5}
                      direction="row"
                      alignItems="center"
                      spacing="0.9vw"
                    >
                      <Typography
                        variant="h5"
                        color="common.black"
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
                          padding: 2.5,
                          paddingTop: 3
                        }}
                      >
                        {recipe.ranking}
                      </Typography>
                      <Box
                        sx={{
                          maxWidth: "80px",
                          width: "80px",
                          minWidth: "80px",
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
                        />
                      </Box>
                      <Typography variant="h5" color="common.black">
                        {recipe.recipeName}
                      </Typography>
                    </Stack>
                    {myRecipesState ? (
                      <Typography
                        variant="h5"
                        color={
                          recipe.diffFromYesterday > 0
                            ? "success.main"
                            : "error"
                        }
                      >
                        {recipe.diffFromYesterday > 0
                          ? `+${recipe.diffFromYesterday}%`
                          : `${recipe.diffFromYesterday}%`}
                      </Typography>
                    ) : (
                      <Typography
                        variant="h5"
                        color={
                          index === 0 || index === 1 || index === 2
                            ? "success.main"
                            : "secondary"
                        }
                      >
                        {`${recipe.recipePerformance}`}%
                      </Typography>
                    )}
                  </Stack>
                  <Divider />
                </TabPanelUnstyled>
              ))}
              {recipesToShow.map(() => (
                <TabPanelUnstyled value={2}></TabPanelUnstyled>
              ))}
            </CardContent>
          </TabsUnstyled>
        </Card>
      </Box>
    </Layout>
  );
}

export default withTranslation()(Buffet);
