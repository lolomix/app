import React, { Component, Suspense } from "react";
import { withTranslation } from "react-i18next";
import { Link } from "react-router-dom";
//material-ui
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Tooltip from "@mui/material/Tooltip";
//icons
import CameraAlt from "@mui/icons-material/CameraAlt";
//custom
import LoadingSpinner from "./common/LoadingSpinner";
//lazy
const QrCamera = React.lazy(() => import("./common/QrCamera"));

class MainJoin extends Component {
  state = {
    dialogQr: false,
    assembly: "",
    chain: "demo",
  };

  handleDialogQrOpen = () => {
    this.setState({ dialogQr: true });
  };
  handleDialogQrClose = () => {
    this.setState({
      dialogQr: false,
    });
  };
  qrStoreResult = (assembly) => {
    this.setState({ assembly });
  };
  checkValidAssembly = () => {
  };
  handleChange = (event) => {
    this.setState({ chain: event.target.value });
  };

  render() {
    const { t } = this.props;
    const { assembly, dialogQr, chain } = this.state;

    return (
      <Box p={2}>
        <Typography variant="h2" gutterBottom>
          {t("main.joinAssemblyTitle")}
        </Typography>
        <form noValidate autoComplete="off">
          <TextField
            id="outlined-password-input"
            label={t("main.eventCode")}
            type="text"
            autoComplete="eventid"
            placeholder={t("main.eventCodePlaceholder")}
            variant="outlined"
            margin="normal"
            fullWidth
            helperText={t("main.eventCodeHelper")}
            value={assembly}
            onInput={(e) => this.setState({ assembly: e.target.value })}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Tooltip title="Select blockchain">
                    <Select labelId="blockchain" id="blockchain-select" value={chain} onChange={this.handleChange}>
                      <MenuItem value="demo">Demo</MenuItem>
                      <MenuItem value="goerli">Goerli</MenuItem>
                      <MenuItem value="main">Mainnet</MenuItem>
                    </Select>
                  </Tooltip>
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <Button color="primary" variant="contained" component={Link} to={"/demo/assembly/" + assembly} disabled={this.checkValidAssembly()} fullWidth>
                    {t("main.accessEvent")}
                  </Button>
                </InputAdornment>
              ),
            }}
          />
        </form>
        <Box my={4}>
          <Typography variant="h2" gutterBottom>
            {t("main.joinAssemblyQR")}
          </Typography>
          <Typography variant="body2" gutterBottom>
            {t("main.joinAssemblyQRBody")}
          </Typography>
          <Button color="primary" variant="outlined" startIcon={<CameraAlt />} onClick={this.handleDialogQrOpen}>
            {t("main.joinAssemblyQRButton")}
          </Button>
        </Box>

        <Dialog onClose={this.handleDialogQrClose} aria-labelledby="dialogInfo" open={dialogQr} fullWidth>
          <DialogContent>
            <Typography variant="h2">{t("wallet.importScanQRTitle")}</Typography>
            <Suspense fallback={<LoadingSpinner />}>
              <QrCamera qrStoreResult={this.qrStoreResult} />
            </Suspense>
            <Typography variant="body2">
              {t("wallet.importScanQRResult")} {assembly}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleDialogQrClose} color="primary" autoFocus>
              {t("base.close")}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    );
  }
}

export default withTranslation()(MainJoin);
