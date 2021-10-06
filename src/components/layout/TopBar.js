import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import { withRouter, Link } from "react-router-dom";
//material-ui
import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import ListItemIcon from "@mui/material/ListItemIcon";
import Tooltip from "@mui/material/Tooltip";
import Hidden from "@mui/material/Hidden";
import IconButton from "@mui/material/IconButton";
// icons
import People from "@mui/icons-material/People";
import EventNote from "@mui/icons-material/EventNote";
import Settings from "@mui/icons-material/Settings";
//custom
//import OfflineInfo from "./OfflineInfo";  // deactivated for the time being
import Web3connect from "./Web3connect";
import LanguageSelector from "./LanguageSelector";
import LogoButton from "../common/LogoButton";

const links = [
  { name: "Store", icon: <Settings />, path: "/store", description: "Buy some Aroma" },
  { name: "Kitchen", icon: <EventNote />, path: "/kitchen", description: "Create your recipe" },
  { name: "Buffet", icon: <People />, path: "/buffet", description: "Order and enjoy your meal" },
];

class TopBar extends Component {
  state = {
    popover: false,
  };
  handleConnectionIconClick = (event) => {
    this.setState({ popover: true });
  };
  handleConnectionMenuClose = () => {
    this.setState({ popover: false });
  };
  render() {
    const { t } = this.props;
    const { popover } = this.state;

    return (
      <AppBar color="default" position="static">
        <Toolbar>
          <Grid container direction="row" justifyContent="space-between" alignItems="center">
            <Grid item>
              <LogoButton />
              <Button color="inherit" size="large" component={Link} to="/">
                {t("base.title")}
              </Button>
            </Grid>
            <Grid item>
              <Hidden smDown>
                <ButtonGroup color="secondary" variant="contained" size="large">
                  {links.map((item, index) => (
                    <Tooltip key={index} title={item.description}>
                      <Button component={Link} to={item.path}>
                        {item.name}
                      </Button>
                    </Tooltip>
                  ))}
                </ButtonGroup>
              </Hidden>
              <Hidden mdUp>
                <Tooltip title={t("admin.navControlButton")}>
                  <IconButton color="inherit" onClick={this.handleConnectionIconClick}>
                    <Settings />
                  </IconButton>
                </Tooltip>
              </Hidden>
              <Dialog onClose={this.handleConnectionMenuClose} aria-labelledby="admininfos" open={popover}>
                <DialogTitle id="admininfos">Admin Infos</DialogTitle>
                <DialogContent>
                  <List dense>
                    {links.map((item, index) => (
                      <ListItem key={index} button component={Link} to={"/assembly/" + item.path} onClick={this.handleConnectionMenuClose}>
                        <ListItemIcon color="primary">{item.icon}</ListItemIcon>
                        <ListItemText primary={item.name} secondary={item.description} />
                      </ListItem>
                    ))}
                  </List>
                </DialogContent>
                <DialogActions>
                  <Button color="primary" variant="outlined" onClick={this.handleConnectionMenuClose}>
                    Close
                  </Button>
                </DialogActions>
              </Dialog>
            </Grid>
            <Grid item>
              <Web3connect />
              <LanguageSelector />
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    );
  }
}

export default withRouter(withTranslation()(TopBar));
