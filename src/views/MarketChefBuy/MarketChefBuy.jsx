import React from "react";
import { Box, Typography, Grid } from "@mui/material";
import NftBuy from "../../components/web3/NftBuy";
import Layout from "../../components/layout/Layout";
import styled from "@emotion/styled";
import { useChefSeasonRemaining } from "../../hooks/chef/useChefSeasonRemaining";
import { useChefTotalSupply } from "../../hooks/chef/useChefTotalSupply";

const CustomBanner = styled(Box, {
  shouldForwardProp: (prop) => prop !== "color" && prop !== "size",
})(({ theme }) => ({
  ...{
    width: "200px",
    height: "180px",
    position: "absolute",
    bottom: 300,
    top: 350,
    left: "70vw",
    borderRadius: 40,
    transform: "rotate(17deg)",
    [theme.breakpoints.down("md")]: {
      width: "100%",
      height: "auto",
      position: "static",
      borderRadius: 15,
      transform: "none",
      marginTop: 40,
    },
    background: "#4B6272 0% 0% no-repeat ",
    color: theme.palette.common.white,
    border: "7px solid #1111111A",
    textAlign: "center",
  },
}));

const MarketChefBuy = () => {
  const [, soldFormatted] = useChefTotalSupply();
  const remaining = useChefSeasonRemaining();

  return (
    <Layout helmetTitle="Buy a CHEF" title="Chef" buttonType="back">
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <NftBuy remaining={remaining !== 0} />
        </Grid>
<Grid item xs={12}>
        <CustomBanner>
          <Grid container justifyContent="center" alignItems="center" py={2}>
            <Grid item xs={12} sm={5} md={12} order={{ xs: 2, md: 1 }}>
              <Typography variant="h2" fontWeight={800}>
                {remaining}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={2} md={12} order={{ xs: 1, md: 2 }}>
              <Typography variant="h3" fontWeight={800}>
                Remaining
              </Typography>
            </Grid>
          </Grid>
          <Typography variant="h3" fontWeight={800} sx={{ opacity: "0.8" }}>
            Sold {soldFormatted}
          </Typography>
        </CustomBanner>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default MarketChefBuy;
