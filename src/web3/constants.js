export const TARGET_CHAIN = process.env.REACT_APP_CHAIN;
export const INFURA_ID = process.env.REACT_APP_INFURA_ID;
export const ETHERSCAN_KEY = process.env.REACT_APP_ETHERSCAN_KEY;
export const BLOCKNATIVE_DAPPID = process.env.REACT_APP_BLOCKNATIVE_DAPPID;
export const DAY_IN_MILLISECONDS = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
export const ETHER_IN_WEI = 1000000000000000000;
export const AROMA_DECIMALS = 1000000000000000000; // 18 decimals
export const IPFS_GATEWAY = process.env.REACT_APP_IPFS_GATEWAY;

export const NETWORKS = {
  rinkeby: {
    testnet: true,
    name: "Rinkeby Testnet",
    chainId: 4,
    chainIdHex: "0x4",
    rpcUrls: [
      `https://rinkeby.infura.io/v3/${INFURA_ID}`
    ],
    faucet: "https://faucet.rinkeby.io/",
    blockExplorerUrls: [
      "https://rinkeby.etherscan.io/"
    ],
    nativeCurrency: {
      "name": "ETH",
      "symbol": "ETH",
      "decimals": 18
    },
    contractAroma: "0x41E0984a75d6Ad506Ff5551BE38B0d97C88Ea4A3",
    contractMaster: "0xc543A0E22e3c757B712a8924EcFc2bCF1db1b47f",
    adminAccount: "0x3c88774b71C6e57CD3CE110199d30FE67C54a7De",
    openSeaLink: 'https://testnets.opensea.io/assets'
  },
  polygon: {
    testnet: false,
    name: "Polygon Mainnet",
    chainId: 137,
    chainIdHex: "0x89",
    rpcUrls: [
      "https://polygon-rpc.com/"
    ],
    faucet: "https://faucet.matic.network/",
    blockExplorerUrls: [
      "https://polygonscan.com"
    ],
    nativeCurrency: {
      "name": "MATIC",
      "symbol": "MATIC",
      "decimals": 18
    },
    contractAroma: "0x444DBcb15Ea0d706C04DaB615374a11759E07A25",
    contractMaster: "0x12c0Cafb740Dc26879A3DB57Db185c9f2475192F",
    adminAccount: "0x1b0D20b13622D19d7CAbC4A6862deCa249C4075f",
    openSeaLink: 'https://opensea.io/assets/matic'
  },
  /*
  mumbai: {
    name: "mumbai",
    color: "#92D9FA",
    chainId: 80001,
    price: 1,
    gasPrice: 1000000000,
    rpcUrls: [
      "https://rpc-mumbai.maticvigil.com"
    ],
    faucet: "https://faucet.matic.network/",
    blockExplorerUrls: [
      "https://mumbai-explorer.matic.today/"
    ],
  },
  ropsten: {
    name: "ropsten",
    color: "#F60D09",
    chainId: 3,
    faucet: "https://faucet.ropsten.be/",
    blockExplorerUrls: [
      "https://ropsten.etherscan.io/"
    ],
    rpcUrls: `https://ropsten.infura.io/v3/${INFURA_ID}`,
  },
  goerli: {
    name: "goerli",
    color: "#0975F6",
    chainId: 5,
    faucet: "https://goerli-faucet.slock.it/",
    blockExplorerUrls: [
      "https://goerli.etherscan.io/"
    ],
    rpcUrls: `https://goerli.infura.io/v3/${INFURA_ID}`,
  },
  xdai: {
    name: "xdai",
    color: "#48a9a6",
    chainId: 100,
    price: 1,
    gasPrice: 1000000000,
    rpcUrls: [
      "https://dai.poa.network"
    ],
    faucet: "https://xdai-faucet.top/",
    blockExplorerUrls: [
      "https://blockscout.com/poa/xdai/"
    ],
  },
    localhost: {
    name: "localhost",
    color: "#666666",
    chainId: 31337,
    blockExplorerUrls: [
      ""
    ],
    rpcUrls: [
      "http://" + window.location.hostname + ":8545"
    ],
  },
  mainnet: {
    name: "mainnet",
    color: "#ff8b9e",
    chainId: 1,
    rpcUrls: `https://mainnet.infura.io/v3/${INFURA_ID}`,
    blockExplorerUrls: [
      "https://etherscan.io/"
    ],
  },
  kovan: {
    name: "kovan",
    color: "#7003DD",
    chainId: 42,
    rpcUrls: `https://kovan.infura.io/v3/${INFURA_ID}`,
    blockExplorerUrls: [
      "https://kovan.etherscan.io/"
    ],
    faucet: "https://gitter.im/kovan-testnet/faucet", // https://faucet.kovan.network/
  },
  localArbitrum: {
    name: "localArbitrum",
    color: "#50a0ea",
    chainId: 153869338190755,
    blockExplorerUrls: [
      ""
    ],
    rpcUrls: `http://localhost:8547`,
  },
  localArbitrumL1: {
    name: "localArbitrumL1",
    color: "#50a0ea",
    chainId: 44010,
    blockExplorerUrls: [
      ""
    ],
    rpcUrls: `http://localhost:7545`,
  },
  rinkebyArbitrum: {
    name: "Arbitrum Testnet",
    color: "#50a0ea",
    chainId: 421611,
    blockExplorerUrls: [
      "https://rinkeby-explorer.arbitrum.io/#/"
    ],
    rpcUrls: `https://rinkeby.arbitrum.io/rpc`,
  },
  arbitrum: {
    name: "Arbitrum",
    color: "#50a0ea",
    chainId: 42161,
    blockExplorerUrls: [
      "https://explorer.arbitrum.io/#/"
    ],
    rpcUrls: `https://arb1.arbitrum.io/rpc`,
    gasPrice: 0,
  },
  localOptimismL1: {
    name: "localOptimismL1",
    color: "#f01a37",
    chainId: 31337,
    blockExplorerUrls: [
      ""
    ],
    rpcUrls: [
      "http://" + window.location.hostname + ":9545"
    ],
  },
  localOptimism: {
    name: "localOptimism",
    color: "#f01a37",
    chainId: 420,
    blockExplorerUrls: [
      ""
    ],
    rpcUrls: [
      "http://" + window.location.hostname + ":8545"
    ],
    gasPrice: 0,
  },
  kovanOptimism: {
    name: "kovanOptimism",
    color: "#f01a37",
    chainId: 69,
    blockExplorerUrls: [
      "https://kovan-optimistic.etherscan.io/"
    ],
    rpcUrls: `https://kovan.optimism.io`,
    gasPrice: 0,
  },
  optimism: {
    name: "optimism",
    color: "#f01a37",
    chainId: 10,
    blockExplorerUrls: [
      "https://optimistic.etherscan.io/"
    ],
    rpcUrls: `https://mainnet.optimism.io`,
  },
  localAvalanche: {
    name: "localAvalanche",
    color: "#666666",
    chainId: 43112,
    blockExplorerUrls: [
      ""
    ],
    rpcUrls: `http://localhost:9650/ext/bc/C/rpc`,
    gasPrice: 225000000000,
  },
  fujiAvalanche: {
    name: "fujiAvalanche",
    color: "#666666",
    chainId: 43113,
    blockExplorerUrls: [
      "https://cchain.explorer.avax-test.network/"
    ],
    rpcUrls: `https://api.avax-test.network/ext/bc/C/rpc`,
    gasPrice: 225000000000,
  },
  mainnetAvalanche: {
    name: "mainnetAvalanche",
    color: "#666666",
    chainId: 43114,
    blockExplorerUrls: [
      "https://cchain.explorer.avax.network/"
    ],
    rpcUrls: `https://api.avax.network/ext/bc/C/rpc`,
    gasPrice: 225000000000,
  },
  testnetHarmony: {
    name: "Harmony Testnet",
    color: "#00b0ef",
    chainId: 1666700000,
    blockExplorerUrls: [
      "https://explorer.pops.one/"
    ],
    rpcUrls: `https://api.s0.b.hmny.io`,
    gasPrice: 1000000000,
  },
  mainnetHarmony: {
    name: "Harmony Mainnet",
    color: "#00b0ef",
    chainId: 1666600000,
    blockExplorerUrls: [
      "https://explorer.harmony.one/"
    ],
    rpcUrls: `https://api.harmony.one`,
    gasPrice: 1000000000,
  },
  */
};

export const NETWORK = (chainId) => {
  for (const n in NETWORKS) {
    if (NETWORKS[n].chainId === chainId) {
      return NETWORKS[n];
    }
  }
};
