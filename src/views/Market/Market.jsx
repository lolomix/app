import React from "react";
import { withTranslation } from "react-i18next";
import { Helmet } from "react-helmet";
// material-ui
import { Box, Container, Grid } from "@mui/material";
// custom
import CurrencyExchange from "../../components/web3/CurrencyExchange";
import NftBuy from "../../components/web3/NftBuy";
import ViewHeading from "../../components/layout/ViewHeading";
import DripDivider from "../../components/layout/DripDivider";
import FAQ from "../../components/common/FAQ";
import ConnectionErrorCard from "../../components/common/ConnectionErrorCard";
import { useEthers } from "@usedapp/core";

/**
 * @param t
 * @returns {JSX.Element}
 * @constructor
 */
function Market({ t }) {
  const { active, error } = useEthers();

  return (
    <>
      <Helmet>
        <title>{t("market.title")}</title>
      </Helmet>
      <Box id="market" pb={10} pt={1} sx={{ backgroundColor: "sunGlow.main" }}>
        <Container as="section">
          <ViewHeading>{t("market.title")}</ViewHeading>
          <Grid
            container
            spacing={3}
            justifyContent="center"
            alignItems="stretch"
          >
            {active ? (
              <>
                <Grid item xs={12} lg={4}>
                  <CurrencyExchange fullheight="true" />
                </Grid>
                <Grid item xs={12} lg={8}>
                  <NftBuy fullheight="true" />
                </Grid>
              </>
            ) : (
              <Grid item xs={10} sm={7} md={5} lg={4} mb={21}>
                <ConnectionErrorCard error={error} elevation={3} />
              </Grid>
            )}
          </Grid>
        </Container>
      </Box>

      <Box id="faq" pb={10} sx={{ backgroundColor: "secondary.main" }}>
        <DripDivider variant={2} color="sunGlow.main" />
        <Container as="section">
          <ViewHeading variant="h2" color="secondary.contrastText">
            FAQ
          </ViewHeading>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            <Grid item xs={12} sm={10} md={8}>
              <FAQ color="secondary.contrastText" />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}

export default withTranslation()(Market);
