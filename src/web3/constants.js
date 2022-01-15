export const APP_NAME = process.env.REACT_APP_APP_NAME;
export const APP_VERSION = process.env.REACT_APP_VERSION;
export const TARGET_CHAIN = process.env.REACT_APP_CHAIN;
export const INFURA_ID = process.env.REACT_APP_INFURA_ID;
export const DAY_IN_MILLISECONDS = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
export const ETHER_IN_WEI = 1000000000000000000;
export const AROMA_DECIMALS = 1000000000000000000; // 18 decimals
export const AROMA_DECIMALS_DIGIT = 18;
export const IPFS_GATEWAY = process.env.REACT_APP_IPFS_GATEWAY;

/**
 * @type {{polygon: {contractMaster: string, chainIdHex: string, faucet: string, blockExplorerUrls: string[], chainId: number, nativeCurrency: {symbol: string, decimals: number, name: string}, adminAccount: string, name: string, rpcUrls: string[], openSeaLink: string, testnet: boolean, contractAroma: string}, rinkeby: {contractMaster: string, chainIdHex: string, faucet: string, blockExplorerUrls: string[], chainId: number, nativeCurrency: {symbol: string, decimals: number, name: string}, adminAccount: string, name: string, rpcUrls: string[], openSeaLink: string, testnet: boolean, contractAroma: string}}}
 *
 * @todo refactor to make it work with usedapp config
 */
export const NETWORKS = {
  rinkeby: {
    testnet: true,
    name: "Rinkeby Testnet",
    chainId: 4,
    chainIdHex: "0x4",
    rpcUrls: [`https://rinkeby.infura.io/v3/${INFURA_ID}`],
    faucet: "https://faucet.rinkeby.io/",
    blockExplorerUrls: ["https://rinkeby.etherscan.io/"],
    nativeCurrency: {
      name: "ETH",
      symbol: "ETH",
      decimals: 18,
    },
    contractAroma: "0x41E0984a75d6Ad506Ff5551BE38B0d97C88Ea4A3",
    contractMaster: "0xc543A0E22e3c757B712a8924EcFc2bCF1db1b47f",
    adminAccount: "0x3c88774b71C6e57CD3CE110199d30FE67C54a7De",
    openSeaLink: "https://testnets.opensea.io/assets",
  },
  polygon: {
    testnet: false,
    name: "Polygon Mainnet",
    chainId: 137,
    chainIdHex: "0x89",
    rpcUrls: ["https://polygon-rpc.com/"],
    faucet: "https://faucet.matic.network/",
    blockExplorerUrls: ["https://polygonscan.com"],
    nativeCurrency: {
      name: "MATIC",
      symbol: "MATIC",
      decimals: 18,
    },
    contractAroma: "0x444DBcb15Ea0d706C04DaB615374a11759E07A25",
    contractMaster: "0x12c0Cafb740Dc26879A3DB57Db185c9f2475192F",
    adminAccount: "0x1b0D20b13622D19d7CAbC4A6862deCa249C4075f",
    openSeaLink: "https://opensea.io/assets/matic",
  },
};

export const NETWORK = (chainId) => {
  for (const n in NETWORKS) {
    if (NETWORKS[n].chainId === chainId) {
      return NETWORKS[n];
    }
  }
};
