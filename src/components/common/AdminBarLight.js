import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import { withRouter, Link } from "react-router-dom";
import Blockies from "react-blockies";
//material-ui
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Avatar from "@material-ui/core/Avatar";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Tooltip from "@material-ui/core/Tooltip";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
// icons
import People from "@material-ui/icons/People";
import Flip from "@material-ui/icons/Flip";
import EventNote from "@material-ui/icons/EventNote";
import Home from "@material-ui/icons/Home";
import Settings from "@material-ui/icons/Settings";
//custom
import CopyButton from "./CopyButton";

const links = [
  { name: "Admin", icon: <Home />, path: "admin", description: "Admin console" },
  { name: "Settings", icon: <Settings />, path: "settings", description: "General settings" },
  { name: "Agenda", icon: <EventNote />, path: "agenda", description: "Setup agenda and launch ballots" },
  { name: "Participants", icon: <People />, path: "participants", description: "Manage and accredit participants" },
  { name: "Front view", icon: <Flip />, path: "overview", description: "View as participant" },
];

class AdminBarLight extends Component {
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
    const { t, assembly, admin, chain } = this.props;
    const { popover } = this.state;

    return admin ? (
      <React.Fragment>
        <Hidden smDown>
          <ButtonGroup color="secondary" size="large">
            {links.map((item, index) => (
              <Tooltip key={index} title={item.name}>
                <Button component={Link} to={"/" + chain + "/assembly/" + assembly + "/" + item.path}>
                  {item.icon}
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
              {assembly && assembly.length === 42 && (
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <Blockies seed={assembly} size={10} scale={4} className="blockies" />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    secondary={
                      <Typography variant="body2" noWrap>
                        {assembly}
                      </Typography>
                    }
                    primary={t("base.currentAssembly")}
                  />
                  <ListItemSecondaryAction>
                    <CopyButton text={assembly} />
                  </ListItemSecondaryAction>
                </ListItem>
              )}
              {links.map((item, index) => (
                <ListItem
                  key={index}
                  button
                  component={Link}
                  to={"/" + chain + "/assembly/" + assembly + "/" + item.path}
                  onClick={this.handleConnectionMenuClose}
                >
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
      </React.Fragment>
    ) : (
      <></>
    );
  }
}

export default withRouter(withTranslation()(AdminBarLight));
