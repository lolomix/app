import React from "react";
import { withTranslation } from "react-i18next";
// material-ui
import { Container, Grid, Button, Typography, Box } from "@mui/material";
import Headline from "../../components/layout/Headline";
import { styled } from "@mui/material/styles";
import CurrencyAromaCartoonIcon from "../../components/icons/CurrencyAromaCartoonIcon";
import PinkArrowIcon from "../../components/icons/PinkArrowIcon";
import AromaCoinSide from "../../assets/aroma-coin-side.svg";
import ChefHolder from "../../assets/chef-holder.png";
import PinkArrow from "../../assets/pink-arrow.svg";

/**
 * @param t
 * @returns {JSX.Element}
 * @constructor
 */
function Market({ t }) {
  const CustomButton = styled(Button)({
    width: "280px",
    height: "280px",
    color: "#999999",
    backgroundColor: "#FFFFFF",
    flexDirection: "column",
    justifyContent: "space-evenly",
    textAlign: "center",
  });

  const buttonText = [
    {
      text: "Buy Aroma",
      subText: "An ERC20 token",
      href: "/market/aroma/buy",
      mainImage: AromaCoinSide,
      extraImg: null,
    },
    {
      text: "Buy a CHEF",
      subText: "If you already have AROMA Token",
      href: "/market/chef/buy",
      mainImage: ChefHolder,
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
    <Container maxWidth="xl">
      <Headline>{t("market.title")}</Headline>
      <Grid container justifyContent="center">
        {buttonText.map((button) => (
          <Grid item mx="5vw" mb="3vh">
            <CustomButton
              variant="contained"
              shape="roundish"
              href={button.href}
            >
              <img
                src={button.mainImage}
                width="50%"
                height="auto"
                alt={button.text}
              />
              {button.extraImg}
              <Box>
                <Typography variant="h6" color="common.black">
                  {button.text}
                </Typography>
                {button.subText}
              </Box>
            </CustomButton>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default withTranslation()(Market);
