import React, { Component } from "react";
import { withTranslation } from "react-i18next";
//material-ui
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

class Buffet extends Component {
  state = {
    dialogQr: false,
    assembly: "",
    chain: "demo",
  };

  render() {
    const { t } = this.props;

    return (
      <Box p={2}>
        <Typography variant="h2" gutterBottom>
          {t("buffet.title")}
        </Typography>
      </Box>
    );
  }
}

export default withTranslation()(Buffet);
