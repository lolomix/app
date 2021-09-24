import { InjectedConnector } from "@web3-react/injected-connector";
import { LedgerConnector } from "@web3-react/ledger-connector";

const POLLING_INTERVAL = 12000;
const RPC_URLS = {
  1: "https://eth-goerli.alchemyapi.io/v2/HBnLxQgYavM5ZGSVWyMeBmpBOtZFqYib",
  4: "https://eth-goerli.alchemyapi.io/v2/HBnLxQgYavM5ZGSVWyMeBmpBOtZFqYib",
};

export const injected = new InjectedConnector({ supportedChainIds: [1, 3, 4, 5, 42] });

export const ledger = new LedgerConnector({ chainId: 1, url: RPC_URLS[1], pollingInterval: POLLING_INTERVAL });
