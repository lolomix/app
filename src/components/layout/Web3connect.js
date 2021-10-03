import React, { useState, Fragment, useCallback, useEffect } from "react";
import { withTranslation } from "react-i18next";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import Blockies from "react-blockies";
//web3
import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3Modal from "web3modal";
import Portis from "@portis/web3";
import Fortmatic from "fortmatic";
import Authereum from "authereum";
//mui
//material-ui
import Tooltip from "@mui/material/Tooltip";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Popover from "@mui/material/Popover";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Typography from "@mui/material/Typography";
//icons
import AccountCircle from "@mui/icons-material/AccountCircle";
//import AddCircle from "@mui/icons-material/AddCircle";
//custom
import { INFURA_ID } from "../../web3/constants";
const { ethers } = require("ethers");

const web3Modal = new Web3Modal({
  network: "mainnet", // Optional. If using WalletConnect on xDai, change network to "xdai" and add RPC info below for xDai chain.
  cacheProvider: true, // optional
  theme: "light", // optional. Change to "dark" for a dark theme.
  providerOptions: {
    walletconnect: {
      package: WalletConnectProvider, // required
      options: {
        bridge: "https://polygon.bridge.walletconnect.org",
        infuraId: INFURA_ID,
        rpc: {
          1: `https://mainnet.infura.io/v3/${INFURA_ID}`, // mainnet // For more WalletConnect providers: https://docs.walletconnect.org/quick-start/dapps/web3-provider#required
          42: `https://kovan.infura.io/v3/${INFURA_ID}`,
          100: "https://dai.poa.network", // xDai
        },
      },
    },
    portis: {
      display: {
        logo: "https://user-images.githubusercontent.com/9419140/128913641-d025bc0c-e059-42de-a57b-422f196867ce.png",
        name: "Portis",
        description: "Connect to Portis App",
      },
      package: Portis,
      options: {
        id: "6255fb2b-58c8-433b-a2c9-62098c05ddc9",
      },
    },
    fortmatic: {
      package: Fortmatic, // required
      options: {
        key: "pk_live_5A7C91B2FC585A17", // required
      },
    },
    authereum: {
      package: Authereum, // required
    },
  },
});

function Web3connect(props) {
  /*
  state = {
    connectionMenu: null,
    deferredPrompt: null,
    isAppInstalled: false,
    isAppInstallable: false,
    dialogWeb3: false,
  };
  
  componentDidMount = () => {
    window.addEventListener("beforeinstallprompt", (e) => {
      this.setState({ deferredPrompt: e, isAppInstallable: true });
      console.log("deffered prompt saved");
    });
    window.addEventListener("appinstalled", (evt) => {
      this.setState({ isAppInstalled: true });
    });
  };
  */

  const [injectedProvider, setInjectedProvider] = useState();
  const [address, setAddress] = useState();
  const [connectionMenu, setconnectionMenu] = useState(false);
  const [dialogWeb3, setdialogWeb3] = useState(false);
  const handleConnectionIconClick = (event) => {
    setconnectionMenu(event.currentTarget);
  };
  const handleConnectionMenuClose = () => {
    setconnectionMenu(null);
  };
  const handleWeb3Modal = () => {
    setdialogWeb3(!dialogWeb3);
  };
  const { t } = props;

  const logoutOfWeb3Modal = async () => {
    await web3Modal.clearCachedProvider();
    if (injectedProvider && injectedProvider.provider && typeof injectedProvider.provider.disconnect == "function") {
      await injectedProvider.provider.disconnect();
    }
    setTimeout(() => {
      window.location.reload();
    }, 1);
  };
  const loadWeb3Modal = useCallback(async () => {
    const provider = await web3Modal.connect();
    setInjectedProvider(new ethers.providers.Web3Provider(provider));

    provider.on("chainChanged", chainId => {
      console.log(`chain changed to ${chainId}! updating providers`);
      setInjectedProvider(new ethers.providers.Web3Provider(provider));
    });

    provider.on("accountsChanged", () => {
      console.log(`account changed!`);
      setInjectedProvider(new ethers.providers.Web3Provider(provider));
    });

    // Subscribe to session disconnection
    provider.on("disconnect", (code, reason) => {
      console.log(code, reason);
      logoutOfWeb3Modal();
    });
  }, [setInjectedProvider, logoutOfWeb3Modal]);

  useEffect(() => {
    if (web3Modal.cachedProvider) {
      loadWeb3Modal();
    }
  }, [loadWeb3Modal]);

  return (
    <Fragment>
      {true && (
      <Tooltip title="Connect to your Ethereum account">
        <Button size="small" variant="outlined" color="secondary" onClick={loadWeb3Modal}>
          Connect
        </Button>
      </Tooltip>
      )}
      <Tooltip disableFocusListener title={t("base.connectionInfo")} aria-label={t("base.connectionInfo")}>
        <IconButton color="inherit" onClick={handleConnectionIconClick}>
          <AccountCircle />
        </IconButton>
      </Tooltip>
      <Backdrop open={Boolean(connectionMenu)} className="backdropZindex">
        <Popover id="settings-menu" open={Boolean(connectionMenu)} anchorEl={connectionMenu} onClose={handleConnectionMenuClose}>
          <Paper>
            <Box m={2}>
              <List dense>
                <ListItem button component={Link} to="/account" onClick={handleConnectionMenuClose}>
                  <Tooltip disableFocusListener title="asdfasdf">
                    <ListItemAvatar>
                      <Avatar>
                        <Blockies seed="asdfasdf" size={10} scale={4} className="blockies" />
                      </Avatar>
                    </ListItemAvatar>
                  </Tooltip>
                  <ListItemText secondary="0x45454545455345" primary={t("base.openYourAccount")} />
                  <ListItemSecondaryAction></ListItemSecondaryAction>
                </ListItem>
                <ListItem button component={Link} to="/account" onClick={handleConnectionMenuClose}>
                  <ListItemText secondary="20 AROMA" primary="Wallet balance" />
                  <ListItemSecondaryAction></ListItemSecondaryAction>
                </ListItem>
                <ListItem button component={Link} to="/account" onClick={handleConnectionMenuClose}>
                  <ListItemText secondary="0 NFTs" primary="Open my collection" />
                  <ListItemSecondaryAction></ListItemSecondaryAction>
                </ListItem>
                {/* 
                {this.state.isAppInstallable && !this.state.isAppInstalled && (
                  <ListItem button onClick={() => this.state.deferredPrompt.prompt()}>
                    <ListItemIcon color="primary">
                      <AddCircle />
                    </ListItemIcon>
                    <ListItemText primary="Install app" secondary="Click to install" />
                  </ListItem>
                )}
                */}
              </List>
              <Button color="primary" variant="outlined" onClick={handleConnectionMenuClose}>
                {t("base.close")}
              </Button>
            </Box>
          </Paper>
        </Popover>
      </Backdrop>
      <Dialog onClose={handleWeb3Modal} open={dialogWeb3} keepMounted maxWidth="lg">
        <DialogContent>
          <Typography variant="h2" gutterBottom>
            Connect Wallet
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleWeb3Modal} variant="contained" color="primary">
            {t("base.close")}
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}

export default withRouter(withTranslation()(Web3connect));
