import { Chain } from "../../constants/type/Chain";
import { Polygon as BasePolygon } from "@usedapp/core";

export const Polygon: Chain = {
  ...BasePolygon,
  chainName: "Polygon Mainnet",
  chain: "Polygon",
  nativeCurrency: {
    name: "MATIC",
    symbol: "MATIC",
    decimals: 18,
  },
  rpcUrls: [
    "https://polygon-rpc.com/",
    "https://rpc-mainnet.matic.network",
    "https://matic-mainnet.chainstacklabs.com",
    "https://rpc-mainnet.maticvigil.com",
    "https://rpc-mainnet.matic.quiknode.pro",
    "https://matic-mainnet-full-rpc.bwarelabs.com",
  ],
  blockExplorerUrls: ["https://rinkeby.etherscan.io/"],
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { Polygon };
