import React from "react";
import { Link } from "react-router-dom";
import { withTranslation } from "react-i18next";
// material-ui
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
// assets
import logo from "../../assets/logoWithWhiteText.png";

/**
 * @param t
 * @returns {JSX.Element}
 * @constructor
 */
function Logo({ t }) {
  return (
    <Tooltip
      disableFocusListener
      title={t("base.titleTooltip")}
      aria-label={t("base.titleTooltip")}
    >
      <Button disableRipple component={Link} to="/">
        <img style={{ height: "65px" }} alt="CryptoChefs logo" src={logo} />
      </Button>
    </Tooltip>
  );
}

export default withTranslation()(Logo);
