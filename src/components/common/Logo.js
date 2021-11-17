import React from "react";
import {Link} from 'react-router-dom'
import { withTranslation } from "react-i18next";
// material-ui
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
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
        <Button disableRipple component={Link} to='/'>
          <Avatar sx={{ height: "65px", width: "65px"}} variant="rounded" alt="CryptoChefs logo" src={logo} />
        </Button>
    </Tooltip>
  );
}

export default withTranslation()(Logo);
