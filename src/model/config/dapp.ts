import { Config } from "../../constants/type/Config";
import { Polygon } from "../chain/polygon";
import { Rinkeby } from "../chain/ethereum";

/**
 * Private Constants
 *
 * These are probably blockchain dependent constants and available via the `Dapp` config object.
 */
const INFURA_ID = process.env.REACT_APP_INFURA_ID;
const PRICE_FEED_API = process.env.REACT_APP_PRICE_FEED_API;
const REWARDS_API = process.env.REACT_APP_REWARDS_API;
const REWARDS_API_RINKEBY= process.env.REACT_APP_REWARDS_API_RINKEBY;

/**
 * Exportable Constants
 */
export const APP_VERSION = process.env.REACT_APP_VERSION;
export const IPFS_GATEWAY = process.env.REACT_APP_IPFS_GATEWAY;
export const TARGET_CHAIN = process.env.REACT_APP_CHAIN;

export const Network: Partial<Config> = {
  multicallVersion: 2,
  multicallAddresses: {
    [Polygon.chainId]: "0x5A616D3195715F2783bf51B46193b5DC8E867717",
  },
  networks: [Polygon, Rinkeby],
  networkSettings: {
    [Polygon.chainId]: {
      aromaContractAddress: "0x444DBcb15Ea0d706C04DaB615374a11759E07A25",
      masterContractAddress: "0x12c0Cafb740Dc26879A3DB57Db185c9f2475192F",
      adminAccountAddress: "0x1b0D20b13622D19d7CAbC4A6862deCa249C4075f",
      priceFeedApiUrl: PRICE_FEED_API,
      rewardsApiUrl: REWARDS_API,
      openSeaLink: "https://opensea.io/assets/matic",
    },
    [Rinkeby.chainId]: {
      aromaContractAddress: "0x41E0984a75d6Ad506Ff5551BE38B0d97C88Ea4A3",
      masterContractAddress: "0xc543A0E22e3c757B712a8924EcFc2bCF1db1b47f",
      adminAccountAddress: "0x3c88774b71C6e57CD3CE110199d30FE67C54a7De",
      priceFeedApiUrl: PRICE_FEED_API,
      rewardsApiUrl: REWARDS_API_RINKEBY,
      openSeaLink: "https://opensea.io/assets/matic",
    },
  },
  readOnlyUrls: {
    [Polygon.chainId]: `https://polygon-mainnet.infura.io/v3/${INFURA_ID}`,
    [Rinkeby.chainId]: `https://rinkeby.infura.io/v3/${INFURA_ID}`,
  },
};

/**
 * @todo consider removing dependency on environment variables
 */
export const Dapp: Partial<Config> = {
  targetChainId: TARGET_CHAIN === "polygon" ? Polygon.chainId : Rinkeby.chainId,
  targetChain: TARGET_CHAIN === "polygon" ? Polygon : Rinkeby,
  readOnlyChainId:
    TARGET_CHAIN === "polygon" ? Polygon.chainId : Rinkeby.chainId,
  readOnlyChain: TARGET_CHAIN === "polygon" ? Polygon : Rinkeby,
  readOnlyChainSettings:
    TARGET_CHAIN === "polygon"
      ? Network.networkSettings?.[Polygon.chainId]
      : Network.networkSettings?.[Rinkeby.chainId],
  ...Network,
};
