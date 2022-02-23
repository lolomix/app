import { createContext, useContext } from "react";

/**
 * @type {React.Context<unknown>}
 */
export const ChainWatcherContext = createContext({
  unsupportedChain: undefined,
  overrideTargetChain: undefined,
  setOverrideTargetChain: () => undefined,
});

/**
 * @returns {*}
 */
export function useChainWatcher() {
  return useContext(ChainWatcherContext);
}
