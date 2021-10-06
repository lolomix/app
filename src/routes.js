import React, { Component, Suspense, lazy } from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import { withTranslation } from "react-i18next";
import { SnackbarProvider } from "notistack";
import { Web3ReactProvider } from "@web3-react/core";
import Web3 from "web3";
// fonts
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
// material-ui
import { green, blue, red } from "@mui/material/colors";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import { theme } from "./utils/theme";
// shell
import TopBar from "./components/layout/TopBar";
import LoadingSpinner from "./components/common/LoadingSpinner";
import ServiceWorkerWrapper from "./components/ServiceWorkerWrapper";
// pages (lazy loading)
const Main = lazy(() => import("./views/Main/Main"));
const Web3Test = lazy(() => import("./views/Web3/Web3Test"));
const Store = lazy(() => import("./views/Store/Store"));
const Kitchen = lazy(() => import("./views/Kitchen/Kitchen"));
const Buffet = lazy(() => import("./views/Buffet/Buffet"));

function getLibrary(provider) {
  //const library =
  //library.pollingInterval = 12000
  return new Web3(provider);
}

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

    return (
      <Web3ReactProvider getLibrary={getLibrary}>
        <ThemeProvider theme={theme}>
          <SnackbarProvider
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            maxSnack={3}
            autoHideDuration={6000}
            classes={{
              variantSuccess: { backgroundImage: "linear-gradient(90deg," + green[700] + "," + green[500] + ")" },
              variantError: { backgroundImage: "linear-gradient(90deg," + red[700] + "," + red[400] + ")" },
              variantWarning: { backgroundImage: "linear-gradient(90deg," + blue[700] + "," + blue[500] + ")" },
              variantInfo: { backgroundImage: "linear-gradient(90deg," + blue[700] + "," + blue[500] + ")" },
            }}>
            <CssBaseline />
            <Router basename="/">
              <>
                <TopBar setExpertMode={this.setExpertMode} setVideoOn={this.setVideoOn} expertmode={expertmode} videoOn={videoOn} admin={admin} />
                <Grid container spacing={0} direction="row" justifyContent="center" alignItems="flex-start">
                  <ServiceWorkerWrapper />
                  <Suspense fallback={<LoadingSpinner />}>
                    <Switch>
                      <Route exact path="/" component={Main} />
                      <Route exact path="/start" component={Main} />
                      <Route exact path="/buffet" component={Buffet} />
                      <Route exact path="/store" component={Store} />
                      <Route exact path="/kitchen" component={Kitchen} />
                      <Route exact path="/web3test" component={Web3Test} />
                    </Switch>
                  </Suspense>
                </Grid>
              </>
            </Router>
          </SnackbarProvider>
        </ThemeProvider>
      </Web3ReactProvider>
    );
  }
}

export default withTranslation()(App);
