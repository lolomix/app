import { InjectedConnector } from "@web3-react/injected-connector";
import { NETWORKS, TARGET_CHAIN } from "./constants";

export const injected = new InjectedConnector({
  supportedChainIds: [NETWORKS[TARGET_CHAIN].chainId],
});
