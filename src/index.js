import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";
import { QueryClient, QueryClientProvider } from "react-query";
import { DAppProvider } from "@usedapp/core";
import { DAPPCONFIG } from "./web3/constants";
import App from "./App";

const queryClient = new QueryClient();

ReactDOM.render(
  <BrowserRouter>
    <DAppProvider config={DAPPCONFIG}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </DAppProvider>
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
