import { Chain } from "../../constants/type/Chain";
import { Rinkeby as BaseRinkeby } from "@usedapp/core";

export const Rinkeby: Chain = {
  ...BaseRinkeby,
  chain: "ETH",
  nativeCurrency: {
    name: "Ether",
    symbol: "ETH",
    decimals: 18,
  },
  rpcUrls: ["https://rinkeby.infura.io/v3/"],
  blockExplorerUrls: ["https://rinkeby.etherscan.io/"],
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { Rinkeby };
