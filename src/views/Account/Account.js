import React, { Component } from "react";
import { withTranslation } from "react-i18next";
//mui
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
//custom
import Headline from "../../components/layout/Headline";

class Account extends Component {
  render() {
    const { t } = this.props;

    return (
      <Box pb={10}>
        <Container as="section">
          <Headline color="white" title={t("internal.title")} />
          <Grid container spacing={2}>
            <Grid item sm={12} md={6}>
              <Typography variant="h3">Your balance</Typography>
              <Typography variant="body2">Set Price of AROMA in native currency.</Typography>
            </Grid>
            <Grid item sm={12} md={6}>
              <Typography variant="h3">Your CHEF NFTs</Typography>
              <Typography variant="body2">Set Price of CHEF NFT in AROMA.</Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>
    );
  }
}

export default withTranslation()(Account);
