import React from "react";
import {Link} from 'react-router-dom'
import { withTranslation } from "react-i18next";
// material-ui
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
// assets
import logoText from '../../assets/logo-text.svg'

/**
 * @param t
 * @returns {JSX.Element}
 * @constructor
 */
function LogoText ({ t }) {
  return (
    <Tooltip disableFocusListener
             title={t("base.titleTooltip")}
             aria-label={t("base.titleTooltip")}
    >
        <Button sx={{ maxWidth:"170px", paddingTop: "8px" }} disableRipple component={Link} to='/'>
          <img style={{ width: "100%" }} alt="CryptoChefs logo" src={logoText} />
        </Button>
    </Tooltip>
  );
}

export default withTranslation()(LogoText);
