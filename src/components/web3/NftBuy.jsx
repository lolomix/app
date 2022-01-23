import React, { Fragment } from "react";
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
  Divider,
  Button,
  Grid,
  Paper,
  Typography,
  lighten,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
// custom
import { NETWORKS, TARGET_CHAIN } from "../../web3/constants";
import ChefSilhouetteIcon from "../icons/ChefSilhouetteIcon";
import { getErrorMessage } from "../../web3/errors";
import { theme } from "../../utils/theme";
import { useChefPrice } from "../../hooks/useChefPrice";
import { formatCurrency } from "../../utils/formatters";
import { useChefSeasonRemaining } from "../../hooks/useChefSeasonRemaining";
import { useChefTotalSupply } from "../../hooks/useChefTotalSupply";
import { useAromaApprove } from "../../hooks/useAromaApprove";
import { useChefBuy } from "../../hooks/useChefBuy";
import SnackbarAction from "../snackbars/SnackbarAction";

function NftBuy({ t }) {
  const { error, active } = useEthers();
  const [, soldFormatted] = useChefTotalSupply();
  const [, remainingFormatted] = useChefSeasonRemaining();
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
    <Fragment>
      <Card fullheight="true" elevation={3}>
        {active ? (
          <CardContent>
            <Typography variant="h4" component="h2" align="center" mb={4}>
              {t("components.NftBuy.title")}
            </Typography>
            <Grid
              container
              spacing={4}
              justifyContent="center"
              alignItems="stretch"
            >
              <Grid item xs={12} md={6}>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  textAlign="center"
                  mt={3}
                  sx={{ textTransform: "uppercase" }}
                >
                  {t("components.NftBuy.remaining")}
                </Typography>
                <Typography
                  gutterBottom
                  variant="h1"
                  component="div"
                  textAlign="center"
                  color="primary"
                  sx={{ textTransform: "uppercase", fontWeight: "bold" }}
                >
                  {remainingFormatted}
                </Typography>
                <Typography
                  gutterBottom
                  variant="h6"
                  component="div"
                  textAlign="center"
                  mb={3}
                  sx={{ textTransform: "uppercase" }}
                >
                  {soldFormatted} {t("components.NftBuy.sold")}
                </Typography>

                <Divider variant="middle" />

                <Grid
                  container
                  alignContent="center"
                  alignItems="center"
                  mt={3}
                  mb={6}
                >
                  <Grid item xs p={1}>
                    <Typography
                      textAlign="center"
                      sx={{ textTransform: "uppercase" }}
                    >
                      {t("components.NftBuy.season")}
                    </Typography>
                    <Typography
                      textAlign="center"
                      color="primary"
                      sx={{ textTransform: "uppercase", fontWeight: "bold" }}
                    >
                      ONE
                    </Typography>
                  </Grid>

                  <Divider flexItem orientation="vertical" />

                  <Grid item xs p={1}>
                    <Typography
                      variant="body2"
                      textAlign="center"
                      sx={{ textTransform: "uppercase" }}
                    >
                      {t("components.NftBuy.pricePerCHEF")}
                    </Typography>
                    <Typography
                      variant="h5"
                      color="primary"
                      textAlign="center"
                      sx={{ fontWeight: "bold", textTransform: "uppercase" }}
                    >
                      {formatCurrency(priceFormatted)} AROMA
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid
                item
                sm={12}
                md={6}
                spacing={4}
                container
                justifyContent="center"
              >
                <Grid item xs={12}>
                  <Paper
                    elevation={0}
                    sx={{
                      backgroundColor: lighten(
                        theme.palette.primary.main,
                        0.91
                      ),
                    }}
                  >
                    <Grid
                      container
                      justifyContent="center"
                      alignItems="center"
                      minHeight="250px"
                    >
                      <Grid item xs={6}>
                        <Card elevation={1}>
                          <CardContent>
                            <ChefSilhouetteIcon
                              sx={{ width: "100%", height: "auto" }}
                            />
                          </CardContent>
                        </Card>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
                <Grid item xs={12}>
                  <LoadingButton
                    disabled={!remainingFormatted}
                    size="xlarge"
                    variant="contained"
                    fullWidth
                    onClick={handleBuyDialog}
                    loading={transactionInProgress}
                  >
                    {!!remainingFormatted
                      ? t("components.NftBuy.buyButton")
                      : t("components.NftBuy.soldOut")}
                  </LoadingButton>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        ) : (
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
        )}
      </Card>
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
    </Fragment>
  );
}

export default withTranslation()(NftBuy);