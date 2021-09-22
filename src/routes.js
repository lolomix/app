import React, { Component, Suspense, lazy } from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import { withTranslation } from "react-i18next";
import { SnackbarProvider } from "notistack";
// material-ui
import { green, blue, red } from "@material-ui/core/colors";
import { MuiThemeProvider, withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import { theme } from "./utils/theme";
// shell
import Topbar from "./components/common/Topbar";
import LoadingSpinner from "./components/common/LoadingSpinner";
import ServiceWorkerWrapper from "./components/ServiceWorkerWrapper";
//import OfflineInfo from "./components/common/OfflineInfo";
// pages (lazy loading)
const Main = lazy(() => import("./components/Main"));
const Account = lazy(() => import("./components/Account"));
const Explainer = lazy(() => import("./components/Explainer"));
const ReleaseNotes = lazy(() => import("./components/ReleaseNotes"));

const styles = {
  info: { backgroundImage: "linear-gradient(90deg," + blue[700] + "," + blue[500] + ")" },
  error: { backgroundImage: "linear-gradient(90deg," + red[700] + "," + red[400] + ")" },
  warning: { backgroundImage: "linear-gradient(90deg," + blue[700] + "," + blue[500] + ")" },
  success: { backgroundImage: "linear-gradient(90deg," + green[700] + "," + green[500] + ")" },
};

class App extends Component {
  state = {
    expertmode: false,
    videoOn: false,
    admin: false,
  };

  setExpertMode = (boolValue) => {
    this.setState({ expertmode: boolValue });
    window.localStorage.setItem("expertmode", boolValue);
  };
  setVideoOn = (boolValue) => {
    this.setState({ videoOn: boolValue });
    window.localStorage.setItem("videoOn", boolValue);
  };
  setAdmin = (boolValue) => {
    this.setState({ admin: boolValue });
  };

  render() {
    const { expertmode, videoOn, admin } = this.state;
    const { classes } = this.props;

    return (
      <MuiThemeProvider theme={theme}>
        <SnackbarProvider
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          maxSnack={3}
          autoHideDuration={6000}
          classes={{
            variantSuccess: classes.success,
            variantError: classes.error,
            variantWarning: classes.warning,
            variantInfo: classes.info,
          }}
        >
          <CssBaseline />
          <Router basename="/">
            <>
              <Topbar setExpertMode={this.setExpertMode} setVideoOn={this.setVideoOn} expertmode={expertmode} videoOn={videoOn} admin={admin} />
              <Grid container spacing={0} direction="row" justifyContent="center" alignItems="flex-start">
                <ServiceWorkerWrapper />
                <Suspense fallback={<LoadingSpinner />}>
                  <Switch>
                    <Route exact path="/" component={Main} />
                    <Route exact path="/history" component={Main} />
                    <Route exact path="/join" component={Main} />
                    <Route exact path="/howitworks" component={Explainer} />
                    <Route exact path="/releasenotes" component={ReleaseNotes} />
                    <Route exact path="/account" render={() => <Account expertmode={expertmode} />} />
                  </Switch>
                </Suspense>
              </Grid>
            </>
          </Router>
        </SnackbarProvider>
      </MuiThemeProvider>
    );
  }
}

export default withTranslation()(withStyles(styles)(App));
