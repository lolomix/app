import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import logo from "../../assets/logo.png";

class LogoButton extends Component {
  state = {
    animation: true,
  };
  animate = () => {
    this.setState({
      animation: false,
    });
    window.clearTimeout(this.timeout);
    this.timeout = window.setTimeout(() => {
      this.setState({ animation: true });
    }, 100);
  };

  render() {
    const { t } = this.props;

    return (
      <Tooltip disableFocusListener title={t("base.titleTooltip")} aria-label={t("base.titleTooltip")}>
        <IconButton color="inherit" component={Link} to="/">
          <Avatar alt={t("base.titleTooltip")} src={logo} />
        </IconButton>
      </Tooltip>
    );
  }
}

export default withTranslation()(LogoButton);
