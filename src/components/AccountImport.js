import React, { Component, Suspense } from "react";
import { withTranslation } from "react-i18next";
import { withSnackbar } from "notistack";
//material-ui
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
//icons
import CameraAlt from "@mui/icons-material/CameraAlt";
import Publish from "@mui/icons-material/Publish";
//custom
import LoadingSpinner from "./common/LoadingSpinner";
import ToastLoading from "./common/ToastLoading";
//lazy
const QrCamera = React.lazy(() => import("./common/QrCamera"));

class AccountImport extends Component {
  state = {
    dialogQr: false,
    dialogImport: false,
    privateKey: "",
    wallet_name: "digitalgv_wallet",
    wallet_secret: "SECRET",
  };

  handleDialogImportOpen = () => {
    this.setState({ dialogImport: true });
  };
  handleDialogImportClose = () => {
    this.setState({ dialogImport: false });
  };
  handleDialogQrOpen = () => {
    this.setState({ dialogQr: true });
  };
  handleDialogQrClose = () => {
    this.setState({ dialogQr: false });
  };
  qrStoreResult = (privateKey) => {
    this.setState({ privateKey });
  };
  importPrivateKey = () => {
    try {
      this.setState({
        privateKey: "",
        dialogImport: false,
      });
    } catch (error) {
      console.log(error);
      this.props.enqueueSnackbar("Error", {
        variant: "error",
        action: (snackKey) => <ToastLoading snackKey={snackKey} closeSnackbar={this.props.closeSnackbar} />,
      });
    }
  };

  loadWallet = async () => {

  };

  render() {
    const { t } = this.props;
    const { dialogQr, privateKey, dialogImport } = this.state;

    return (
      <Box p={2}>
        <Box mb={4}>
          <Typography variant="h2" gutterBottom>
            {t("wallet.importTitle")}
          </Typography>
          <Typography variant="body2" gutterBottom>
            {t("wallet.importDescription")}
          </Typography>
          <TextField
            label={t("wallet.fieldPrivateKey")}
            type="text"
            value={privateKey}
            onChange={(e) => this.setState({ privateKey: e.target.value })}
            placeholder={t("wallet.fieldPrivateKeyPlaceholder")}
            variant="outlined"
            fullWidth
            multiline
            margin="normal"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Button color="primary" variant="contained" disabled={!privateKey} startIcon={<Publish />} onClick={this.handleDialogImportOpen}>
                    {t("wallet.importPrivateKey")}
                  </Button>
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Box mb={4}>
          <Typography variant="h2" gutterBottom>
            {t("wallet.importScanQRTitle")}
          </Typography>
          <Typography variant="body2" gutterBottom>
            {t("wallet.importScanQRDescription")}
          </Typography>
          <Button color="primary" variant="outlined" startIcon={<CameraAlt />} onClick={this.handleDialogQrOpen}>
            {t("wallet.importScanQRButton")}
          </Button>
        </Box>

        <Dialog onClose={this.handleDialogQrClose} aria-labelledby="dialogInfo" open={dialogQr} fullWidth>
          <DialogContent>
            <Typography variant="h2">{t("wallet.importScanQRButton")}</Typography>
            <Suspense fallback={<LoadingSpinner />}>
              <QrCamera qrStoreResult={this.qrStoreResult} />
            </Suspense>
            <Typography variant="body2">
              {t("wallet.importScanQRResult")} {privateKey}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleDialogQrClose} color="primary" autoFocus>
              {t("base.close")}
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog onClose={this.handleDialogImportClose} aria-labelledby="dialogInfo" open={dialogImport}>
          <DialogContent>
            <Typography variant="h2" gutterBottom>
              {t("base.confirm")}
            </Typography>
            <Typography variant="body2" gutterBottom>
              {t("wallet.importConfirmDescription")}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleDialogImportClose} color="primary">
              {t("base.cancel")}
            </Button>
            <Button onClick={this.importPrivateKey} color="primary" variant="contained" autoFocus>
              {t("base.confirm")}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    );
  }
}

export default withTranslation()(withSnackbar(AccountImport));
