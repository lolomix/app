import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import { CopyToClipboard } from "react-copy-to-clipboard";
//material-ui
import Button from "@mui/material/Button";
//icons
import FileCopyIcon from "@mui/icons-material/FileCopy";
import CheckIcon from "@mui/icons-material/Check";

class CopyButton extends Component {
  state = {
    success: null
  };

  handleCopyClick = () => {
    if (!this.state.success) {
      this.setState({ success: true }, () => {
        this.timer = setTimeout(() => {
          this.setState({ success: false });
        }, 800);
      });
    }
  };

  render() {    
    return (
        <CopyToClipboard
          text={this.props.text}
          onCopy={this.handleCopyClick}
        >
          <Button 
            variant="outlined" 
            color="primary"
            startIcon={
              this.state.success ? (
              <CheckIcon fontSize="small" />
              ) : (
              <FileCopyIcon fontSize="small" />
            )}
          >
            {this.props.buttonText}
          </Button>
        </CopyToClipboard>
    );
  }
}

export default withTranslation()(CopyButton);
