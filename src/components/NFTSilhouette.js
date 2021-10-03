import React from "react";

import { withTranslation } from 'react-i18next'
import Card from '@mui/material/Card'
import { Paper, CardContent, Typography, Box, Grid } from '@mui/material'

class NFTSilhouette extends React.Component {
  render() {
    const { t, fullHeight } = this.props;

    let sx = {};

    if (fullHeight) {
      sx = { height: "100%" }
    }

    return (
      <Card sx={sx}>
        <CardContent>
          <Typography gutterBottom variant="h5">
            NFT Shiolette
          </Typography>
          <Paper variant="outlined">
            <Grid container justifyContent="center" alignItems="center" my={3}>
              <Grid item md={10}>
                <Box textAlign="center">
                  <img
                    src={`http://placehold.it/400x500`}
                    srcSet={`http://placehold.it/400x500 2x`}
                    alt="CryptoChef Silhouette"
                    loading="lazy"
                  />
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </CardContent>
      </Card>
    );
  }
}

export default withTranslation()(NFTSilhouette);

