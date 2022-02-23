import ConnectionErrorCard from "../../components/common/ConnectionErrorCard";
import { Button, CardActions, Stack } from "@mui/material";
import {
  getChainById,
  Polygon,
  Rinkeby,
  useEthers,
  useLocalStorage,
} from "@usedapp/core";
import { NETWORKS, TARGET_CHAIN } from "../../web3/constants";
import { withTranslation } from "react-i18next";
import { useChainWatcher } from "../../contexts/chainWatcher/chainWatcherContext";

/**
 * @returns {JSX.Element}
 * @constructor
 */
const UnsupportedChain = ({ t }) => {
  const { deactivate } = useEthers();
  const { setOverrideTargetChain } = useChainWatcher();

  // @todo should be done in useDapp itself
  const [, setShouldConnectMetamask] = useLocalStorage("shouldConnectMetamask");

  // @todo deprecate TARGET_CHAIN
  let appTargetChainId =
    TARGET_CHAIN === "polygon" ? Polygon.chainId : Rinkeby.chainId;
  const { chainName } = getChainById(appTargetChainId);

  async function switchChain() {
    try {
      // check if the chain to connect to is installed
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: NETWORKS[appTargetChainId].chainIdHex }], // chainId must be in hexadecimal numbers
      });
    } catch (error) {
      if (error.code === 4902) {
        // This error code indicates that the chain has not been added to MetaMask
        try {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: NETWORKS[appTargetChainId].chainIdHex,
                chainName: chainName,
                nativeCurrency: NETWORKS[appTargetChainId].nativeCurrency,
                blockExplorerUrls: NETWORKS[appTargetChainId].blockExplorerUrls,
                rpcUrls: NETWORKS[appTargetChainId].rpcUrls,
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
              Switch to {chainName}
            </Button>
          </CardActions>
        }
      />
    </Stack>
  );
};

export default withTranslation()(UnsupportedChain);
