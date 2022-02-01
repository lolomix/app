import React from "react";
import { withTranslation } from "react-i18next";
import { useEthers } from "@usedapp/core";
import { useSnackbar } from "notistack";
// material-ui
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
// custom
import { NETWORKS, TARGET_CHAIN } from "../../web3/constants";
import { getErrorMessage } from "../../web3/errors";
import { useChefPrice } from "../../hooks/useChefPrice";
import { formatCurrency } from "../../utils/formatters";
import { useAromaApprove } from "../../hooks/useAromaApprove";
import { useChefBuy } from "../../hooks/useChefBuy";
import SnackbarAction from "../snackbars/SnackbarAction";
import NftCard from "./NftCard";

function NftBuy({ t, remainingFormatted }) {
  const { error, active } = useEthers();
  const [price, priceFormatted] = useChefPrice();

  let transactionInProgressSnackBarKey = "transactionInProgress";
  let walletInteractionSnackBarKey = "walletInteraction";

  const [buyDialog, setBuyDialog] = React.useState(false);
  const [successDialog, setSuccessDialog] = React.useState(false);

  const contractAddressChef = NETWORKS[TARGET_CHAIN].contractMaster;

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const handleBuyDialog = () => {
    setBuyDialog(!buyDialog);
  };
  const handleSuccessDialog = () => {
    setSuccessDialog(!successDialog);
  };

  /**
   * Defines Aroma Approval State
   *
   * @todo: refactors due to duplication
   */
  const [sendAromaApproval, aromaApprovalState] = useAromaApprove();

  React.useEffect(() => {
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
   * Handles Aroma Approval a blockchain transaction
   */
  const handleApprove = async () => {
    enqueueSnackbar("Waiting for interaction in Wallet", {
      key: walletInteractionSnackBarKey,
      variant: "warning",
      persist: true,
      action: <SnackbarAction />,
    });

    try {
      await sendAromaApproval(contractAddressChef, price);
    } catch (error) {
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

  React.useEffect(() => {
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
    }
  }, [chefBuyState, closeSnackbar, enqueueSnackbar]);

  /**
   * Handles Chef Buy blockchain transaction
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
      enqueueSnackbar("Error", {
        variant: "error",
      });
    }
  };

  /**
   * Definition of the transaction in progress state
   */
  const [transactionInProgress, setTransactionInProgress] =
    React.useState(false);

  React.useEffect(() => {
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
            You can only buy a CHEF NFT with AROMA.
          </Typography>
          <Typography p={1} variant="body2" gutterBottom>
            1. Approve AROMA token which gives our app permission.
            <br />
            2. Buy the CHEF NFT with AROMA Token.
          </Typography>
          <Typography variant="caption" gutterBottom>
            (We only approve {formatCurrency(priceFormatted)} AROMA per approval
            transaction. You can increase in your wallet before confirming the
            transaction)
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            disableElevation
            onClick={handleBuyDialog}
            variant="contained"
            color="primary"
          >
            {t("base.close")}
          </Button>
          <Button
            disableElevation
            onClick={handleApprove}
            variant="contained"
            disabled={transactionInProgress}
          >
            Approve AROMA
          </Button>
          <Button
            disableElevation
            onClick={handleBuy}
            variant="contained"
            disabled={transactionInProgress}
          >
            Buy CHEF NFT
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
            You bought a CryptoChefs NFT. Click on my account (top right) to see
            the ID of your CHEF.
          </Typography>
          <Typography variant="body1" gutterBottom>
            Please check our Discord server to learn when the NFTs will be
            revealed.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            disableElevation
            variant="contained"
            component="a"
            href="https://discord.gg/JufpFYBdKG"
            target="_blank"
            rel="noopener"
          >
            Go to Discord
          </Button>
          <Button
            disableElevation
            onClick={handleSuccessDialog}
            variant="contained"
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
