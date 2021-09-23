import React, { Component, Fragment } from "react";

import Tooltip from "@mui/material/Tooltip";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Badge from "@mui/material/Badge";
import LanguageIcon from "@mui/icons-material/Language";
import IconButton from "@mui/material/IconButton";
import Backdrop from "@mui/material/Backdrop";
import { withTranslation } from "react-i18next";
import i18n from "./../../i18n";

class LanguageSelector extends Component {
  state = {
    languageMenu: null,
    locale: i18n.language,
  };

  handleLanguageIconClick = (event) => {
    this.setState({ languageMenu: event.currentTarget });
  };
  handleLanguageMenuClose = () => {
    this.setState({ languageMenu: null });
  };
  handleLangChange = (name) => (event) => {
    this.setState({ languageMenu: null });
    i18n.changeLanguage(name);
    this.setState({ locale: name });
  };

  render() {
    const { languageMenu } = this.state;
    const { t } = this.props;
    return (
      <Fragment>
        <Tooltip title={t("base.changelang")} aria-label={t("base.changelang")} disableFocusListener>
          <IconButton color="inherit" aria-owns={languageMenu ? "language-menu" : undefined} aria-haspopup="true" onClick={this.handleLanguageIconClick}>
            <Badge badgeContent={this.state.locale.substring(0, 2).toUpperCase()} color="default">
              <LanguageIcon />
            </Badge>
          </IconButton>
        </Tooltip>
        <Backdrop open={Boolean(languageMenu)} className="backdropZindex">
          <Menu id="language-menu" anchorEl={languageMenu} open={Boolean(languageMenu)} onClose={this.handleLanguageMenuClose}>
            <MenuItem onClick={this.handleLangChange("en")}>English</MenuItem>
            <MenuItem onClick={this.handleLangChange("de")}>Deutsch</MenuItem>
            <MenuItem onClick={this.handleLangChange("fr")}>Français</MenuItem>
            <MenuItem onClick={this.handleLangChange("it")}>Italiano</MenuItem>
          </Menu>
        </Backdrop>
      </Fragment>
    );
  }
}

export default withTranslation()(LanguageSelector);
