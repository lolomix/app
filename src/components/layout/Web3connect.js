import React, { useState, Fragment } from "react";
import { withTranslation } from "react-i18next";
import { withRouter } from "react-router-dom";
import Blockies from "react-blockies";
import { useWeb3React } from "@web3-react/core";
//import { useSnackbar } from "notistack";
//mui
import Tooltip from "@mui/material/Tooltip";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Stack from '@mui/material/Stack'
import Dialog from "@mui/material/Dialog";
import DialogTitle from '@mui/materialDialogTitle';
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import CheckIcon from '@mui/icons-material/Check';
import WarningIcon from '@mui/icons-material/Warning';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
//custom
import connectorsList from "../../web3/connectorsList";
import { getErrorMessage } from "../../web3/errors";
import { useEagerConnect } from "../../web3/hooks";
import Balance from "../web3/Balance";
import AromaBalance from "../web3/AromaBalance";
import { NETWORKS, TARGET_CHAIN } from "../../web3/constants";
import LoadingButton from '@mui/lab/LoadingButton'


//import ToastLoading from "../../components/notification/ToastLoading";
//import ToastLoadingIndeterminate from "../../components/notification/ToastLoadingIndeterminate";

function Web3connect(props) {
  const { t } = props;

  const Web3Context = useWeb3React();
  const triedEager = useEagerConnect();
  const { connector, account, activate, deactivate, active, error, chainId } = Web3Context;


  const [activatingConnector, setActivatingConnector] = useState();
  const [connectionMenu, setConnectionMenu] = useState(false);
  const [dialogWeb3, setDialogWeb3] = useState(false);
  // const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  /**
   * Prettifies an ethereum address for presentation.
   * @type {function(*): string}
   *
   * @todo refactor this to a global helper
   */
  const prettifyAccountAddress = address => `${address.slice(0, 6)}...${address.slice(-4)}`

  /**
   * Handles the copy to clipboard using Clipboard API OR regular method
   *
   * @todo refactor this to a global helper
   */
  const handleAccountCopyToClipboardIconClick = () => {
    // navigator clipboard api needs a secure context (https)
    if (navigator.clipboard && navigator.permissions) {
      navigator.clipboard.writeText(account.toLowerCase())
    } else if (document.queryCommandSupported('copy')) {
      const ele = document.createElement('textarea')
      ele.value = account.toLowerCase()
      document.body.appendChild(ele)
      ele.select()
      document.execCommand('copy')
      document.body.removeChild(ele)
    }
  };

  const handleConnectionIconClick = (event) => {
    setConnectionMenu(event.currentTarget);
  };

  const handleConnectionMenuClose = () => {
    setConnectionMenu(null);
  };

  const handleWeb3Modal = () => {
    setConnectionMenu(null);
    setDialogWeb3(dialogWeb3 => !dialogWeb3);
  };

  const loadWeb3Modal = () => {
    setDialogWeb3(dialogWeb3 => !dialogWeb3);
  };

  /**
   * Identifies the current connector by key
   *
   * @param connectorKey
   * @returns {boolean}
   */
  const isCurrentConnector = (connectorKey) =>
    connectorsList[connectorKey]?.connector === connector

  /**
   * Activates a new connector by its key
   *
   * @param connectorKey
   */
  const handleConnectorButtonClick = (connectorKey) => {
    const newConnector = connectorsList[connectorKey].connector

    setActivatingConnector(newConnector);
    activate(newConnector).then(() => {
      handleWeb3Modal()
      setActivatingConnector(undefined);
    });
  }

  /**
   * @param connectorKey
   * @returns {boolean}
   */
  const handleConnectorButtonLoadingProp = (connectorKey) =>
    connectorsList[connectorKey].connector === activatingConnector

  /**
   * @param connectorKey
   * @returns {boolean}
   */
  const handleConnectorButtonDisabledProp = (connectorKey) => {
    return (
      !triedEager ||
      !!activatingConnector ||
      !!error
    );
  }

  return (
    <Fragment>
      {!account ? (
        <Tooltip title={t("base.connectToYourWallet")}>
          <Button elongatedWidth color="secondary" variant="contained" onClick={loadWeb3Modal}>
            {t("base.connect")}
          </Button>
        </Tooltip>
      ) : (
        <>
          <Tooltip disableFocusListener title={t("base.youraccount")} aria-label={t("base.youraccount")}>
            <IconButton color="inherit" onClick={handleConnectionIconClick}>
              <Avatar>
                <Blockies seed={account.toLowerCase()} size={10} scale={4} className="blockies" />
              </Avatar>
            </IconButton>
          </Tooltip>
          <Popover id="settings-menu"
                   open={Boolean(connectionMenu)}
                   anchorEl={connectionMenu}
                   onClose={handleConnectionMenuClose}
                   anchorOrigin={{
                     vertical: 'bottom',
                     horizontal: 'right',
                   }}
          >
            <Box p={2}>
              <List dense>
                {account && (
                  <ListItem
                    secondaryAction={
                      <Tooltip title={t("base.copyToClipboard")}>
                        <IconButton onClick={handleAccountCopyToClipboardIconClick} edge="end" aria-label="copy">
                          <ContentCopyIcon />
                        </IconButton>
                      </Tooltip>
                    }>
                    <Tooltip disableFocusListener title={t("base.youraccount")}>
                      <ListItemAvatar>
                        <Avatar>
                          <Blockies seed={account.toLowerCase()} size={10} scale={4} className="blockies" />
                        </Avatar>
                      </ListItemAvatar>
                    </Tooltip>
                    <ListItemText secondary={prettifyAccountAddress(account.toLowerCase())} primary={t("base.yourAddress")} />
                  </ListItem>
                )}
                {chainId === NETWORKS[TARGET_CHAIN].chainId ? (
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar className="avatar-success">
                        <CheckIcon color="tertiary"/>
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText secondary={TARGET_CHAIN.toUpperCase() + ' network'} primary="Connection Established" />
                  </ListItem>
                ) : (
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar className="avatar-warning">
                        <WarningIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText secondary={"Please select " + TARGET_CHAIN.toUpperCase() + " in your wallet"} primary="WRONG NETWORK" />
                  </ListItem>
                )}
                <ListItem>
                  <ListItemText secondary={<AromaBalance />} primary="Your AROMA balance" />
                </ListItem>
                <ListItem>
                  <ListItemText secondary={<Balance />} primary="Your MATIC balance" />
                </ListItem>
              </List>
              <Stack spacing={1} direction="row" justifyContent="center">
                <Button disableElevation color="primary" variant="contained" onClick={handleConnectionMenuClose}>
                  {t("base.close")}
                </Button>
                <Button color="primary" variant="outlined" onClick={handleWeb3Modal}>
                  {t("base.settings")}
                </Button>
              </Stack>
            </Box>
          </Popover>
        </>
      )}
      <Dialog
        keepMounted
        onClose={handleWeb3Modal}
        open={dialogWeb3}
        scroll="paper"
        maxWidth="sm"
        aria-labelledby="wallet-connectors-dialog-title"
        aria-describedby="wallet-connectors-dialog-description"
      >
        <DialogTitle id="wallet-connectors-dialog-title">
          {t("base.connectToYourWallet")}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3} >
            {Object.keys(connectorsList).map((key) => (
              <Grid item container alignContent="center" columnSpacing={3} rowSpacing={1} key={key}>
                <Grid item xs={12} sm={5}>
                  <Tooltip title={
                    t(isCurrentConnector(key) ? 'base.connectedWith' : 'base.connectWith', {
                      connector: connectorsList[key].name
                      })
                  }>
                    <LoadingButton
                      fullWidth
                      disableElevation
                      variant={isCurrentConnector(key) ? "contained" : "outlined"}
                      size="large"
                      color={isCurrentConnector(key) ? "success" : "primary"}
                      startIcon={isCurrentConnector(key) ? <CheckIcon/> : <AccountBalanceWalletIcon />}
                      loading={handleConnectorButtonLoadingProp(key)}
                      disabled={handleConnectorButtonDisabledProp(key)}
                      onClick={() => handleConnectorButtonClick(key)}
                    >
                      {connectorsList[key].name}
                    </LoadingButton>
                  </Tooltip>
                </Grid>
                <Grid item xs={12} sm={7} container alignContent="center" id="wallet-connectors-dialog-description">
                  <Typography variant="body2">{connectorsList[key].description}</Typography>
                </Grid>
              </Grid>
            ))}
            {!!error &&
              <Grid item xs={12}>
                <Typography variant="h6" color="error">
                  {getErrorMessage(error)}
                </Typography>
              </Grid>
            }
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleWeb3Modal} disableElevation variant="contained" color="primary">
            {t("base.close")}
          </Button>
          {(active || error) && (
            <Button
              onClick={() => {
                deactivate();
              }}
              variant="outlined"
              color="primary">
              {t("base.deactivate")}
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}

export default withRouter(withTranslation()(Web3connect));
