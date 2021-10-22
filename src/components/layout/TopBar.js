import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import { withRouter, Link } from "react-router-dom";
//material-ui
import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import ListItemIcon from "@mui/material/ListItemIcon";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import Hidden from "@mui/material/Hidden";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
// icons
import People from "@mui/icons-material/People";
import EventNote from "@mui/icons-material/EventNote";
import Settings from "@mui/icons-material/Settings";
//custom
//import OfflineInfo from "./OfflineInfo";  // deactivated for the time being
import Web3connect from "./Web3connect";
import LanguageSelector from "./LanguageSelector";
import Logo from "../common/Logo";
import LogoText from "../common/LogoText";

const links = [
  { name: "Store", icon: <Settings />, disabled: false, path: "/store", description: "Buy Aroma and CHEF" },
  { name: "Kitchen", icon: <EventNote />, disabled: true, path: "/kitchen", description: "Create your own recipe" },
  { name: "Buffet", icon: <People />, disabled: true, path: "/buffet", description: "Order and enjoy your meal" },
];

class TopBar extends Component {
  state = {
    popover: false,
  };
  handleConnectionIconClick = () => {
    this.setState({ popover: true });
  };
  handleConnectionMenuClose = () => {
    this.setState({ popover: false });
  };
  render() {
    const { t } = this.props;
    const { popover } = this.state;

    return (
      <AppBar elevation={0} position="static">
        <Toolbar variant="large">
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item xs={6} md={4} container justifyContent="left" alignItems="center">
              <Grid item xs="auto">
                <Logo />
              </Grid>
              <Grid item xs>
                <LogoText />
              </Grid>
            </Grid>
            <Grid item xs={6} md={8} container justifyContent="right" alignItems="center">
              <Grid item>
                <Hidden mdDown>
                  <Stack spacing={1} direction="row" mr={4}>
                    {links.map((item, index) => (
                      <Tooltip key={index} title={item.description}>
                        <span>
                          <Button
                            elongatedwidth={item.disabled ? "false" : "true"}
                            color="tertiary"
                            variant="contained"
                            disabled={item.disabled}
                            component={Link}
                            to={item.path}>
                            {item.name}
                            {item.disabled && (
                              <Typography pl={0.5} color="purple" fontWeight="bold" sx={{ fontSize: "0.65rem" }}>
                                soon
                              </Typography>
                            )}
                          </Button>
                        </span>
                      </Tooltip>
                    ))}
                  </Stack>
                </Hidden>
                <Hidden mdUp>
                  <Tooltip title={t("base.navigation")}>
                    <IconButton color="tertiary" onClick={this.handleConnectionIconClick}>
                      <Settings />
                    </IconButton>
                  </Tooltip>
                  <Dialog onClose={this.handleConnectionMenuClose} aria-labelledby="navigation" open={popover}>
                    <DialogTitle id="navigation">{t("base.navigation")}</DialogTitle>
                    <DialogContent>
                      <List dense>
                        {links.map((item, index) => (
                          <ListItem key={index} button component={Link} disabled={item.disabled} to={item.path} onClick={this.handleConnectionMenuClose}>
                            <ListItemIcon color="primary">{item.disabled ? "soon" : item.icon}</ListItemIcon>
                            <ListItemText primary={item.name} secondary={item.description} />
                          </ListItem>
                        ))}
                      </List>
                    </DialogContent>
                    <DialogActions>
                      <Button disableElevation color="primary" variant="contained" onClick={this.handleConnectionMenuClose}>
                        {t("base.close")}
                      </Button>
                    </DialogActions>
                  </Dialog>
                </Hidden>
              </Grid>
              <Grid item>
                <Web3connect />
                <LanguageSelector />
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    );
  }
}

export default withRouter(withTranslation()(TopBar));
