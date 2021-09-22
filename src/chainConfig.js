export const chains = [
  { code: "local", name: "Local Demo", description: "", active: true, rpc: "http://127.0.0.1:8545", version: "1.0" },
  { code: "goerli", name: "Goerli Testnet",  description: "", active: true, rpc: "https://eth-goerli.alchemyapi.io/v2/HBnLxQgYavM5ZGSVWyMeBmpBOtZFqYib", version: "1.0"},
  { code: "xdai", name: "XDAI Chain",  description: "", active: true, rpc: "https://rpc.xdaichain.com", version: "1.0" },
  { code: "spark", name: "Sparknet", active: false },
  { code: "main", name: "Mainnet", active: false },
];

// code: internal code to identify chain, also used in URL path
// name: Name as shown in the app
// description: helper text shown in the app when creating new assembly
// active: true or false (local must be false on public releases)
// rpc: node endpoint
// version: the version of the smart contracts (assembly-contracts); ideally all chains use the same version
