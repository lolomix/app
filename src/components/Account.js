import React, { Component, Suspense } from "react";
import { withTranslation } from "react-i18next";
import { withRouter } from "react-router";
import Blockies from "react-blockies";
import PropTypes from "prop-types";
//material-ui
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Tooltip from "@mui/material/Tooltip";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import AppBar from "@mui/material/AppBar";
//icons
import GetApp from "@mui/icons-material/GetApp";
import VpnKey from "@mui/icons-material/VpnKey";
import Edit from "@mui/icons-material/Edit";
import Power from "@mui/icons-material/Power";
//custom
import LoadingSpinner from "./common/LoadingSpinner";
//lazy
const AccountExport = React.lazy(() => import("./AccountExport"));
const AccountImport = React.lazy(() => import("./AccountImport"));
const AccountSecurity = React.lazy(() => import("./AccountSecurity"));
const AccountConnect = React.lazy(() => import("./AccountConnect"));

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && <Box m={0}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

class Account extends Component {
  state = {
    activeTab: 0,
  };

  handleTabs = (event, activeTab) => {
    this.setState({ activeTab });
  };

  render() {
    const { t } = this.props;
    const { activeTab } = this.state;

    return (
      <Grid item xs={12} md={9} lg={9} xl={6} className="defaultpadding">
        <Box p={2}>
          <Grid container spacing={2}>
            <Grid item>
              <Tooltip disableFocusListener title="This is a blockie, a graphical representation of your public key.">
                <div>
                  <Blockies seed="asdf" size={8} scale={9} className="blockies" />
                </div>
              </Tooltip>
            </Grid>
            <Grid item>
              <Typography variant="h1" gutterBottom>
                {t("wallet.title")}
              </Typography>
              <Typography variant="body2" gutterBottom>
                Public Key: asfdasfasdf
              </Typography>
            </Grid>
          </Grid>
        </Box>
        <Paper>
          <AppBar color="default" position="static">
            <Tabs value={activeTab} onChange={this.handleTabs} centered variant="fullWidth">
              <Tab label="Security" icon={<VpnKey />} {...a11yProps(0)} />
              <Tab label="Connect" icon={<Power />} {...a11yProps(1)} />
              <Tab label="Edit" icon={<Edit />} {...a11yProps(2)} />
              <Tab label="Export" icon={<GetApp />} {...a11yProps(3)} />
            </Tabs>
          </AppBar>
          <TabPanel value={activeTab} index={0}>
            <AccountSecurity />
          </TabPanel>
          <TabPanel value={activeTab} index={1}>
            <Suspense fallback={<LoadingSpinner />}>
              <AccountConnect />
            </Suspense>
          </TabPanel>
          <TabPanel value={activeTab} index={2}>
            <Suspense fallback={<LoadingSpinner />}>
              <AccountImport />
            </Suspense>
          </TabPanel>
          <TabPanel value={activeTab} index={3}>
            <Suspense fallback={<LoadingSpinner />}>
              <AccountExport />
            </Suspense>
          </TabPanel>
        </Paper>
      </Grid>
    );
  }
}

export default withRouter(withTranslation()(Account));
