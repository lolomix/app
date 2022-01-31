import React from "react";
import { withTranslation } from "react-i18next";
// material-ui
import Grid from "@mui/material/Grid";
import { Box, Container } from "@mui/material";
// custom
import ViewHeading from "../../components/layout/ViewHeading";
import OpeningSoon from "../../components/common/OpeningSoonCard";
import Layout from "../../components/layout/Layout";
import BuffetIcon from "../../components/icons/BuffetIcon";

/**
 * @returns {JSX.Element}
 * @constructor
 */
function Buffet() {
  return (
    <Layout
      helmetTitle="Buffet"
      title="Buffet"
      subTitle="Lorem ipsum dolor sit amet, consetetur sadipscing elitr"
      icon={<BuffetIcon sx={{ fontSize: 55, marginTop: 0.2 }} />}
    >
      <Box pb={10} pt={1} sx={{ backgroundColor: "sunGlow.main" }}>
        <Container as="section">
          <ViewHeading>Buffet</ViewHeading>
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

export default withTranslation()(Buffet);
