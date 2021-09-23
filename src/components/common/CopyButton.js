import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import { CopyToClipboard } from "react-copy-to-clipboard";
//material-ui
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
//icons
import FileCopyIcon from "@mui/icons-material/FileCopy";
import CheckIcon from "@mui/icons-material/Check";

class CopyButton extends Component {
  state = {
    success: null,
  };

  handleCopyClick = () => {
    if (!this.state.success) {
      this.setState({ success: true }, () => {
        this.timer = setTimeout(() => {
          this.setState({ success: false });
        }, 1000);
      });
    }
  };

  render() {
    const { t } = this.props;

    return (
      <Tooltip title={this.state.success ? t("base.copied") : t("base.copyClipboard")}>
        <CopyToClipboard text={this.props.text} onCopy={this.handleCopyClick}>
          <IconButton aria-label="Copy">{this.state.success ? <CheckIcon fontSize="small" /> : <FileCopyIcon fontSize="small" />}</IconButton>
        </CopyToClipboard>
      </Tooltip>
    );
  }
}

export default withTranslation()(CopyButton);
