import { withTranslation } from "react-i18next";
// material-ui
import {
  Box,
  Divider,
  Grid,
  IconButton,
  Popover,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Check, Close } from "@mui/icons-material";
// custom
import providersList from "../../web3/connectorsList";
import { NETWORKS, TARGET_CHAIN } from "../../web3/constants";
import { getErrorMessage } from "../../web3/errors";
import WalletMetaMaskIcon from "../icons/WalletMetaMaskIcon";
import WalletWalletConnectIcon from "../icons/WalletWalletConnectIcon";
import WalletLedgerIcon from "../icons/WalletLedgerIcon";
import { useEffect, useState } from "react";
import { useEthers, useNetwork } from "@usedapp/core";

/**
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
function ProvidersPopover(props) {
  const { t, closePopover, ...rest } = props;

  const { active, error, chainId, activateBrowserWallet } = useEthers();

  const {
    network: { provider },
  } = useNetwork();

  const [activatingProvider, setActivatingProvider] = useState();

  /**
   * Identifies the current provider by key
   *
   * @param providerKey
   * @returns {boolean}
   */
  const isCurrentProvider = (providerKey) =>
    providersList[providerKey]?.isActive(provider);

  /**
   * @param error
   * @returns {boolean}
   */
  const isUnsupportedNetwork = (error) => error instanceof Error;

  /**
   * Activates a new provider by its key
   *
   * @param providerKey
   */
  const handleProviderButtonClick = async (providerKey) => {
    if (isCurrentProvider(providerKey)) {
      return;
    }

    setActivatingProvider(providerKey);
    closePopover();

    // hard code injected provider for the time being
    activateBrowserWallet();

    if (providerKey === "injected") {
      // only works for metamask
      if (chainId !== NETWORKS[TARGET_CHAIN].chainId) {
        try {
          // check if the chain to connect to is installed
          await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: NETWORKS[TARGET_CHAIN].chainIdHex }], // chainId must be in hexadecimal numbers
          });
        } catch (error) {
          if (error.code === 4902) {
            // This error code indicates that the chain has not been added to MetaMask
            try {
              await window.ethereum.request({
                method: "wallet_addEthereumChain",
                params: [
                  {
                    chainId: NETWORKS[TARGET_CHAIN].chainIdHex,
                    blockExplorerUrls: NETWORKS[TARGET_CHAIN].blockExplorerUrls,
                    chainName: NETWORKS[TARGET_CHAIN].name,
                    nativeCurrency: NETWORKS[TARGET_CHAIN].nativeCurrency,
                    rpcUrls: NETWORKS[TARGET_CHAIN].rpcUrls,
                  },
                ],
              });
            } catch (addError) {
              console.error(addError);
            }
          }
          console.error(error);
        }
      }
    }
  };

  /**
   * Clear activating provider if connection is active
   */
  useEffect(() => {
    setActivatingProvider((prevActivatingProvider) => {
      if (prevActivatingProvider) {
        return undefined;
      }
    });
  }, [active]);

  /**
   * @param providerKey
   * @returns {boolean}
   */
  const handleProviderButtonLoadingProp = (providerKey) =>
    providerKey === activatingProvider;

  /**
   * @param providerKey
   * @returns {boolean}
   */
  const handleProviderButtonDisabledProp = (providerKey) => {
    return !!activatingProvider || providersList[providerKey].soon;
  };

  /**
   * @param props
   * @returns {JSX.Element}
   * @constructor
   */
  const ProviderIcon = (props) => {
    const icons = {
      WalletMetaMaskIcon: WalletMetaMaskIcon,
      WalletWalletConnectIcon: WalletWalletConnectIcon,
      WalletLedgerIcon: WalletLedgerIcon,
    };
    const TheIcon = icons[providersList[props.providerKey]?.icon];

    // early return, if not valid function component
    if (typeof TheIcon !== "function") return null;

    return <TheIcon {...props} />;
  };

  return (
    <Popover {...rest}>
      <Box pt={2} pb={3} px={3} width="350px">
        <Grid container alignItems="center" mb={1}>
          <Grid item xs>
            <Typography variant="h5">{t("base.connectToMyWallet")}</Typography>
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
          {Object.keys(providersList).map((key) => (
            <Tooltip
              key={key}
              title={t(
                isCurrentProvider(key)
                  ? "base.connectedWith"
                  : "base.connectWith",
                {
                  provider: providersList[key].name,
                }
              )}
            >
              <LoadingButton
                fullWidth
                disableElevation
                variant={
                  isCurrentProvider(key) && !isUnsupportedNetwork(error)
                    ? "contained"
                    : "outlined"
                }
                size="large"
                color={isCurrentProvider(key) ? "success" : "primary"}
                startIcon={<ProviderIcon providerKey={key} />}
                alignedStartIcon
                endIcon={
                  isCurrentProvider(key) && !isUnsupportedNetwork(error) ? (
                    <Check />
                  ) : null
                }
                loading={handleProviderButtonLoadingProp(key)}
                disabled={handleProviderButtonDisabledProp(key)}
                onClick={() => handleProviderButtonClick(key)}
              >
                {isCurrentProvider(key) && isUnsupportedNetwork(error)
                  ? `Switch to ${NETWORKS[TARGET_CHAIN].name}`
                  : providersList[key].name}
                {providersList[key].soon && (
                  <Typography
                    pl={0.5}
                    fontWeight="bold"
                    sx={{ fontSize: "0.65rem" }}
                  >
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
  );
}

export default withTranslation()(ProvidersPopover);
