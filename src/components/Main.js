import React, { Component, Suspense } from "react";
import { withTranslation } from "react-i18next";
import PropTypes from "prop-types";
//material-ui
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Paper from "@material-ui/core/Paper";
import AppBar from "@material-ui/core/AppBar";
//icons
import Home from "@material-ui/icons/Home";
import MeetingRoom from "@material-ui/icons/MeetingRoom";
import History from "@material-ui/icons/History";
//tabs
import MainJoin from "./MainJoin";
import MainHistory from "./MainHistory";
import MainStart from "./MainStart";
//custom
import LoadingSpinner from "./common/LoadingSpinner";

function TabPanel(props) {
  const { children, value, pathname, ...other } = props;
  return (
    <div role="tabpanel" hidden={value !== pathname} {...other}>
      {value === pathname && <Box m={0}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  value: PropTypes.any.isRequired,
};

class Main extends Component {
  handleTabs = (event, value) => {
    this.props.history.push(value);
  };
  webShare = () => {
    navigator
      .share({
        title: "cryptochefs.io",
        text: "Check out cryptochefs.io",
        url: "https://cryptochefs.io",
      })
      .then(() => console.log("Successful share"))
      .catch((error) => console.log("Error sharing", error));
  };

  render() {
    const { t } = this.props;
    const { pathname } = this.props.history.location;

    return (
      <Grid item xs={12} md={9} xl={6} className="defaultpadding">
        <Typography variant="h1" gutterBottom>
          {t("main.title")}
        </Typography>
        <Box my={3}>
          <Paper>
            <AppBar color="default" position="static">
              <Tabs value={pathname} onChange={this.handleTabs} centered variant="fullWidth">
                <Tab value="/" label="Start" icon={<Home />} />
                <Tab value="/join" label="Join" icon={<MeetingRoom />} />
                <Tab value="/history" label="History" icon={<History />} />
              </Tabs>
            </AppBar>
            <TabPanel value="/" pathname={pathname}>
              <Suspense fallback={<LoadingSpinner />}>
                <MainStart />
              </Suspense>
            </TabPanel>
            <TabPanel value="/join" pathname={pathname}>
              <Suspense fallback={<LoadingSpinner />}>
                <MainJoin />
              </Suspense>
            </TabPanel>
            <TabPanel value="/history" pathname={pathname}>
              <Suspense fallback={<LoadingSpinner />}>
                <MainHistory />
              </Suspense>
            </TabPanel>
          </Paper>
        </Box>
        <Box my={6}>
          <Typography variant="body2" gutterBottom color="textSecondary">
            © Copyright {new Date().getFullYear()} CryptoChefs
          </Typography>
        </Box>
      </Grid>
    );
  }
}

export default withTranslation()(Main);
