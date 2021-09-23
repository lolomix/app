import React, { Component, Fragment } from "react";
import { withTranslation } from "react-i18next";
import { Link } from "react-router-dom";
//material-ui
import Tooltip from "@mui/material/Tooltip";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Popover from "@mui/material/Popover";
import Backdrop from "@mui/material/Backdrop";
//icons
import HelpIcon from "@mui/icons-material/HelpOutline";
import EmailIcon from "@mui/icons-material/Email";
import InfoIcon from "@mui/icons-material/Info";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
//custom
import pkg from "../../../package.json";

class SupportInfo extends Component {
  state = {
    popover: null,
  };

  handleConnectionIconClick = (event) => {
    this.setState({ popover: event.currentTarget });
  };
  handlepopoverClose = () => {
    this.setState({ popover: null });
  };

  render() {
    const { t } = this.props;

    return (
      <Fragment>
        <Tooltip disableFocusListener title={t("base.help")} aria-label={t("base.help")}>
          <IconButton color="inherit" onClick={this.handleConnectionIconClick}>
            <HelpIcon />
          </IconButton>
        </Tooltip>
        <Backdrop open={Boolean(this.state.popover)} className="backdropZindex">
          <Popover id="settings-menu" open={Boolean(this.state.popover)} anchorEl={this.state.popover} onClose={this.handlepopoverClose}>
            <Paper className="defaultpadding">
              <List dense>
                <ListItem button component={Link} to="/howitworks" onClick={this.handlepopoverClose}>
                  <ListItemIcon>
                    <QuestionAnswerIcon />
                  </ListItemIcon>
                  <ListItemText primary={t("base.supportQa")} secondary={t("base.supportQaDescription")} />
                </ListItem>
                <ListItem button component="a" href="mailto:info@cryptochefs.io">
                  <ListItemIcon>
                    <EmailIcon />
                  </ListItemIcon>
                  <ListItemText primary="info@cryptochefs.io" secondary="Email Support" />
                </ListItem>
                <ListItem button component={Link} to="/releasenotes">
                  <ListItemIcon color="primary">
                    <InfoIcon />
                  </ListItemIcon>
                  <ListItemText primary={"v" + pkg.version} secondary="Click to see release notes" />
                </ListItem>
              </List>
              <Button color="primary" variant="outlined" onClick={this.handlepopoverClose}>
                {t("base.close")}
              </Button>
            </Paper>
          </Popover>
        </Backdrop>
      </Fragment>
    );
  }
}

export default withTranslation()(SupportInfo);
