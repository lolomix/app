import React, { Component } from "react";
import { withTranslation } from "react-i18next";
//material-ui
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Hidden from "@mui/material/Hidden";

class AccountConnect extends Component {
  state = {
    connector: {},
  };

  render() {
    const { t } = this.props;

    return (
      <Box p={2}>
        <Box mb={4}>
          <Typography variant="h2" gutterBottom>
            {t("wallet.WalletConnect")}
          </Typography>
          <Hidden xsUp>
            <Typography variant="body2" gutterBottom>
              {t("wallet.WalletConnectDescription")}
            </Typography>

            <Button color="primary" variant="outlined">
              {t("wallet.walletConnect")}
            </Button>
          </Hidden>
        </Box>
      </Box>
    );
  }
}

export default withTranslation()(AccountConnect);
