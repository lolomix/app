import React from "react";
import { withTranslation } from "react-i18next";
// material-ui
import Grid from "@mui/material/Grid";
import { Helmet } from 'react-helmet'
import { Box, Container } from '@mui/material'
// custom
import Headline from '../../components/layout/Headline'
import OpeningSoon from "../../components/common/OpeningSoon";

/**
 * @returns {JSX.Element}
 * @constructor
 */
function Buffet () {

  return (
    <>
      <Helmet>
        <title>Buffet</title>
      </Helmet>
      <Box pb={10} pt={1} sx={{ backgroundColor: 'sunGlow.main' }}>
        <Container as="section">
          <Headline>
            Buffet
          </Headline>
          <Grid container justifyContent="center" alignItems="stretch">
            <Grid item md={6} mb={21}>
              <OpeningSoon/>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  )
}

export default withTranslation()(Buffet)