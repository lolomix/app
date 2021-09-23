import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import { withRouter, Link } from "react-router-dom";
//material-ui
import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
//custom
//import OfflineInfo from "./OfflineInfo";  // deactivated for the time being
import ConnectionInfo from "./ConnectionInfo";
import LanguageSelector from "./LanguageSelector";
import LogoButton from "./LogoButton";
import AdminBarLight from "./AdminBarLight";

class Topbar extends Component {
  render() {
    const { t, admin } = this.props;
    const assembly = this.props.location.pathname.split("/")[3];
    const chain = this.props.location.pathname.split("/")[1];

    return (
      <AppBar color="primary" position="static">
        <Toolbar>
          <Grid container direction="row" justifyContent="space-between" alignItems="center">
            <Grid item>
              <LogoButton />
              <Button color="inherit" size="large" component={Link} to="/">
                {t("base.title")}
              </Button>
            </Grid>
            
              <Grid item>
                <AdminBarLight assembly={assembly} chain={chain} admin={admin} />
              </Grid>
            <Grid item>
              <ConnectionInfo
                setExpertMode={this.props.setExpertMode}
                setVideoOn={this.props.setVideoOn}
                expertmode={this.props.expertmode}
                videoOn={this.props.videoOn}
              />
              <LanguageSelector />
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    );
  }
}

export default withRouter(withTranslation()(Topbar));
