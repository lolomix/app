import { useConfig, useEthers } from "@usedapp/core";
import { Button, Tooltip } from "@mui/material";

/**
 * @returns {JSX.Element}
 * @constructor
 */
function AddTokenToWalletButton() {
  const { readOnlyChainSettings } = useConfig();
  const { library } = useEthers();

  const walletWatchAsset = () => {
    if (!!library && window.ethereum) {
      window.ethereum
        .request({
          method: "wallet_watchAsset",
          params: {
            type: "ERC20",
            options: {
              address: readOnlyChainSettings.aromaContractAddress,
              symbol: "AROMA",
              decimals: 18,
            },
          },
        })
        .then((success) => {
          if (success) {
            console.log("AROMA successfully added to wallet!");
          } else {
            throw new Error("Something went wrong.");
          }
        })
        .catch(console.error);
    }
  };

  return (
    library &&
    window.ethereum && (
      <Tooltip
        placement="top"
        title="You will see your AROMA balance directly in your Wallet"
      >
        <Button
          fullWidth
          variant="outlined"
          color="tertiary"
          onClick={() => walletWatchAsset()}
        >
          Add AROMA in Wallet
        </Button>
      </Tooltip>
    )
  );
}

export default AddTokenToWalletButton;
