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
  Box,
  Button,
  Container,
  Typography,
  Grid,
} from "@mui/material";
// custom
import { NETWORKS, TARGET_CHAIN } from "../../web3/constants";
import { getErrorMessage } from "../../web3/errors";
import { useChefPrice } from "../../hooks/useChefPrice";
import { formatCurrency } from "../../utils/formatters";
import { useChefSeasonRemaining } from "../../hooks/useChefSeasonRemaining";
import { useChefTotalSupply } from "../../hooks/useChefTotalSupply";
import { useAromaApprove } from "../../hooks/useAromaApprove";
import { useChefBuy } from "../../hooks/useChefBuy";
import SnackbarAction from "../snackbars/SnackbarAction";
import NftCard from "./NftCard";
import styled from "@emotion/styled";

const CustomBanner = styled(Box, {
  shouldForwardProp: (prop) => prop !== "color" && prop !== "size",
})(({ position, theme }) => ({
  ...(position === "right" && {
    width: "200px",
    height: "180px",
    position: "relative",
    bottom: 350,
    left: 450,
    borderRadius: 40,
    transform: "rotate(17deg)",
    [theme.breakpoints.down("lg")]: {
      width: "100%",
      height: "auto",
      position: "static",
      borderRadius: 15,
      transform: "none",
      marginTop: 40,
    },
    background: "#4B6272 0% 0% no-repeat ",
    color: theme.palette.common.white,
    border: "7px solid #1111111A",
    textAlign: "center",
    paddingBottom: 12,
  }),
}));

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
      {active ? (
        <Container maxWidth="xs" disableGutters sx={{ padding: 6 }}>
          <NftCard
            tokenAbi={[]}
            firstCard={true}
            remainingFormatted={remainingFormatted}
            handleBuyDialog={handleBuyDialog}
            transactionInProgress={transactionInProgress}
            priceFormatted={formatCurrency(priceFormatted)}
          />
          <CustomBanner position="right">
            <Grid container justifyContent="center" alignItems="center" py={2}>
              <Grid item xs={12} sm={3.5} lg={12} order={{xs: 2, lg: 1}}>
                <Typography variant="h2" fontWeight={800}>
                  {remainingFormatted}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} lg={12} order={{xs: 1, lg: 2}}>
                <Typography variant="h3" fontWeight={800} >
                  Remaining
                </Typography>
              </Grid>
            </Grid>
            <Typography variant="h3" fontWeight={800} sx={{ opacity: "0.8" }}>
              Sold {soldFormatted} 
            </Typography>
          </CustomBanner>
        </Container>
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
    </Fragment>
  );
}

export default withTranslation()(NftBuy);
