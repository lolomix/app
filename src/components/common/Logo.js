import React from "react";
import { withTranslation } from "react-i18next";
// material-ui
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import ButtonBase from '@mui/material/ButtonBase';
// assets
import logo from "../../assets/logo.png";

/**
 * @param t
 * @returns {JSX.Element}
 * @constructor
 */
function Logo ({ t }) {
  return (
    <Tooltip disableFocusListener
             title={t("base.titleTooltip")}
             aria-label={t("base.titleTooltip")}
    >
      <ButtonBase disableRipple href="/">
        <Avatar sx={{ height: "65px", width: "65px"}} alt="CryptoChefs logo" src={logo} />
      </ButtonBase>
    </Tooltip>
  );
}

export default withTranslation()(Logo);
