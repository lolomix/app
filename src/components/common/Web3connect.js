import React, { Component, Fragment } from "react";
import { withTranslation } from "react-i18next";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import Blockies from "react-blockies";
//material-ui
import Tooltip from "@mui/material/Tooltip";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Popover from "@mui/material/Popover";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Typography from "@mui/material/Typography";
//icons
import AccountCircle from "@mui/icons-material/AccountCircle";
import AddCircle from "@mui/icons-material/AddCircle";

class Web3connect extends Component {
  state = {
    connectionMenu: null,
    deferredPrompt: null,
    isAppInstalled: false,
    isAppInstallable: false,
    dialogWeb3: false,
  };

  componentDidMount = () => {
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
  handleDialogWeb3Open = () => {
    this.setState({ dialogWeb3: true });
  };
  handleDialogWeb3Close = () => {
    this.setState({ dialogWeb3: false });
  };

  render() {
    const { t } = this.props;
    const { connectionMenu, dialogWeb3 } = this.state;

    return (
      <Fragment>
        <Tooltip title="Connect to your Ethereum account">
          <Button size="small" variant="outlined" color="secondary" onClick={this.handleDialogWeb3Open}>
            Connect
          </Button>
        </Tooltip>
        <Tooltip disableFocusListener title={t("base.connectionInfo")} aria-label={t("base.connectionInfo")}>
          <IconButton color="inherit" onClick={this.handleConnectionIconClick}>
            <AccountCircle />
          </IconButton>
        </Tooltip>
        <Backdrop open={Boolean(connectionMenu)} className="backdropZindex">
          <Popover id="settings-menu" open={Boolean(connectionMenu)} anchorEl={connectionMenu} onClose={this.handleConnectionMenuClose}>
            <Paper>
              <Box m={2}>
                <List dense>
                  <ListItem button component={Link} to="/account" onClick={this.handleConnectionMenuClose}>
                    <Tooltip disableFocusListener title="asdfasdf">
                      <ListItemAvatar>
                        <Avatar>
                          <Blockies seed="asdfasdf" size={10} scale={4} className="blockies" />
                        </Avatar>
                      </ListItemAvatar>
                    </Tooltip>
                    <ListItemText secondary="0x45454545455345" primary={t("base.openYourAccount")} />
                    <ListItemSecondaryAction></ListItemSecondaryAction>
                  </ListItem>
                  <ListItem button component={Link} to="/account" onClick={this.handleConnectionMenuClose}>
                    <ListItemText secondary="20 AROMA" primary="Wallet balance" />
                    <ListItemSecondaryAction></ListItemSecondaryAction>
                  </ListItem>
                  <ListItem button component={Link} to="/account" onClick={this.handleConnectionMenuClose}>
                    <ListItemText secondary="0 NFTs" primary="Open my collection" />
                    <ListItemSecondaryAction></ListItemSecondaryAction>
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
              </Box>
            </Paper>
          </Popover>
        </Backdrop>
        <Dialog onClose={this.handleDialogWeb3Close} open={dialogWeb3} keepMounted maxWidth="lg">
          <DialogContent>
            <Typography variant="h2" gutterBottom>
              Connect Wallet
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleDialogWeb3Close} variant="contained" color="primary">
              {t("base.close")}
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

export default withRouter(withTranslation()(Web3connect));
