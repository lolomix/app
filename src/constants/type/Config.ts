import { ChainId, FullConfig } from "@usedapp/core";
import { Chain } from "./Chain";
import { ChainSettings } from "./ChainSettings";

export type Config = Partial<FullConfig> & {
  targetChainId: ChainId;
  targetChain: Chain;
  readOnlyChain: Chain;
  readOnlyChainSettings: ChainSettings;
  networkSettings?: {
    [chainId: number]: ChainSettings;
  };
};
