import React, { Component, Suspense } from "react";
import { withTranslation } from "react-i18next";
import { withSnackbar } from "notistack";
//material-ui
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
//icons
import CameraAlt from "@material-ui/icons/CameraAlt";
import Publish from "@material-ui/icons/Publish";
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
