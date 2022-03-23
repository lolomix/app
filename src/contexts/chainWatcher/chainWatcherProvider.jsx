/**
 * @param children
 * @returns {JSX.Element}
 * @constructor
 */
import { useConfig, useEthers, useLocalStorage } from "@usedapp/core";
import { useEffect, useRef, useState } from "react";
import { ChainWatcherContext } from "./chainWatcherContext";

export function ChainWatcherProvider({ children }) {
  const { account, chainId, library } = useEthers();
  const [overrideTargetChain, setOverrideTargetChain] = useLocalStorage(
    "overrideTargetChain"
  );
  const { networks, targetChainId } = useConfig();
  const previousChainId = useRef();
  const [unsupportedChain, setUnsupportedChain] = useState(false);

  useEffect(() => {
    if (chainId === undefined) return;

    console.debug(
      "chainId has been changed from",
      previousChainId.current,
      "to",
      chainId
    );

    // if not RPC provider and network is supported
    if (
      account &&
      library?.provider !== undefined &&
      networks?.some((chain) => chain?.chainId === chainId)
    ) {
      if (targetChainId === chainId) {
        console.debug(
          "remove 'overrideTargetChain' from local storage if present"
        );
        setOverrideTargetChain(undefined);
      } else {
        console.debug("set 'overrideTargetChain' in local storage");
        setOverrideTargetChain(chainId);
      }

      window.location.reload();
    }

    previousChainId.current = chainId;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chainId]);

  useEffect(() => {
    if (account === undefined) {
      return;
    }

    console.debug("wallet connection is detected");

    if (!networks?.some((chain) => chain?.chainId === chainId)) {
      console.debug("Unsupported Chain");
    }

    setUnsupportedChain(!networks?.some((chain) => chain?.chainId === chainId));
  }, [networks, chainId, account]);

  return (
    <ChainWatcherContext.Provider
      value={{ unsupportedChain, overrideTargetChain, setOverrideTargetChain }}
    >
      {children}
    </ChainWatcherContext.Provider>
  );
}
