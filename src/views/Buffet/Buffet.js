import React, { Component } from "react";
import { withTranslation } from "react-i18next";
//material-ui
//import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import OpeningSoon from "../../components/common/OpeningSoon";

class Buffet extends Component {
  state = {
    dialogQr: false,
    assembly: "",
    chain: "demo",
  };

  componentDidMount() {
    document.body.className = "buffet";
  }

  render() {
    return (
      <Box p={2}>
        <OpeningSoon />
      </Box>
    );
  }
}

export default withTranslation()(Buffet);
