import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import SvgIcon from "@mui/material/SvgIcon";
import Tooltip from "@mui/material/Tooltip";

class LogoButton extends Component {
  state = {
    animation: true
  };
  animate = () => {
    this.setState({
      animation: false
    });
    window.clearTimeout(this.timeout);
    this.timeout = window.setTimeout(() => {
      this.setState({ animation: true });
    }, 100);
  };

  render() {
    const {t} = this.props;

    return (
      <Tooltip disableFocusListener title={t("base.titleTooltip")} aria-label={t("base.titleTooltip")} >
        <IconButton
          color="inherit"
          className={this.state.animation ? "logoanimated" : ""}
          component={Link}
          to="/"
          onClick={this.animate}
        >
          <SvgIcon>
            <rect
              x="3.05"
              y="15.18"
              width="18.31"
              height="1.77"
              transform="translate(-3.37 3.24) rotate(-13.32)"
            />
            <rect
              x="14.79"
              y="0.34"
              width="4.42"
              height="12.36"
              transform="translate(-1.05 4.09) rotate(-13.32)"
            />
            <rect
              x="8.08"
              y="1.97"
              width="4.42"
              height="12.36"
              transform="translate(-1.6 2.59) rotate(-13.32)"
            />
            <rect
              x="1.36"
              y="3.55"
              width="4.42"
              height="12.36"
              transform="translate(-2.15 1.09) rotate(-13.32)"
            />
            <path d="M4,20A10.4,10.4,0,0,0,14,23.82a10.4,10.4,0,0,0,7.42-7.94Z" />
          </SvgIcon>
        </IconButton>
      </Tooltip>
    );
  }
}

export default withTranslation()(LogoButton);
