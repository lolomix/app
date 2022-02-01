import React from "react";
import { withTranslation } from "react-i18next";
// material-ui
import Grid from "@mui/material/Grid";
import { Box, Container } from "@mui/material";
// custom
import ViewHeading from "../../components/layout/ViewHeading";
import OpeningSoon from "../../components/common/OpeningSoonCard";
import Layout from "../../components/layout/Layout";
import KitchenIcon from "../../components/icons/KitchenIcon";

/**
 * @returns {JSX.Element}
 * @constructor
 */
function Kitchen() {
  return (
    <Layout
      helmetTitle="Kitchen"
      title="Kitchen"
      subTitle="Where all the magic starts"
      icon={<KitchenIcon sx={{ fontSize: 48, marginTop: 0.5 }} />}
    >
      <Box pb={10} pt={1} sx={{ backgroundColor: "sunGlow.main" }}>
        <Container as="section">
          <ViewHeading>Kitchen</ViewHeading>
          <Grid container justifyContent="center" alignItems="stretch">
            <Grid item md={6} mb={21}>
              <OpeningSoon />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Layout>
  );
}

export default withTranslation()(Kitchen);
