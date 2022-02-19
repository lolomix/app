import { useCallback } from "react";
import { withTranslation } from "react-i18next";
import { useEthers } from "@usedapp/core";
import {
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  Button,
  Typography,
} from "@mui/material";
import { NETWORKS, TARGET_CHAIN } from "../../web3/constants";
import { useChefPrice } from "../../hooks/chef/useChefPrice";
import { formatCurrency } from "../../utils/formatters";
import { useAromaApprove } from "../../hooks/aroma/useAromaApprove";
import { useChefBuy } from "../../hooks/chef/useChefBuy";
import NftCard from "./NftCard";
import { parseUnits } from "@ethersproject/units";
import {
  SUCCESS,
  usePromiseTransactionSnackbarManager,
} from "../../hooks/snackbar/usePromiseTransactionSnackbarManager";
import { useDialogState } from "../../hooks/state/useDialogState";
import { bindDialog } from "../../utils/binders";

function NftBuy({ t, remaining }) {
  const spenderAddress = NETWORKS[TARGET_CHAIN].contractMaster;
  const { account } = useEthers();
  const price = useChefPrice();

  const buyDialogState = useDialogState({
    dialogId: "buyDialog",
  });

  const successDialogState = useDialogState({
    dialogId: "successDialog",
  });

  /**
   * Defines Aroma Approval State
   */
  const [sendAromaApproval, aromaApprovalState] = useAromaApprove();
  const [
    [aromaApprovalTransactionInProgress],
    [aromaApprovalPendingSignature],
  ] = usePromiseTransactionSnackbarManager(aromaApprovalState);

  /**
   * Defines Chef Buy State
   */
  const [sendChefBuy, chefBuyState] = useChefBuy();
  const [[chefBuyTransactionInProgress], [chefBuyPendingSignature]] =
    usePromiseTransactionSnackbarManager(
      chefBuyState,
      useCallback((status) => {
        if (status === SUCCESS) {
          successDialogState.handleOpen();
          buyDialogState.handleClose();
        }
        // @todo maybe we should have wrap the handle functions in useCallback instead
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [])
    );

  /**
   * Handles AROMA Approval and CHEF Buy blockchain transaction
   */
  const handleApproveAndBuy = async () => {
    await sendAromaApproval(spenderAddress, parseUnits(price));
    await sendChefBuy();
  };

  const transactionInProgress = () =>
    aromaApprovalTransactionInProgress ||
    aromaApprovalPendingSignature ||
    chefBuyTransactionInProgress ||
    chefBuyPendingSignature;

  return (
    <>
      <NftCard
        tokenAbi={[]}
        firstCard={true}
        remaining={remaining}
        handleBuyDialog={buyDialogState.handleOpen}
        transactionInProgress={transactionInProgress()}
        price={formatCurrency(price)}
      />
      <Dialog keepMounted maxWidth="md" {...bindDialog(buyDialogState)}>
        <DialogTitle>Buy a CHEF</DialogTitle>
        <DialogContent>
          <Typography variant="body1" gutterBottom>
            You can only buy a CHEF NFT with AROMA. You'll be prompted with{" "}
            <strong>two transactions</strong>, one after other.
          </Typography>
          <Typography p={1} variant="body2" gutterBottom>
            1. The approval of AROMA tokens* which gives our app permission to
            spend it on a CHEF.
            <br />
            2. The purchase of the CHEF NFT with your approved AROMA Token.
          </Typography>
          <Typography variant="caption" gutterBottom>
            *We only approve {formatCurrency(price)} AROMA per transaction. You
            can increase this from the popup window of your wallet before
            confirming the transaction.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            disableElevation
            elongatedwidth="30"
            bg="yellowContainedSmall"
            onClick={buyDialogState.handleClose}
          >
            {t("base.close")}
          </Button>
          {account ? (
            <Button
              disableElevation
              elongatedwidth="30"
              bg="yellowContained"
              onClick={handleApproveAndBuy}
              disabled={transactionInProgress()}
            >
              Approve & Buy CHEF
            </Button>
          ) : (
            <Button
              disableElevation
              elongatedwidth="30"
              bg="yellowContainedSmall"
              disabled
            >
              Please Connect Wallet
            </Button>
          )}
        </DialogActions>
      </Dialog>
      <Dialog keepMounted maxWidth="md" {...bindDialog(successDialogState)}>
        <DialogTitle>Congratulations</DialogTitle>
        <DialogContent>
          <Typography variant="body1" gutterBottom>
            You bought a CHEF (a CryptoChefs NFT). Click on my account (top
            right) to see the ID of your CHEF.
          </Typography>
          <Typography variant="body1" gutterBottom>
            Please check our Discord server to learn more about your NFTs and
            the Recipes you can cook.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            disableElevation
            elongatedwidth="30"
            bg="yellowContained"
            color="primary"
            component="a"
            onClick={successDialogState.handleClose}
          >
            {t("base.close")}
          </Button>
          <Button
            disableElevation
            elongatedwidth="30"
            bg="yellowContained"
            href="https://discord.gg/JufpFYBdKG"
            target="_blank"
            rel="noopener"
          >
            Go to Discord
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default withTranslation()(NftBuy);
