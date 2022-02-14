import { useCallback, useEffect, useState } from 'react'
import { withTranslation } from "react-i18next";
import { useEthers } from "@usedapp/core";
import { useSnackbar } from "notistack";
import {
  Card,
  CardContent,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  Button,
  Typography,
} from "@mui/material";
import { NETWORKS, TARGET_CHAIN } from "../../web3/constants";
import { getErrorMessage } from "../../web3/errors";
import { useChefPrice } from "../../hooks/chef/useChefPrice";
import { formatCurrency } from "../../utils/formatters";
import { useAromaApprove } from "../../hooks/aroma/useAromaApprove";
import { useChefBuy } from "../../hooks/chef/useChefBuy";
import SnackbarAction from "../snackbars/SnackbarAction";
import NftCard from "./NftCard";
import { parseUnits } from '@ethersproject/units'

function NftBuy({ t, remainingFormatted }) {
  const { error, active } = useEthers();
  const priceFormatted = useChefPrice();

  let transactionInProgressSnackBarKey = "transactionInProgress";
  let walletInteractionSnackBarKey = "walletInteraction";

  const [buyDialog, setBuyDialog] = useState(false);
  const [successDialog, setSuccessDialog] = useState(false);

  const contractAddressChef = NETWORKS[TARGET_CHAIN].contractMaster;

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const handleBuyDialog = useCallback(() => {
    setBuyDialog((prev) => !prev);
  }, []);

  const handleSuccessDialog = useCallback(() => {
    setSuccessDialog((prev) => !prev);
  }, []);

  /**
   * Defines Aroma Approval State
   *
   * @todo: refactors due to duplication
   */
  const [sendAromaApproval, aromaApprovalState] = useAromaApprove();

  useEffect(() => {
    if (aromaApprovalState.status === "None") {
      setTransactionInProgress(false);
    }

    if (aromaApprovalState.status === "Exception") {
      setTransactionInProgress(false);
      enqueueSnackbar("Something must have gone wrong", {
        variant: "error",
      });
    }

    if (aromaApprovalState.status === "Mining") {
      setTransactionInProgress(true);
    }

    if (aromaApprovalState.status === "Success") {
      setTransactionInProgress(false);
      enqueueSnackbar("Success", {
        variant: "success",
      });
    }
  }, [aromaApprovalState, closeSnackbar, enqueueSnackbar]);

  /**
   * Handles AROMA Approval a blockchain transaction
   */
  const handleApprove = async () => {
    enqueueSnackbar("Waiting for interaction in Wallet", {
      key: walletInteractionSnackBarKey,
      variant: "warning",
      persist: true,
      action: <SnackbarAction />,
    });

    try {
      await sendAromaApproval(contractAddressChef, parseUnits(priceFormatted));
    } catch (error) {
      closeSnackbar(walletInteractionSnackBarKey);
      enqueueSnackbar("Error", {
        variant: "error",
      });
    }
  };

  /**
   * Defines Chef Buy State
   *
   * @todo: refactors due to duplication
   */
  const [sendChefBuy, chefBuyState] = useChefBuy();

  useEffect(() => {
    if (chefBuyState.status === "None") {
      setTransactionInProgress(false);
    }

    if (chefBuyState.status === "Exception") {
      setTransactionInProgress(false);
      enqueueSnackbar("Something must have gone wrong", {
        variant: "error",
      });
    }

    if (chefBuyState.status === "Mining") {
      setTransactionInProgress(true);
    }

    if (chefBuyState.status === "Success") {
      setTransactionInProgress(false);
      enqueueSnackbar("Success", {
        variant: "success",
      });
      handleBuyDialog();
      handleSuccessDialog();
    }
  }, [
    chefBuyState,
    closeSnackbar,
    enqueueSnackbar,
    handleBuyDialog,
    handleSuccessDialog,
  ]);

  /**
   * Handles CHEF Buy blockchain transaction
   */
  const handleBuy = async () => {
    enqueueSnackbar("Waiting for interaction in Wallet", {
      key: walletInteractionSnackBarKey,
      variant: "warning",
      persist: true,
      action: <SnackbarAction />,
    });

    try {
      await sendChefBuy();
    } catch (error) {
      closeSnackbar(walletInteractionSnackBarKey);
      enqueueSnackbar("Error", {
        variant: "error",
      });
    }
  };

  /**
   * Handles AROMA Approval and CHEF Buy blockchain transaction
   */
  const handleApproveAndBuy = async () => {
    await handleApprove();
    await handleBuy();
  };

  /**
   * Definition of the transaction in progress state
   */
  const [transactionInProgress, setTransactionInProgress] = useState(false);

  useEffect(() => {
    if (transactionInProgress === false) {
      closeSnackbar(transactionInProgressSnackBarKey);
      return;
    }
    closeSnackbar(walletInteractionSnackBarKey);
    enqueueSnackbar("Transaction in progress", {
      key: transactionInProgressSnackBarKey,
      variant: "warning",
      persist: true,
      action: <SnackbarAction />,
    });
  }, [
    transactionInProgress,
    enqueueSnackbar,
    closeSnackbar,
    transactionInProgressSnackBarKey,
    walletInteractionSnackBarKey,
  ]);

  return (
    <>
      {active ? (
        <NftCard
          tokenAbi={[]}
          firstCard={true}
          remainingFormatted={remainingFormatted}
          handleBuyDialog={handleBuyDialog}
          transactionInProgress={transactionInProgress}
          priceFormatted={formatCurrency(priceFormatted)}
        />
      ) : (
        <Card fullheight="true" elevation={3}>
          <CardContent>
            <Typography variant="body2" my={4}>
              {getErrorMessage(error)}
            </Typography>
            <Button
              variant="contained"
              component="a"
              href="https://cryptochefs.medium.com/"
              target="_blank"
              rel="noopener"
            >
              Learn more
            </Button>
          </CardContent>
        </Card>
      )}
      <Dialog
        onClose={handleBuyDialog}
        open={buyDialog}
        keepMounted
        maxWidth="md"
      >
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
            *We only approve {formatCurrency(priceFormatted)} AROMA per
            transaction. You can increase this from the popup window of your
            wallet before confirming the transaction.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            disableElevation
            elongatedWidth
            onClick={handleBuyDialog}
            variant="yellowContainedSmall"
            color="primary"
          >
            {t("base.close")}
          </Button>
          <Button
            disableElevation
            elongatedWidth
            onClick={handleApproveAndBuy}
            variant="yellowContainedSmall"
            disabled={transactionInProgress}
          >
            Approve & Buy CHEF
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        onClose={handleSuccessDialog}
        open={successDialog}
        keepMounted
        maxWidth="md"
      >
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
            elongatedWidth
            variant="yellowContainedSmall"
            component="a"
            href="https://discord.gg/JufpFYBdKG"
            target="_blank"
            rel="noopener"
          >
            Go to Discord
          </Button>
          <Button
            disableElevation
            elongatedWidth
            onClick={handleSuccessDialog}
            variant="yellowContainedSmall"
            color="primary"
          >
            {t("base.close")}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default withTranslation()(NftBuy);
