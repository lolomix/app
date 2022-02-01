const connectorsList = {
  injected: {
    soon: false,
    name: "MetaMask",
    description:
      "Use this for Browser Extensions such as Metamask, Brave Wallet and etc...",
    icon: "WalletMetaMaskIcon",
    isActive: (provider) => provider?.provider?.isMetaMask
  },
  walletConnect: {
    soon: true,
    name: "WalletConnect",
    description: "Use this if your wallet uses WalletConnect",
    icon: "WalletWalletConnectIcon",
    isActive: (provider) => false
  },
  ledger: {
    soon: true,
    name: "Ledger",
    description: "Use this if you use a Ledger Wallet.",
    icon: "WalletLedgerIcon",
    isActive: (provider) => false
  },
};

export default connectorsList;
