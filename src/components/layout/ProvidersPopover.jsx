import { withTranslation } from "react-i18next";
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
import providersList from "../../web3/connectorsList";
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
const ProviderIcon = ({ providerKey, ...rest }) => {
  const icons = {
    WalletMetaMaskIcon: WalletMetaMaskIcon,
    WalletWalletConnectIcon: WalletWalletConnectIcon,
    WalletLedgerIcon: WalletLedgerIcon,
  };
  const TheIcon = icons[providersList[providerKey]?.icon];

  // early return, if not valid function component
  if (typeof TheIcon !== "function") return null;

  return <TheIcon {...rest} />;
};

/**
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
function ProvidersPopover(props) {
  const { t, tReady, closePopover, ...rest } = props;

  const { active, error, activateBrowserWallet } = useEthers();

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
   * Activates a new provider by its key
   *
   * @param providerKey
   */
  const handleProviderButtonClick = async (providerKey) => {
    if (isCurrentProvider(providerKey)) {
      return;
    }
    setActivatingProvider(providerKey);

    // hard code injected provider for the time being
    activateBrowserWallet();

    closePopover();
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

  return (
    <Popover {...rest}>
      <Box pt={2} pb={3} px={3} maxWidth="350px">
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
              {/* the fragment is added due to Tooltip complaining when button is disabled */}
              <>
                <LoadingButton
                  fullWidth
                  disableElevation
                  variant={isCurrentProvider(key) ? "contained" : "outlined"}
                  size="large"
                  sx={{ paddingX: 8 }}
                  color={isCurrentProvider(key) ? "success" : "primary"}
                  startIcon={<ProviderIcon providerKey={key} />}
                  alignedstarticon="align"
                  endIcon={isCurrentProvider(key) ? <Check /> : null}
                  loading={handleProviderButtonLoadingProp(key)}
                  disabled={handleProviderButtonDisabledProp(key)}
                  onClick={() => handleProviderButtonClick(key)}
                >
                  {providersList[key].name}
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
              </>
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
