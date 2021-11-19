import React, { useState, Fragment } from 'react'
import { withTranslation } from 'react-i18next'
import Blockies from 'react-blockies'
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core'
//mui
import {
  Tooltip,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Button,
  Avatar,
  IconButton,
  Box,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Grid,
} from '@mui/material'
import {
  AccountBalanceWallet,
  Check,
  Warning,
} from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
//custom
import connectorsList from '../../web3/connectorsList'
import { getErrorMessage } from '../../web3/errors'
import { useEagerConnect } from '../../web3/hooks'
import Balance from '../web3/Balance'
import NftList from '../web3/NftList'
import AromaBalance from '../web3/AromaBalance'
import { NETWORKS, TARGET_CHAIN } from '../../web3/constants'
import WalletMetaMaskIcon from '../icons/WalletMetaMaskIcon'
import WalletLedgerIcon from '../icons/WalletLedgerIcon'
import WalletWalletConnectIcon from '../icons/WalletWalletConnectIcon'
import IconButtonVerifyExplorer from '../web3/IconButtonVerifyExplorer'
import IconButtonCopy from '../IconButtonCopy'

function Web3connect(props) {
  const { t } = props;

  const Web3Context = useWeb3React();
  const triedEager = useEagerConnect();
  const { connector, account, activate, deactivate, active, error, chainId } = Web3Context;

  const [activatingConnector, setActivatingConnector] = useState();
  const [connectionMenu, setConnectionMenu] = useState(false);
  const [dialogWeb3, setDialogWeb3] = useState(false);

  /**
   * Prettifies an ethereum address for presentation.
   * @type {function(*): string}
   *
   * @todo refactor this to a global helper
   */
  const prettifyAccountAddress = (address) => `${address.slice(0, 6)}...${address.slice(-4)}`;

  const handleConnectionMenu = () => {
    setConnectionMenu(!connectionMenu);
  };

  const handleWeb3Modal = () => {
    setConnectionMenu(false);
    setDialogWeb3((dialogWeb3) => !dialogWeb3);
  };

  const loadWeb3Modal = () => {
    setDialogWeb3((dialogWeb3) => !dialogWeb3);
  };

  /**
   * Identifies the current connector by key
   *
   * @param connectorkey
   * @returns {boolean}
   */
  const isCurrentConnector = (connectorkey) => connectorsList[connectorkey]?.connector === connector;

  /**
   * @param error
   * @returns {boolean}
   */
  const isUnsupportedNetwork = (error) => error instanceof UnsupportedChainIdError

  /**
   * Activates a new connector by its key
   *
   * @param connectorkey
   */
  const handleConnectorButtonClick = async (connectorkey) => {
    const newConnector = connectorsList[connectorkey].connector
    setActivatingConnector(newConnector)
    activate(newConnector).then(() => {
      handleWeb3Modal()
      setActivatingConnector(undefined)
    })

    if (connectorkey === 'injected') { // only works for metamask
      if (chainId !== NETWORKS[TARGET_CHAIN].chainId) {
        try { // check if the chain to connect to is installed
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: NETWORKS[TARGET_CHAIN].chainIdHex }], // chainId must be in hexadecimal numbers
          })
        } catch (error) {
          if (error.code === 4902) {  // This error code indicates that the chain has not been added to MetaMask
            try {
              await window.ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [
                  {
                    chainId: NETWORKS[TARGET_CHAIN].chainIdHex,
                    blockExplorerUrls: NETWORKS[TARGET_CHAIN].blockExplorerUrls,
                    chainName: NETWORKS[TARGET_CHAIN].name,
                    nativeCurrency: NETWORKS[TARGET_CHAIN].nativeCurrency,
                    rpcUrls: NETWORKS[TARGET_CHAIN].rpcUrls
                  }
                ],
              })
            } catch (addError) {
              console.error(addError)
            }
          }
          console.error(error)
        }
      }
    }
  };

  /**
   * @param connectorkey
   * @returns {boolean}
   */
  const handleConnectorButtonLoadingProp = (connectorkey) => connectorsList[connectorkey].connector === activatingConnector;

  /**
   * @param connectorkey
   * @returns {boolean}
   */
  const handleConnectorButtonDisabledProp = (connectorkey) => {
    return !triedEager || !!activatingConnector || connectorsList[connectorkey].soon;
  };

  /**
   * @param props
   * @returns {JSX.Element}
   * @constructor
   */
  const ConnectorIcon = (props) => {
    const icons = {
      WalletMetaMaskIcon: WalletMetaMaskIcon,
      WalletWalletConnectIcon: WalletWalletConnectIcon,
      WalletLedgerIcon: WalletLedgerIcon,
    };
    const TheIcon = icons[connectorsList[props.connectorkey]?.icon];

    // early return, if not valid function component
    if (typeof TheIcon !== "function") return null;

    return <TheIcon {...props} />;
  };

  return (
    <Fragment>
      {!account ? (
        <Tooltip title={t("base.connectToYourWallet")}>
          <Button elongatedwidth="true"
                  color="primary"
                  variant="contained"
                  onClick={loadWeb3Modal}
                  startIcon={<AccountBalanceWallet />}
          >
            {t("base.connectWallet")}
          </Button>
        </Tooltip>
      ) : (
        <>
          <Tooltip disableFocusListener title={t("base.youraccount")} aria-label={t("base.youraccount")}>
            <IconButton color="inherit" onClick={handleConnectionMenu}>
              <Avatar>
                <Blockies seed={account.toLowerCase()} size={10} scale={4} className="blockies" />
              </Avatar>
            </IconButton>
          </Tooltip>
          <Dialog id="settings-menu" open={Boolean(connectionMenu)} onClose={handleConnectionMenu} maxWidth="md">
            <Box p={2}>
              <List dense>
                {account && (
                  <ListItem
                    secondaryAction={
                      <>
                      <IconButtonVerifyExplorer address={account} />
                      <IconButtonCopy copyText={account} />
                      </>
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
                        <Check color="tertiary" />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText secondary={TARGET_CHAIN.toUpperCase() + " network"} primary="Connection Established" />
                  </ListItem>
                ) : (
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar className="avatar-warning">
                        <Warning />
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
                <ListItem>
                  <ListItemText secondary={<NftList />} primary="Your CHEF NFTs" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Your CHEF NFTs will be revealed soon!" />
                </ListItem>
              </List>
              <Stack spacing={1} direction="row" justifyContent="center">
                <Button disableElevation color="primary" variant="contained" onClick={handleConnectionMenu}>
                  {t("base.close")}
                </Button>
                <Button color="primary" variant="outlined" onClick={handleWeb3Modal}>
                  Web3 Settings
                </Button>
              </Stack>
            </Box>
          </Dialog>
        </>
      )}
      <Dialog
        keepMounted
        onClose={handleWeb3Modal}
        open={dialogWeb3}
        scroll="paper"
        maxWidth="md"
        aria-labelledby="wallet-connectors-dialog-title"
        aria-describedby="wallet-connectors-dialog-description">
        <DialogTitle id="wallet-connectors-dialog-title">{t("base.connectToYourWallet")}</DialogTitle>
        <DialogContent>
          <Grid container spacing={3}>
            {Object.keys(connectorsList).map((key) => (
              <Grid item container alignContent="center" columnSpacing={3} rowSpacing={1} key={key}>
                <Grid item xs={2} sm={1}>
                  <Avatar sx={{ bgcolor: "white", border: "1px solid rgba(55, 16, 13, 0.5)" }}>
                    <ConnectorIcon connectorkey={key} />
                  </Avatar>
                </Grid>
                <Grid item xs={10} sm={5}>
                  <Tooltip
                    title={t(isCurrentConnector(key) ? "base.connectedWith" : "base.connectWith", {
                      connector: connectorsList[key].name,
                    })}>
                    <span>
                      <LoadingButton
                        fullWidth
                        disableElevation
                        variant={(isCurrentConnector(key) && !isUnsupportedNetwork(error)) ? "contained" : "outlined"}
                        size="large"
                        color={isCurrentConnector(key) ? "success" : "primary"}
                        startIcon={(isCurrentConnector(key) && !isUnsupportedNetwork(error)) ? <Check /> : null}
                        loading={handleConnectorButtonLoadingProp(key)}
                        disabled={handleConnectorButtonDisabledProp(key)}
                        onClick={() => handleConnectorButtonClick(key)}>
                        {(isCurrentConnector(key) && isUnsupportedNetwork(error)) ? `Switch to ${NETWORKS[TARGET_CHAIN].name}` : connectorsList[key].name}
                        {connectorsList[key].soon && (
                          <Typography pl={0.5} color="purple" fontWeight="bold" sx={{ fontSize: "0.65rem" }}>
                            soon
                          </Typography>
                        )}
                      </LoadingButton>
                    </span>
                  </Tooltip>
                </Grid>
                <Grid item xs={12} sm={6} container alignContent="center" id="wallet-connectors-dialog-description">
                  <Typography variant="body2">{connectorsList[key].description}</Typography>
                </Grid>
              </Grid>
            ))}
            {!!error && (
              <Grid item xs={12}>
                <Typography variant="h6" color="error">
                  {getErrorMessage(error)}
                </Typography>
              </Grid>
            )}
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

export default withTranslation()(Web3connect);
