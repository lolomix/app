import React from "react";
import { withTranslation } from "react-i18next";
// material-ui
import {
  Box,
  Container,
  Grid,
  CardContent,
  Card,
  Typography,
  Button,
  Stack,
} from "@mui/material";
// custom
import { useEthers } from "@usedapp/core";
import ViewHeading from "../../components/layout/ViewHeading";
import { Helmet } from "react-helmet";
import NftCard from "../../components/web3/NftCard";
import NoNftNotificationCard from "../../components/common/NoNftNotificationCard";
import ConnectionErrorCard from "../../components/common/ConnectionErrorCard";
import { useChefofOwner } from "../../hooks/useChefofOwner";
import tokenAbi from "../../web3/abi/CryptoChefsERC721Facet.json";
import { NETWORKS, TARGET_CHAIN } from "../../web3/constants";
import MyChefsIcon from "../../components/icons/MyChefsIcon";
import CurrencyAromaCartoonIcon from "../../components/icons/CurrencyAromaCartoonIcon";
import { formatCurrency } from "../../utils/formatters";
import BuyChef from "../../assets/Buy_CHEF.svg";
import { theme } from "../../utils/theme.js";
/**
 * @returns {JSX.Element}
 * @constructor
 *
 * @todo refactor and get rid of if hell in jsx
 */
function MyChefs() {
  const { active, error } = useEthers();

  const tokenAddress = NETWORKS[TARGET_CHAIN].contractMaster;
  const nfts = useChefofOwner();

  return (
    <Container maxWidth="xl">
      <Helmet>
        <title>My Chefs</title>
      </Helmet>
      <ViewHeading
        title="My Chefs"
        subTitle={`You Own : ${nfts ? nfts.length : 0}`}
        icon={<MyChefsIcon sx={{ fontSize: 70, paddingBottom: 2 }} />}
      ></ViewHeading>
      <Grid container item mt={5} spacing={3} justifyContent="center">
        <Grid item xs={12} md={6} lg={3}>
          <Card sx={{ boxShadow: theme.blurredShadows }}>
            <CardContent>
              <Stack textAlign="center" spacing={1}>
                <Typography variant="h3" color="secondary" fontWeight={500}>
                  Buy a CHEF
                </Typography>
                <Typography variant="h5">Season 1</Typography>
                <Box
                  sx={{
                    background:
                      "rgba(237,246,255, 0.33) 0% 0% no-repeat padding-box",
                    boxShadow: "inset 0px 6px 8px rgba(237,246,255, 1)",
                    padding: 1.5,
                  }}
                >
                  <picture>
                    <source srcSet={BuyChef} />
                    <img
                      style={{ minWidth: "80%", margin: 20 }}
                      src={BuyChef}
                      alt={"Buy CHEF"}
                    />
                  </picture>
                  <Button
                    variant="yellowContained"
                    fullWidth
                    size="xlarge"
                    startIcon={<CurrencyAromaCartoonIcon />}
                  >
                    <Typography variant="h4">{formatCurrency(1000)}</Typography>
                  </Button>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        {active ? (
          nfts ? (
            nfts.map((tokenID, index) => (
              <Grid key={tokenID.toString()} item xs={12} md={6} lg={3}>
                <a
                  target="_blank"
                  rel="noreferrer nofollow"
                  href={`${NETWORKS[TARGET_CHAIN].openSeaLink}/${
                    NETWORKS[TARGET_CHAIN].contractMaster
                  }/${tokenID.toString()}`}
                  style={{ textDecoration: "none" }}
                >
                  <NftCard
                    tokenAbi={tokenAbi}
                    tokenAddress={tokenAddress}
                    tokenID={tokenID.toNumber()}
                    lazyLoad={index > 2}
                  />
                </a>
              </Grid>
            ))
          ) : (
            <Grid item md={6} mb={21}>
              <NoNftNotificationCard />
            </Grid>
          )
        ) : (
          <Grid item xs={10} sm={7} md={5} lg={4} mb={21}>
            <ConnectionErrorCard error={error} elevation={3} />
          </Grid>
        )}
      </Grid>
    </Container>
  );
}

export default withTranslation()(MyChefs);
