import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import QRCode from "qrcode.react";
//material-ui
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
//icons
import GetApp from "@mui/icons-material/GetApp";
import Image from "@mui/icons-material/Image";

class AccountExport extends Component {
  state = {
    dialogQr: false,
    dialogDownload: false,
    revealQr: false,
  };

  getPrivateKey = () => {
    const element = document.createElement("a");
    const file = new Blob(["asdfasdfasdf"], { type: "text/plain;charset=utf-8" });
    element.href = URL.createObjectURL(file);
    element.download = "cryptochefs.txt";
    document.body.appendChild(element);
    element.click();
  };
  handleDialogQrOpen = () => {
    this.setState({ dialogQr: true });
  };
  handleDialogQrClose = () => {
    this.setState({
      dialogQr: false,
      revealQr: false,
    });
  };
  handleDialogDownloadOpen = () => {
    this.setState({ dialogDownload: true });
  };
  handleDialogDownloadClose = () => {
    this.setState({ dialogDownload: false });
  };
  revealQr = () => {
    this.setState({ revealQr: true });
  };

  render() {
    const { t } = this.props;

    return (
      <Box p={2}>
        <Box mb={4}>
          <Typography variant="h2" gutterBottom>
            Download
          </Typography>
          <Typography variant="body2" gutterBottom>
            {t("wallet.exportTooltip")}
          </Typography>
          <Button color="primary" variant="outlined" startIcon={<GetApp />} onClick={this.handleDialogDownloadOpen}>
            {t("wallet.exportPrivateKey")}
          </Button>
        </Box>
        <Box mb={4}>
          <Typography variant="h2" gutterBottom>
            {t("wallet.showQRButton")}
          </Typography>
          <Typography variant="body2" gutterBottom>
            {t("wallet.exportQRTooltip")}
          </Typography>
          <Button color="primary" variant="outlined" startIcon={<Image />} onClick={this.handleDialogQrOpen}>
            {t("wallet.showQRButton")}
          </Button>
        </Box>

        <Dialog onClose={this.handleDialogQrClose} aria-labelledby="dialogInfo" open={this.state.dialogQr}>
          <DialogContent>
            <Typography variant="h2" gutterBottom>
              {t("base.qrCode")}
            </Typography>
            {this.state.revealQr ? (
              <QRCode value="asdfasdf" size={600} bgColor="#FFFFFF" fgColor="#000000" />
            ) : (
              <Typography variant="body2" gutterBottom>
                {t("wallet.exportQRExposeConfirm")}
              </Typography>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleDialogQrClose} color="primary">
              {t("base.close")}
            </Button>
            <Button onClick={this.revealQr} color="primary" variant="contained" autoFocus disabled={this.state.revealQr}>
              {t("wallet.exportQRReveal")}
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog onClose={this.handleDialogDownloadClose} aria-labelledby="dialogInfo" open={this.state.dialogDownload}>
          <DialogContent>
            <Typography variant="h2" gutterBottom>
              {t("wallet.exportPKmsgTitle")}
            </Typography>
            <Typography variant="body2" gutterBottom>
              {t("wallet.exportPKmsgDescription")}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleDialogDownloadClose} color="primary">
              {t("base.cancel")}
            </Button>
            <Button onClick={this.getPrivateKey} color="primary" variant="contained" autoFocus>
              {t("base.confirm")}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    );
  }
}

export default withTranslation()(AccountExport);
