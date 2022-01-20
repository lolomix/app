import React from "react";
import { withTranslation } from "react-i18next";
// material-ui
import { Container, Grid, Button, Typography, Box } from "@mui/material";
// custom
// import CurrencyExchange from "../../components/web3/CurrencyExchange";
// import NftBuy from "../../components/web3/NftBuy";
// import ConnectionErrorCard from "../../components/common/ConnectionErrorCard";
// import { useEthers } from "@usedapp/core";
import Headline from "../../components/layout/Headline";
import { styled } from "@mui/material/styles";
import AromaCoinFront from "../../assets/aroma-coin-front.svg";
import AromaCoinSide from "../../assets/aroma-coin-side.svg";
import ChefHolder from "../../assets/chef-holder.png";
import PinkArrow from "../../assets/pink-arrow.svg";

/**
 * @param t
 * @returns {JSX.Element}
 * @constructor
 */
function Market({ t }) {
  //const { active, error } = useEthers();

  const CustomButton = styled(Button)({
    width: "280px",
    height: "280px",
    color: "#999999",
    backgroundColor: "#FFFFFF",
    boxShadow: "inset 0px 3px 6px #00000012, 0px 3px 25px #00000029",
    display: "flex",
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
      divider: true,
    },
    {
      text: "Buy a CHEF",
      subText: "If you already have AROMA Token",
      href: "/market/chef/buy",
      mainImage: ChefHolder,
      divider: false,
    },
  ];

  return (
    <Container maxWidth="xl">
      <Headline>{t("market.title")}</Headline>
      {
        //active ? (
        //  <>
        //    <Grid item xs={12} lg={4}>
        //      <CurrencyExchange fullheight="true" />
        //    </Grid>
        //    <Grid item xs={12} lg={8}>
        //      <NftBuy fullheight="true" />
        //    </Grid>
        //  </>
        //) : (
        //  <Grid item xs={10} sm={7} md={5} lg={4} mb={21}>
        //    <ConnectionErrorCard error={error} elevation={3} />
        //  </Grid>
        //)
      }
      <Grid
        container
        mt="8vh"
        mb="8vh"
        height="65vh"
        justifyContent="center"
        alignItems="space-between"
      >
        {buttonText.map((button) => (
          <Grid item ml="5vw" mr="5vw" mb="3vh">
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
              ></img>
              {button.text === "Buy a CHEF" ? (
                <>
                  <img
                    src={PinkArrow}
                    width="10%"
                    height="auto"
                    alt="PinkArrow"
                    style={{
                      position: "absolute",
                      left: "55px",
                      top: "100px",
                    }}
                  ></img>
                  <img
                    src={AromaCoinFront}
                    width="15%"
                    height="auto"
                    alt="AromaCoinFront"
                    style={{
                      position: "absolute",
                      left: "25px",
                      top: "132px",
                    }}
                  ></img>
                </>
              ) : null}
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
