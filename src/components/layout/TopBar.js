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
import Hidden from "@mui/material/Hidden";
import IconButton from "@mui/material/IconButton";
import Stack from '@mui/material/Stack'
// icons
import People from "@mui/icons-material/People";
import EventNote from "@mui/icons-material/EventNote";
import Settings from "@mui/icons-material/Settings";
//custom
//import OfflineInfo from "./OfflineInfo";  // deactivated for the time being
import Web3connect from "./Web3connect";
import LanguageSelector from "./LanguageSelector";
import LogoButton from "../common/LogoButton";
import { Typography } from '@mui/material'

const links = [
  { name: "Store", icon: <Settings />, disabled: false, path: "/", description: "Buy Aroma and CHEF" },
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
        <Toolbar>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <LogoButton />
              <Button color="inherit" size="large" component={Link} to="/">
                {t("base.title")}
              </Button>
            </Grid>
            <Grid item xs container justifyContent="right" alignItems="center">
              <Grid item>
                <Hidden smDown>
                  <Stack spacing={1} direction="row" mr={4}>
                    {links.map((item, index) => (
                      <Tooltip key={index} title={item.description}>
                        <Button elongatedWidth={!item.disabled} color="tertiary" variant="contained" disabled={item.disabled} component={Link} to={item.path}>
                          {item.name}
                          {item.disabled &&
                            <Typography pl={.5} color="purple" fontWeight="bold" sx={{ fontSize: "0.65rem" }}>
                              soon
                            </Typography>
                          }
                        </Button>
                      </Tooltip>
                    ))}
                  </Stack>
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
          </Grid>
        </Toolbar>
      </AppBar>
    );
  }
}

export default withRouter(withTranslation()(TopBar));
