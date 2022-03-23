import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";
import { QueryClient, QueryClientProvider } from "react-query";
import { DAppProvider, useLocalStorage } from "@usedapp/core";
import App from "./App";
import "./i18n";
import { ChainWatcherProvider } from "./contexts/chainWatcher/chainWatcherProvider";
import { Dapp } from "./model/config/dapp";

const queryClient = new QueryClient();

/**
 * @returns {JSX.Element}
 * @constructor
 */
const DApp = () => {
  // @todo change terminology to `overrideChainId` to avoid confusion (target chain is different)
  const [overrideTargetChain] = useLocalStorage("overrideTargetChain");
  return (
    <DAppProvider
      config={{
        ...Dapp,
        ...(overrideTargetChain && {
          readOnlyChainId: overrideTargetChain,
          readOnlyChain: Dapp.networks.find(
            (chain) => chain.chainId === overrideTargetChain
          ),
          readOnlyChainSettings:
            Dapp.networkSettings[overrideTargetChain],
        }),
      }}
    >
      <ChainWatcherProvider>
        <App />
      </ChainWatcherProvider>
    </DAppProvider>
  );
};

ReactDOM.render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <DApp />
    </QueryClientProvider>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
