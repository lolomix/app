import {
  injected
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

export default connectorsList;
