import ConnectionErrorCard from "../../components/common/ConnectionErrorCard";
import { Button, CardActions, Stack } from "@mui/material";
import { useConfig, useEthers, useLocalStorage } from "@usedapp/core";
import { withTranslation } from "react-i18next";
import { useChainWatcher } from "../../contexts/chainWatcher/chainWatcherContext";
import { hexValue } from "ethers/lib/utils";

/**
 * @returns {JSX.Element}
 * @constructor
 */
const UnsupportedChain = ({ t }) => {
  const { deactivate } = useEthers();
  const { setOverrideTargetChain } = useChainWatcher();
  const { targetChain } = useConfig();

  // @todo should be done in useDapp itself
  const [, setShouldConnectMetamask] = useLocalStorage("shouldConnectMetamask");

  async function switchChain() {
    try {
      // check if the chain to connect to is installed
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: hexValue(targetChain.chainId) }], // chainId must be in hexadecimal numbers
      });
    } catch (error) {
      if (error.code === 4902) {
        // This error code indicates that the chain has not been added to MetaMask
        try {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: hexValue(targetChain.chainId),
                chainName: targetChain.chainName,
                nativeCurrency: targetChain.nativeCurrency,
                blockExplorerUrls: targetChain.blockExplorerUrls,
                rpcUrls: targetChain.rpcUrls,
              },
            ],
          });
        } catch (addError) {
          console.error(addError);
        }
      }
      console.error(error);
    }
  }

  return (
    <Stack height="100vh" alignItems="center" justifyContent="center">
      <ConnectionErrorCard
        errorMessage="You are connected to an unsupported network!"
        afterCardContent={
          <CardActions>
            <Button
              fullWidth
              size="large"
              bg="yellowContainedSecondary"
              onClick={() => {
                // @todo this should be done in chainWatcherProvider somehow
                setOverrideTargetChain(undefined);
                // @todo should be done in useDapp itself
                setShouldConnectMetamask(false);
                // @todo deactivation should reload the page in particular situations
                deactivate();
                window.location.reload();
              }}
            >
              {t("base.disconnect")}
            </Button>
            <Button
              fullWidth
              bg="yellowContained"
              size="large"
              onClick={() => switchChain()}
            >
              Switch to {targetChain.chain}
            </Button>
          </CardActions>
        }
      />
    </Stack>
  );
};

export default withTranslation()(UnsupportedChain);
