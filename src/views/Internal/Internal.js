import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import { getWeb3ReactContext } from "@web3-react/core";
// material-ui
import { Box, Container, Grid, Typography, Button, OutlinedInput } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
// custom
import Headline from "../../components/layout/Headline";

import { NETWORKS, TARGET_CHAIN } from "../../web3/constants";

class Internal extends Component {
  /*
  componentDidMount() {
    document.body.className = "store";
  }
  */
  static contextType = getWeb3ReactContext();

  render() {
    const { t } = this.props;
    const web3ready = this.context.chainId === NETWORKS[TARGET_CHAIN].chainId;
    const isAdmin = this.context.account === NETWORKS[TARGET_CHAIN].adminAccount;

    return (
      <Box pb={10}>
        <Container as="section">
          <Headline color="white" title={t("internal.title")} />
          {web3ready && isAdmin ? (
            <Grid container spacing={2}>
              <Grid item sm={12} md={6}>
                <Typography variant="h3">AROMA price</Typography>
                <Typography variant="body2">Set Price of AROMA in native currency.</Typography>
                <OutlinedInput
                  placeholder="Amount"
                  variant="outlined"
                  disabled={false}
                  margin="normal"
                  type="number"
                  endAdornment={
                    <InputAdornment position="end">
                      <Button variant="contained" edge="end">
                        Set price
                      </Button>
                    </InputAdornment>
                  }
                />
              </Grid>
              <Grid item sm={12} md={6}>
                <Typography variant="h3">CHEF Price</Typography>
                <Typography variant="body2">Set Price of CHEF NFT in AROMA.</Typography>
                <OutlinedInput
                  placeholder="Amount"
                  variant="outlined"
                  disabled={false}
                  margin="normal"
                  type="number"
                  endAdornment={
                    <InputAdornment position="end">
                      <Button variant="contained" edge="end">
                        Set price
                      </Button>
                    </InputAdornment>
                  }
                />
              </Grid>
            </Grid>
          ) : (
            <Typography variant="body2">No access</Typography>
          )}
        </Container>
      </Box>
    );
  }
}

export default withTranslation()(Internal);
