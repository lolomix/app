import React, { useState, Fragment } from "react";
import { withTranslation } from "react-i18next";
import { withRouter } from "react-router-dom";
import Blockies from "react-blockies";
//web3
import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3Modal from "web3modal";
import Portis from "@portis/web3";
import Fortmatic from "fortmatic";
import Authereum from "authereum";
//mui
import Tooltip from "@mui/material/Tooltip";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
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
import { INFURA_ID, TARGET_CHAIN } from "../../web3/constants";
import aromaAbi from "../../web3/abi/aroma.json";
import mainAbi from "../../web3/abi/main.json";
const { ethers } = require("ethers");

const web3Modal = new Web3Modal({
  network: TARGET_CHAIN, // Optional. If using WalletConnect on xDai, change network to "xdai" and add RPC info below for xDai chain.
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
  const [provider, setProvider] = useState(null);
  const [address, setAddress] = useState(null);
  const [connectionMenu, setconnectionMenu] = useState(false);
  const [dialogWeb3, setdialogWeb3] = useState(false);
  const [balanceAroma, setBalanceAroma] = useState(0);
  const [balanceMatic, setBalanceMatic] = useState(0);

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
    if (provider && provider.provider && typeof provider.provider.disconnect == "function") {
      await provider.provider.disconnect();
    }
    setTimeout(() => {
      window.location.reload();
    }, 1);
  };
  const loadWeb3Modal = async () => {
    const web3modalProvider = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(web3modalProvider);

    setProvider(provider);
    const addressList = await provider.listAccounts();
    setAddress(addressList[0]);

    const balance = await provider.getBalance(addressList[0]);
    console.log(balance);
    setBalanceMatic(ethers.utils.formatEther(balance));

    const aromaContract = new ethers.Contract("0x41E0984a75d6Ad506Ff5551BE38B0d97C88Ea4A3", aromaAbi, provider);
    const balanceAroma = await aromaContract.balanceOf(addressList[0]);
    setBalanceAroma(ethers.utils.formatEther(balanceAroma));

    provider.on("chainChanged", (chainId) => {
      console.log(`chain changed to ${chainId}! updating providers`);
      setProvider(new ethers.providers.Web3Provider(provider));
    });
    provider.on("accountsChanged", () => {
      console.log(`account changed!`);
      setProvider(new ethers.providers.Web3Provider(provider));
    });
    provider.on("disconnect", (code, reason) => {
      console.log(code, reason);
      logoutOfWeb3Modal();
    });
  };

  const buyAroma = async () => {
    const mainContract = new ethers.Contract("0xc543A0E22e3c757B712a8924EcFc2bCF1db1b47f", mainAbi, provider);
    //await mainContract.deployed("buyAROMA)  (23).send({ value: "1000", from: address, gas: 10000000 });
  };

  return (
    <Fragment>
      {!address ? (
        <Tooltip title="Connect to your Ethereum account">
          <Button size="small" variant="outlined" color="secondary" onClick={loadWeb3Modal}>
            Connect
          </Button>
        </Tooltip>
      ) : (
        <>
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
                    {address && (
                      <ListItem>
                        <Tooltip disableFocusListener title="your web3 address">
                          <ListItemAvatar>
                            <Avatar>
                              <Blockies seed={address.toLowerCase()} size={10} scale={4} className="blockies" />
                            </Avatar>
                          </ListItemAvatar>
                        </Tooltip>
                        <ListItemText secondary={address.toLowerCase()} primary={t("base.yourWeb3Account")} />
                      </ListItem>
                    )}
                    <ListItem>
                      <ListItemText secondary={balanceAroma} primary="Your AROMA balance" />
                    </ListItem>
                    <ListItem>
                      <ListItemText secondary={balanceMatic} primary="Your MATIC balance" />
                    </ListItem>
                  </List>
                  <Button color="primary" variant="contained" onClick={handleConnectionMenuClose}>
                    {t("base.close")}
                  </Button>
                  <Button color="primary" variant="outlined" onClick={logoutOfWeb3Modal}>
                    Logout
                  </Button>
                  <Button color="primary" variant="outlined" onClick={buyAroma}>
                    buy some aroma
                  </Button>
                </Box>
              </Paper>
            </Popover>
          </Backdrop>
        </>
      )}
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
