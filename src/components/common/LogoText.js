import React from "react";
import { withTranslation } from "react-i18next";
// material-ui
import Tooltip from "@mui/material/Tooltip";
import ButtonBase from '@mui/material/ButtonBase';
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
      <ButtonBase sx={{ maxWidth:"170px", paddingTop: "8px" }} disableRipple href="/">
        <img style={{ width: "100%" }} alt="CryptoChefs logo" src={logoText} />
      </ButtonBase>
    </Tooltip>
  );
}

export default withTranslation()(LogoText);
