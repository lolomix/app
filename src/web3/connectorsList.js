import {
  injected,
  walletconnect,
  walletlink,
  ledger,
  /* , network, trezor, lattice, frame, authereum, fortmatic, magic, portis, torus */
} from "./connectors";

const connectorsList = {
  injected: {
    name: "Browser",
    description: "Use this for Browser Plugins such as Metamask or Brave Wallet.",
    icon: "",
    connector: injected,
  },
  walletconnect: {
    name: "WalletConnect",
    description: "Use this if your wallet uses WalletConnect",
    icon: "",
    connector: walletconnect,
  },
  walletlink: {
    name: "WalletLink",
    description: "Use this if your wallet uses WalletLink",
    icon: "",
    connector: walletlink,
  },
  ledger: {
    name: "Ledger",
    description: "Use this if you use a Ledger Wallet.",
    icon: "",
    connector: ledger,
  },
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
