import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import { withRouter, Link } from "react-router-dom";
import Blockies from "react-blockies";
//material-ui
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Avatar from "@mui/material/Avatar";
import ListItemIcon from "@mui/material/ListItemIcon";
import Tooltip from "@mui/material/Tooltip";
import Hidden from "@mui/material/Hidden";
import IconButton from "@mui/material/IconButton";
// icons
import People from "@mui/icons-material/People";
import Flip from "@mui/icons-material/Flip";
import EventNote from "@mui/icons-material/EventNote";
import Home from "@mui/icons-material/Home";
import Settings from "@mui/icons-material/Settings";
//custom
import CopyButton from "./CopyButton";

const links = [
  { name: "Start", icon: <Home />, path: "start", description: "Admin console" },
  { name: "Store", icon: <Settings />, path: "store", description: "General settings" },
  { name: "Kitchen", icon: <EventNote />, path: "kitchen", description: "Setup agenda and launch ballots" },
  { name: "Buffet", icon: <People />, path: "buffet", description: "Manage and accredit participants" },
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
    const { t } = this.props;
    const { popover } = this.state;

    return (
      <React.Fragment>
        <Hidden smDown>
          <ButtonGroup color="secondary" size="large">
            {links.map((item, index) => (
              <Tooltip key={index} title={item.name}>
                <Button component={Link} to={"/assembly/" + item.path}>
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

                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <Blockies seed="asdf" size={10} scale={4} className="blockies" />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    secondary={
                      <Typography variant="body2" noWrap>
                        "asdf"
                      </Typography>
                    }
                    primary={t("base.currentAssembly")}
                  />
                  <ListItemSecondaryAction>
                    <CopyButton text="asdf" />
                  </ListItemSecondaryAction>
                </ListItem>
              )}
              {links.map((item, index) => (
                <ListItem
                  key={index}
                  button
                  component={Link}
                  to={"/assembly/" + item.path}
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
    );
  }
}

export default withRouter(withTranslation()(AdminBarLight));
