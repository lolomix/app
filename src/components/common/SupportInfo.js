import React, { Component, Fragment } from "react";
import { withTranslation } from "react-i18next";
import { Link } from "react-router-dom";
//material-ui
import Tooltip from "@material-ui/core/Tooltip";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import Popover from "@material-ui/core/Popover";
import Backdrop from "@material-ui/core/Backdrop";
//icons
import HelpIcon from "@material-ui/icons/HelpOutline";
import EmailIcon from "@material-ui/icons/Email";
import InfoIcon from "@material-ui/icons/Info";
import QuestionAnswerIcon from "@material-ui/icons/QuestionAnswer";
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
