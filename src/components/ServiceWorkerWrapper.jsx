import React, { Fragment } from "react";
import * as serviceWorkerRegistration from "../serviceWorkerRegistration";
import Button from "@mui/material/Button";
import { withSnackbar } from "notistack";

class ServiceWorkerWrapper extends React.Component {
  state = {
    showReload: null,
    waitingWorker: null,
  };

  componentDidMount() {
    serviceWorkerRegistration.register({ onUpdate: this.onSWUpdate });
  }

  onSWUpdate = (registration) => {
    this.setState({ waitingWorker: registration.waiting });
    const activeSnackbar = this.props.enqueueSnackbar(
      "A new version is available",
      {
        variant: "warning",
        persist: true,
        action: (
          <Button color="inherit" size="small" onClick={this.reloadPage}>
            Update now
          </Button>
        ),
      }
    );
    this.setState({ showReload: activeSnackbar });
  };

  reloadPage = () => {
    this.props.closeSnackbar(this.state.showReload);
    this.state.waitingWorker.postMessage({ type: "SKIP_WAITING" });
    window.location.reload(true);
  };

  render() {
    return <Fragment> </Fragment>;
  }
}

export default withSnackbar(ServiceWorkerWrapper);
