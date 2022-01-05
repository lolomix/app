import React from "react";
import { useEthers } from '@usedapp/core'
import {
    Button, Tooltip
  } from '@mui/material'
import { NETWORKS, TARGET_CHAIN } from "../../web3/constants";

const ButtonAddAssetToWallet = function () {
  const { library } = useEthers();

  const walletWatchAsset = () => {
    if (!!library && window.ethereum) {
        window.ethereum
        .request({
          method: 'wallet_watchAsset',
          params: {
            type: 'ERC20',
            options: {
              address: NETWORKS[TARGET_CHAIN].contractAroma,
              symbol: 'AROMA',
              decimals: 18,
            },
          },
        })
        .then((success) => {
          if (success) {
            console.log('AROMA successfully added to wallet!')
          } else {
            throw new Error('Something went wrong.')
          }
        })
        .catch(console.error)
    }
  };

  return ( 
      library && window.ethereum && (
        <Tooltip title="You will see your AROMA balance directly in Metamask">
          <Button fullWidth disableElevation color="primary" variant="outlined" onClick={() => walletWatchAsset()}>
              Show AROMA in Wallet
          </Button>
        </Tooltip>
  ))
};

export default ButtonAddAssetToWallet;
