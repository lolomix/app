import { UnsupportedChainIdError } from "@web3-react/core";
import {
  NoEthereumProviderError,
  UserRejectedRequestError,
} from '@web3-react/injected-connector'

export function getErrorMessage(error) {
  if (error instanceof NoEthereumProviderError) {
    return "No Ethereum browser extension detected, install MetaMask on desktop or visit from a dApp browser on mobile.";
  } else if (error instanceof UnsupportedChainIdError) {
    return "You're connected to an unsupported network. Please switch to Polygon network.";
  } else if (
    error instanceof UserRejectedRequestError
  ) {
    return "Please authorize this website to access your Ethereum account.";
  } else {
    return "Please connect your wallet";
  }
}
