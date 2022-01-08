import { withTranslation } from 'react-i18next'
// material-ui
import {
  Box,
  Divider,
  Grid, IconButton, Popover, Stack,
  Tooltip, Typography,
} from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { Check, Close } from '@mui/icons-material'
// custom
import { useEagerConnect } from '../../web3/hooks'
import connectorsList from '../../web3/connectorsList'
import { NETWORKS, TARGET_CHAIN } from '../../web3/constants'
import { getErrorMessage } from '../../web3/errors'
import WalletMetaMaskIcon from '../icons/WalletMetaMaskIcon'
import WalletWalletConnectIcon from '../icons/WalletWalletConnectIcon'
import WalletLedgerIcon from '../icons/WalletLedgerIcon'
import { useState } from 'react'
import { useEthers } from '@usedapp/core'
import { UnsupportedChainIdError } from '@web3-react/core'

/**
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
function ConnectorsPopover(props) {
  const { t, closePopover, ...rest } = props

  const { connector, activate, error, chainId } = useEthers()
  const triedEager = useEagerConnect();

  const [activatingConnector, setActivatingConnector] = useState();

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

    closePopover()

    activate(newConnector).then(() => {
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
    <Popover {...rest}>
      <Box pt={2} pb={3} px={3} width="350px">
        <Grid container alignItems="center" mb={1}>
          <Grid item xs>
            <Typography variant="h5">
              {t("base.connectToMyWallet")}
            </Typography>
          </Grid>
          <Grid item xs={1}>
            <Tooltip title="Close Menu">
              <IconButton onClick={closePopover} aria-label="Close Popover">
                <Close />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>

        <Divider sx={{ mb: 3 }} />

        <Stack spacing={2}>
          {Object.keys(connectorsList).map((key) => (
            <Tooltip
              key={key}
              title={t(isCurrentConnector(key) ? "base.connectedWith" : "base.connectWith", {
                connector: connectorsList[key].name
              })}
            >
                <LoadingButton
                  fullWidth
                  disableElevation
                  variant={(isCurrentConnector(key) && !isUnsupportedNetwork(error)) ? "contained" : "outlined"}
                  size="large"
                  color={isCurrentConnector(key) ? "success" : "primary"}
                  startIcon={<ConnectorIcon connectorkey={key} />}
                  alignedStartIcon
                  endIcon={(isCurrentConnector(key) && !isUnsupportedNetwork(error)) ? <Check /> : null}
                  loading={handleConnectorButtonLoadingProp(key)}
                  disabled={handleConnectorButtonDisabledProp(key)}
                  onClick={() => handleConnectorButtonClick(key)}
                >
                  {(isCurrentConnector(key) && isUnsupportedNetwork(error)) ? `Switch to ${NETWORKS[TARGET_CHAIN].name}` : connectorsList[key].name}
                  {connectorsList[key].soon && (
                    <Typography pl={0.5} fontWeight="bold" sx={{ fontSize: "0.65rem" }}>
                      SOON
                    </Typography>
                  )}
                </LoadingButton>
            </Tooltip>
          ))}

          {error && (
            <Typography variant="body2" color="error">
              {getErrorMessage(error)}
            </Typography>
          )}
        </Stack>
      </Box>
    </Popover>
  )
}

export default withTranslation()(ConnectorsPopover)