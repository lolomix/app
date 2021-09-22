import React, { Component } from "react";
import { Detector } from "react-detect-offline";
import { withSnackbar } from "notistack";

class OfflineInfo extends Component {
  updateSnackbar = (online) => {
    if (!online) {
      this.props.enqueueSnackbar("offline");
    }
  };

  render() {
    return <Detector render={({ online }) => <>{this.updateSnackbar(online)}</>} />;
  }
}

export default withSnackbar(OfflineInfo);
