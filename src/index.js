// react
import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
// style
import "./index.css";
// other
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";
import { QueryClient, QueryClientProvider } from 'react-query'
import { DAppProvider, Polygon, Rinkeby } from "@usedapp/core";
import { TARGET_CHAIN } from "./web3/constants";
// components
import AppLaunch from "./AppLaunch";
const App = lazy(() => import("./App"));

/**
 * @todo decouple configuration from the index file
 */
const config = {
  networks: [Rinkeby],
};

if (TARGET_CHAIN === "polygon") {
  config.networks = [Polygon];
}

const queryClient = new QueryClient()

ReactDOM.render(
  <BrowserRouter>
    <Suspense fallback={<AppLaunch />}>
      <DAppProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </DAppProvider>
    </Suspense>
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
