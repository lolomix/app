/**
 * @param children
 * @returns {JSX.Element}
 * @constructor
 */
import {
  Rinkeby,
  useConfig,
  useEthers,
  useLocalStorage,
  Polygon,
} from "@usedapp/core";
import { useEffect, useRef, useState } from "react";
import { ChainWatcherContext } from "./chainWatcherContext";
import { TARGET_CHAIN } from "../../web3/constants";

export function ChainWatcherProvider({ children }) {
  const { account, chainId, library } = useEthers();
  const [overrideTargetChain, setOverrideTargetChain] = useLocalStorage(
    "overrideTargetChain"
  );
  const { networks } = useConfig();
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
      // @todo repurpose TARGET_CHAIN to have standard ID
      let targetChainId =
        TARGET_CHAIN === "polygon" ? Polygon.chainId : Rinkeby.chainId;

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
