import { withTranslation } from "react-i18next";
import Blockies from "react-blockies";
import {
  getChainById,
  useEthers,
  useLocalStorage,
  useNetwork,
} from "@usedapp/core";
import {
  Avatar,
  Box,
  Button,
  List,
  ListItem,
  Tooltip,
  ListItemAvatar,
  ListItemText,
  Popover,
  Typography,
  IconButton,
  Divider,
  Grid,
} from "@mui/material";
import { Check, Settings } from "@mui/icons-material";
import VerifyExplorerIconButton from "../buttons/VerifyExplorerIconButton";
import IconButtonCopy from "../buttons/CopyIconButton";
import AddTokenToWalletButton from "../web3/AddTokenToWalletButton";
import { truncate } from "../../utils/formatters";
import { useChainWatcher } from "../../contexts/chainWatcher/chainWatcherContext";
import { useEffect } from "react";

function MyAccountPopover(props) {
  const { chainId } = useEthers();
  const { chainName } = getChainById(chainId) ?? {};
  const { t, tReady, closePopover, openProvidersPopover, anchorEl, ...rest } =
    props;
  const { account, deactivate } = useEthers();
  const { network } = useNetwork();
  const { setOverrideTargetChain } = useChainWatcher();

  useEffect(() => {
    console.log(network);
  }, [network]);

  // @todo should be done in useDapp itself
  const [, setShouldConnectMetamask] = useLocalStorage("shouldConnectMetamask");

  return (
    <Popover {...rest} anchorEl={anchorEl}>
      <Box pt={2} pb={3} px={3} maxWidth="350px">
        <Grid container alignItems="center" mb={1}>
          <Grid item xs>
            <Typography variant="h5">{t("base.myAccount")}</Typography>
          </Grid>
          <Grid item xs={1}>
            <Tooltip title="Wallet Settings">
              <IconButton
                variant="outlined"
                onClick={() => {
                  closePopover();
                  openProvidersPopover(anchorEl);
                }}
              >
                <Settings />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>

        <Divider />

        <List disablePadding>
          <ListItem
            disableGutters
            secondaryAction={<VerifyExplorerIconButton address={account} />}
          >
            <Tooltip disableFocusListener title={t("base.myAccount")}>
              <ListItemAvatar>
                <Avatar>
                  <Blockies
                    seed={account.toLowerCase()}
                    size={10}
                    scale={4}
                    className="blockies"
                  />
                </Avatar>
              </ListItemAvatar>
            </Tooltip>
            <ListItemText
              secondary={
                <>
                  <span>{truncate(account.toLowerCase(), 10, -4)}</span>
                  <IconButtonCopy
                    copyText={account}
                    size="small"
                    fontSize=".9rem"
                  />
                </>
              }
              primary={t("base.address")}
            />
          </ListItem>

          <ListItem disableGutters>
            <ListItemAvatar>
              <Avatar
                sx={{
                  backgroundColor: "success.main",
                }}
              >
                <Check
                  sx={{
                    color: "common.white",
                  }}
                />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              secondary={`Successfully connected to ${chainName}`}
              primary="Connected"
            />
          </ListItem>
        </List>

        <Divider />

        <Grid container>
          <Grid item xs>
            <Box my={2}>
              <AddTokenToWalletButton />
            </Box>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs>
            <Button
              fullWidth
              color="error"
              variant="contained"
              onClick={() => {
                closePopover();
                // @todo this should be done in chainWatcherProvider somehow
                setOverrideTargetChain(undefined);
                // @todo should be done in useDapp itself
                setShouldConnectMetamask(false);
                // @todo deactivation should reload the page in particular situations
                deactivate();
                window.location.reload();
              }}
            >
              {t("base.disconnect")}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Popover>
  );
}

export default withTranslation()(MyAccountPopover);
