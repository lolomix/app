import {
  injected,
  // walletconnect,
  // walletlink,
  // ledger,
  // network,
  // trezor,
  // lattice,
  // frame,
  // authereum,
  // fortmatic,1
  // magic,
  // portis,
  // torus
} from "./connectors";

const connectorsList = {
  injected: {
    soon: false,
    name: "MetaMask",
    description: "Use this for Browser Extensions such as Metamask, Brave Wallet and etc...",
    icon: "WalletMetaMaskIcon",
    connector: injected
  },
  walletConnect: {
    soon: true,
    name: "WalletConnect",
    description: "Use this if your wallet uses WalletConnect",
    icon: "WalletWalletConnectIcon",
    connector: {}
  },
  ledger: {
    soon: true,
    name: "Ledger",
    description: "Use this if you use a Ledger Wallet.",
    icon: "WalletLedgerIcon",
    connector: {}
  }
};
/*
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

export const connectorsByName = {
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
*/

export default connectorsList;
