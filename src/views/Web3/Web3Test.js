import React from "react";
import { withSnackbar } from "notistack";
//mui
import Grid from "@mui/material/Grid";
//import Box from "@mui/material/Box";
//import Button from "@mui/material/Button";
//import ListItemIcon from "@mui/material/ListItemIcon";
//import List from "@mui/material/List";
//import ListItem from "@mui/material/ListItem";
//import ListItemText from "@mui/material/ListItemText";
//import Card from "@mui/material/Card";
//import CardContent from "@mui/material/CardContent";
//import ToastLoading from "../../components/notification/ToastLoading";
//import ToastLoadingIndeterminate from "../../components/notification/ToastLoadingIndeterminate";
//web3
import { useWeb3React, UnsupportedChainIdError } from "@web3-react/core";
import { NoEthereumProviderError, UserRejectedRequestError as UserRejectedRequestErrorInjected } from "@web3-react/injected-connector";
import { UserRejectedRequestError as UserRejectedRequestErrorWalletConnect } from "@web3-react/walletconnect-connector";
import { UserRejectedRequestError as UserRejectedRequestErrorFrame } from "@web3-react/frame-connector";
import { utils } from "web3";
import { useEagerConnect, useInactiveListener } from "../../web3/hooks";
import {
  injected,
  network,
  walletconnect,
  walletlink,
  ledger,
  trezor,
  lattice,
  frame,
  authereum,
  fortmatic,
  magic,
  portis,
  torus,
} from "../../web3/connectors";
import BuyAroma from "../../components/web3/BuyAroma";

// utils
import {formatCurrency} from '../../utils/formatters'

const ConnectorNames = {
  Injected: "Injected",
  Network: "Network",
  WalletConnect: "WalletConnect",
  WalletLink: "WalletLink",
  Ledger: "Ledger",
  Trezor: "Trezor",
  Lattice: "Lattice",
  Frame: "Frame",
  Authereum: "Authereum",
  Fortmatic: "Fortmatic",
  Magic: "Magic",
  Portis: "Portis",
  Torus: "Torus",
};

const connectorsByName = {
  [ConnectorNames.Injected]: injected,
  [ConnectorNames.Network]: network,
  [ConnectorNames.WalletConnect]: walletconnect,
  [ConnectorNames.WalletLink]: walletlink,
  [ConnectorNames.Ledger]: ledger,
  [ConnectorNames.Trezor]: trezor,
  [ConnectorNames.Lattice]: lattice,
  [ConnectorNames.Frame]: frame,
  [ConnectorNames.Authereum]: authereum,
  [ConnectorNames.Fortmatic]: fortmatic,
  [ConnectorNames.Magic]: magic,
  [ConnectorNames.Portis]: portis,
  [ConnectorNames.Torus]: torus,
};

function getErrorMessage(error) {
  if (error instanceof NoEthereumProviderError) {
    return "No Ethereum browser extension detected, install MetaMask on desktop or visit from a dApp browser on mobile.";
  } else if (error instanceof UnsupportedChainIdError) {
    return "You're connected to an unsupported network. Please use Polygon network.";
  } else if (
    error instanceof UserRejectedRequestErrorInjected ||
    error instanceof UserRejectedRequestErrorWalletConnect ||
    error instanceof UserRejectedRequestErrorFrame
  ) {
    return "Please authorize this website to access your Ethereum account.";
  } else {
    console.error(error);
    return "An unknown error occurred. Check the console for more details.";
  }
}

function ChainId() {
  const { chainId } = useWeb3React();
  return (
    <>
      <span>Chain Id</span>
      <span role="img" aria-label="chain">
        ⛓
      </span>
      <span>{chainId ?? ""}</span>
    </>
  );
}

function Account() {
  const { account } = useWeb3React();

  return (
    <>
      <span>Account</span>
      <span role="img" aria-label="robot">
        🤖
      </span>
      <span>{account === null ? "-" : account ? `${account.substring(0, 6)}...${account.substring(account.length - 4)}` : ""}</span>
    </>
  );
}

function Balance() {
  const { account, library, chainId } = useWeb3React();

  const [balance, setBalance] = React.useState();
  React.useEffect(() => {
    if (!!account && !!library) {
      let stale = false;
      library.eth
        .getBalance(account)
        .then((balance) => {
          if (!stale) {
            setBalance(balance);
          }
        })
        .catch(() => {
          if (!stale) {
            setBalance(null);
          }
        });
      return () => {
        stale = true;
        setBalance(undefined);
      };
    }
  }, [account, library, chainId]); // ensures refresh if referential identity of library doesn't change across chainIds

  return (
    <>
      <span>Balance</span>
      <span role="img" aria-label="gold">
        💰
      </span>
      <span>{balance === null ? "Error" : formatCurrency(balance) ? `Ξ${formatCurrency(utils.fromWei(balance, "ether"))}` : ""}</span>
    </>
  );
}

function Header() {
  const { active, error } = useWeb3React();

  return (
    <>
      <p style={{ margin: "1rem", textAlign: "right" }}>{active ? "🟢" : error ? "🔴" : "🟠"}</p>
      <p
        style={{
          display: "grid",
          gridGap: "1rem",
          gridTemplateColumns: "1fr min-content 1fr",
          maxWidth: "20rem",
          lineHeight: "2rem",
          margin: "auto",
        }}>
        <ChainId />
        <Account />
        <Balance />
      </p>
    </>
  );
}

function App() {
  const context = useWeb3React();
  const { connector, library, chainId, account, activate, deactivate, active, error } = context;

  // handle logic to recognize the connector currently being activated
  const [activatingConnector, setActivatingConnector] = React.useState();
  React.useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined);
    }
  }, [activatingConnector, connector]);

  // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
  const triedEager = useEagerConnect();

  // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
  useInactiveListener(!triedEager || !!activatingConnector);

  return (
    <Grid container spacing={2}>
      <Grid item md={4}>
        <p>connectors</p>
        <div
          style={{
            display: "grid",
            gridGap: "1rem",
            gridTemplateColumns: "1fr 1fr",
            maxWidth: "20rem",
            margin: "auto",
          }}>
          {Object.keys(connectorsByName).map((name) => {
            const currentConnector = connectorsByName[name];
            const activating = currentConnector === activatingConnector;
            const connected = currentConnector === connector;
            const disabled = !triedEager || !!activatingConnector || connected || !!error;
            return (
              <button
                style={{
                  height: "3rem",
                  borderRadius: "1rem",
                  borderColor: activating ? "orange" : connected ? "green" : "unset",
                  cursor: disabled ? "unset" : "pointer",
                  position: "relative",
                }}
                disabled={disabled}
                key={name}
                onClick={() => {
                  setActivatingConnector(currentConnector);
                  activate(connectorsByName[name]);
                }}>
                <div
                  style={{
                    position: "absolute",
                    top: "0",
                    left: "0",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    color: "black",
                    margin: "0 0 0 1rem",
                  }}>
                  {activating && <span>loading</span>}
                  {connected && (
                    <span role="img" aria-label="check">
                      ✅
                    </span>
                  )}
                </div>
                {name}
              </button>
            );
          })}
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          {(active || error) && (
            <button
              style={{
                height: "3rem",
                marginTop: "2rem",
                borderRadius: "1rem",
                borderColor: "red",
                cursor: "pointer",
              }}
              onClick={() => {
                deactivate();
              }}>
              Deactivate
            </button>
          )}
          {!!error && <h4 style={{ marginTop: "1rem", marginBottom: "0" }}>{getErrorMessage(error)}</h4>}
        </div>
      </Grid>
      <Grid item md={4}>
        <Header />
      </Grid>
      <Grid item md={4}>
        <div
          style={{
            display: "grid",
            gridGap: "1rem",
            gridTemplateColumns: "fit-content",
            maxWidth: "20rem",
            margin: "auto",
          }}>
          {!!(library && account) && (
            <button
              style={{
                height: "3rem",
                borderRadius: "1rem",
                cursor: "pointer",
              }}
              onClick={() => {
                library
                  .getSigner(account)
                  .signMessage("👋")
                  .then((signature) => {
                    window.alert(`Success!\n\n${signature}`);
                  })
                  .catch((error) => {
                    window.alert("Failure!" + (error && error.message ? `\n\n${error.message}` : ""));
                  });
              }}>
              Sign Message
            </button>
          )}
          <BuyAroma />
          {!!(connector === connectorsByName[ConnectorNames.Network] && chainId) && (
            <button
              style={{
                height: "3rem",
                borderRadius: "1rem",
                cursor: "pointer",
              }}
              onClick={() => {
                connector.changeChainId(chainId === 1 ? 4 : 1);
              }}>
              Switch Networks
            </button>
          )}
          {connector === connectorsByName[ConnectorNames.WalletConnect] && (
            <button
              style={{
                height: "3rem",
                borderRadius: "1rem",
                cursor: "pointer",
              }}
              onClick={() => {
                connector.close();
              }}>
              Kill WalletConnect Session
            </button>
          )}
          {connector === connectorsByName[ConnectorNames.WalletLink] && (
            <button
              style={{
                height: "3rem",
                borderRadius: "1rem",
                cursor: "pointer",
              }}
              onClick={() => {
                connector.close();
              }}>
              Kill WalletLink Session
            </button>
          )}
          {connector === connectorsByName[ConnectorNames.Fortmatic] && (
            <button
              style={{
                height: "3rem",
                borderRadius: "1rem",
                cursor: "pointer",
              }}
              onClick={() => {
                connector.close();
              }}>
              Kill Fortmatic Session
            </button>
          )}
          {connector === connectorsByName[ConnectorNames.Magic] && (
            <button
              style={{
                height: "3rem",
                borderRadius: "1rem",
                cursor: "pointer",
              }}
              onClick={() => {
                connector.close();
              }}>
              Kill Magic Session
            </button>
          )}
          {connector === connectorsByName[ConnectorNames.Portis] && (
            <>
              {chainId !== undefined && (
                <button
                  style={{
                    height: "3rem",
                    borderRadius: "1rem",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    connector.changeNetwork(chainId === 1 ? 100 : 1);
                  }}>
                  Switch Networks
                </button>
              )}
              <button
                style={{
                  height: "3rem",
                  borderRadius: "1rem",
                  cursor: "pointer",
                }}
                onClick={() => {
                  connector.close();
                }}>
                Kill Portis Session
              </button>
            </>
          )}
          {connector === connectorsByName[ConnectorNames.Torus] && (
            <button
              style={{
                height: "3rem",
                borderRadius: "1rem",
                cursor: "pointer",
              }}
              onClick={() => {
                connector.close();
              }}>
              Kill Torus Session
            </button>
          )}
        </div>
      </Grid>
    </Grid>
  );
}

export default withSnackbar(App);
