import React, { Component, Fragment } from "react";
import { withTranslation } from "react-i18next";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import Blockies from "react-blockies";
//material-ui
import Tooltip from "@material-ui/core/Tooltip";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Popover from "@material-ui/core/Popover";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Switch from "@material-ui/core/Switch";
import Hidden from "@material-ui/core/Hidden";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Backdrop from "@material-ui/core/Backdrop";
//icons
import AccountCircle from "@material-ui/icons/AccountCircle";
import AddCircle from "@material-ui/icons/AddCircle";
//custom
import CopyButton from "./CopyButton";

class ConnectionInfo extends Component {
  state = {
    connectionMenu: null,
    deferredPrompt: null,
    isAppInstalled: false,
    isAppInstallable: false,
  };

  componentDidMount = () => {
    let expertmode = window.localStorage.getItem("expertmode") ? window.localStorage.getItem("expertmode") : false;
    expertmode = expertmode === "true";
    let videoOn = window.localStorage.getItem("videoOn") ? window.localStorage.getItem("videoOn") : false;
    videoOn = videoOn === "true";
    this.props.setExpertMode(expertmode);
    this.props.setVideoOn(videoOn);

    window.addEventListener("beforeinstallprompt", (e) => {
      this.setState({ deferredPrompt: e, isAppInstallable: true });
      console.log("deffered prompt saved");
    });
    window.addEventListener("appinstalled", (evt) => {
      this.setState({ isAppInstalled: true });
    });
  };
  handleConnectionIconClick = (event) => {
    this.setState({ connectionMenu: event.currentTarget });
  };
  handleConnectionMenuClose = () => {
    this.setState({ connectionMenu: null });
  };
  setExpertMode = (event) => {
    this.props.setExpertMode(event.target.checked);
  };
  setVideoOn = (event) => {
    this.props.setVideoOn(event.target.checked);
  };

  render() {
    const { t, expertmode, videoOn } = this.props;
    const { connectionMenu } = this.state;

    return (
      <Fragment>
        <Tooltip disableFocusListener title={t("base.connectionInfo")} aria-label={t("base.connectionInfo")}>
          <IconButton color="inherit" onClick={this.handleConnectionIconClick}>
            <AccountCircle />
          </IconButton>
        </Tooltip>
        <Backdrop open={Boolean(connectionMenu)} className="backdropZindex">
          <Popover id="settings-menu" open={Boolean(connectionMenu)} anchorEl={connectionMenu} onClose={this.handleConnectionMenuClose}>
            <Paper className="defaultpadding">
              <List dense>
                <ListItem button component={Link} to="/account" onClick={this.handleConnectionMenuClose}>
                  <Tooltip disableFocusListener title="asdfasdf">
                    <ListItemAvatar>
                      <Avatar>
                        <Blockies seed="asdfasdf" size={10} scale={4} className="blockies" />
                      </Avatar>
                    </ListItemAvatar>
                  </Tooltip>
                  <ListItemText secondary="asdfasdf" primary={t("base.openYourAccount")} />
                  <ListItemSecondaryAction>
                    <CopyButton text="asdfasdf" />
                  </ListItemSecondaryAction>
                </ListItem>
                <Hidden smDown>
                  <ListItem>
                    <Tooltip disableFocusListener title={t("base.tooltipVideo")}>
                      <Switch checked={videoOn ? videoOn : false} onChange={this.setVideoOn} name="Video" color="primary" />
                    </Tooltip>
                    <ListItemText primary={t("base.toggleVideo")} secondary={t("base.toggleVideoSecondary")} />
                  </ListItem>
                </Hidden>
                <ListItem>
                  <Tooltip disableFocusListener title={t("base.tooltipExpertmode")}>
                    <Switch checked={expertmode ? expertmode : false} onChange={this.setExpertMode} name="expertmode" color="primary" />
                  </Tooltip>
                  <ListItemText primary={t("base.expertmode")} secondary={t("base.expertmodeSecondary")} />
                </ListItem>
                {this.state.isAppInstallable && !this.state.isAppInstalled && (
                  <ListItem button onClick={() => this.state.deferredPrompt.prompt()}>
                    <ListItemIcon color="primary">
                      <AddCircle />
                    </ListItemIcon>
                    <ListItemText primary="Install app" secondary="Click to install" />
                  </ListItem>
                )}
              </List>
              <Button color="primary" variant="outlined" onClick={this.handleConnectionMenuClose}>
                {t("base.close")}
              </Button>
            </Paper>
          </Popover>
        </Backdrop>
      </Fragment>
    );
  }
}

export default withRouter(withTranslation()(ConnectionInfo));
