import React from "react";
// material-ui
import { Grid, Button, Typography, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import CurrencyAromaCartoonIcon from "../../components/icons/CurrencyAromaCartoonIcon";
import PinkArrowIcon from "../../components/icons/PinkArrowIcon";
import CardChefIcon from "../../components/icons/CardChefIcon";
import AromaCoinSideIcon from "../../components/icons/AromaCoinSideIcon";
import MarketIcon from "../../components/icons/MarketIcon";
import Layout from "../../components/layout/Layout";
import { Link as RouterLink } from "react-router-dom";

const CustomButton = styled(Button)(({ theme }) => ({
  width: "280px",
  height: "280px",
  color: theme.palette.text.secondary,
  backgroundColor: theme.palette.common.white,
  boxShadow: theme.blurredShadows[1],
  flexDirection: "column",
  justifyContent: "space-evenly",
  textAlign: "center",
}));

function Market() {
  const buttonText = [
    {
      text: "Buy Aroma",
      subText: "An ERC20 token",
      href: "/market/aroma/offers",
      mainImage: <AromaCoinSideIcon sx={{ fontSize: "130px" }} />,
      extraImg: null,
    },
    {
      text: "Buy a CHEF",
      subText: "If you already have AROMA Token",
      href: "/market/chef/buy",
      mainImage: <CardChefIcon sx={{ fontSize: "130px" }} />,
      extraImg: (
        <>
          <PinkArrowIcon
            style={{
              position: "absolute",
              left: "55px",
              top: "100px",
            }}
          />
          <CurrencyAromaCartoonIcon
            style={{
              position: "absolute",
              left: "25px",
              top: "132px",
              fontSize: "40px",
            }}
          />
        </>
      ),
    },
  ];

  return (
    <Layout
      helmetTitle="Market"
      title="Market"
      subTitle={
        "A place where you can buy tokens and CHEF which will be used in kitchen"
      }
      icon={<MarketIcon sx={{ fontSize: 45, marginTop: 1 }} />}
      buttonType="back"
    >
      <Grid container justifyContent="center">
        {buttonText.map((button) => (
          <Grid item mx="5vw" mb="3vh" key={`button:${button.href}`}>
            <CustomButton
              variant="contained"
              shape="roundish"
              to={button.href}
              component={RouterLink}
            >
              {button.mainImage}
              {button.extraImg}
              <Box>
                <Typography variant="h5" color="common.black">
                  {button.text}
                </Typography>
                {button.subText}
              </Box>
            </CustomButton>
          </Grid>
        ))}
      </Grid>
    </Layout>
  );
}

export default Market;
