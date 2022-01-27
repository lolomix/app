import React, { useState } from "react";
import { withTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { useEthers } from "@usedapp/core";
import { useSnackbar } from "notistack";
// material-ui
import { LoadingButton } from "@mui/lab";
import { KeyboardArrowDown, ShowChart } from "@mui/icons-material";
import {
  Card,
  CardContent,
  Typography,
  Stack,
  Divider,
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
// custom
import CurrencyInputField from "../form/CurrencyInputField";
import { NETWORKS, TARGET_CHAIN } from "../../web3/constants";
import { formatCurrency } from "../../utils/formatters";
import { getErrorMessage } from "../../web3/errors";
import { useAromaPrice } from "../../hooks/useAromaPrice";
import { useAromaBuy } from "../../hooks/useAromaBuy";
import SnackbarAction from "../snackbars/SnackbarAction";

/**
 * @param t
 * @param enableCurrencySwitch
 * @returns {JSX.Element}
 * @constructor
 */
function CurrencyExchange({ t, enableCurrencySwitch = false }) {
  const { error, active } = useEthers();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [price, priceFormatted] = useAromaPrice();

  let transactionInProgressSnackBarKey = "transactionInProgress";
  let walletInteractionSnackBarKey = "walletInteraction";

  /**
   * Definition of the success dialog state
   */
  const [successDialog, setSuccessDialog] = React.useState(false);

  /**
   * Definition of the currency input field amounts/values
   */
  const [currencyFromAmount, setCurrencyFromAmount] = useState(0);
  const [currencyToAmount, setCurrencyToAmount] = useState(0);

  /**
   * Definition of the exchange currencies
   */
  const [currencyFrom, setCurrencyFrom] = useState("MATIC");
  const [currencyTo, setCurrencyTo] = useState("AROMA");

  React.useEffect(() => {
    setCurrencyFrom(NETWORKS[TARGET_CHAIN].nativeCurrency.symbol);
  }, []);

  /**
   * Handles the switch of currencies if `enableCurrencySwitch` is enabled
   */
  const switchCurrencies = () => {
    // if currency switch is not enabled return early
    if (!enableCurrencySwitch) return;
    setCurrencyTo(currencyFrom);
    setCurrencyFrom(currencyTo);
  };

  /**
   * Definition of the aroma buy state
   */
  const [sendAromaBuy, aromaBuyState] = useAromaBuy();

  React.useEffect(() => {
    if (aromaBuyState.status === "None") {
      setTransactionInProgress(false);
    }

    if (aromaBuyState.status === "Exception") {
      setTransactionInProgress(false);
      enqueueSnackbar("Something must have gone wrong", {
        variant: "error",
      });
    }

    if (aromaBuyState.status === "Mining") {
      setTransactionInProgress(true);
    }

    if (aromaBuyState.status === "Success") {
      setTransactionInProgress(false);
      enqueueSnackbar("Transaction was successful", {
        variant: "success",
      });
      setSuccessDialog(true);
    }
  }, [aromaBuyState, closeSnackbar, enqueueSnackbar]);

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
    walletInteractionSnackBarKey,
    transactionInProgressSnackBarKey,
  ]);

  /**
   * Handles the actual exchange by triggering a blockchain transaction
   */
  const handleExchange = async () => {
    if (
      isNaN(currencyToAmount) ||
      currencyToAmount % 1 !== 0 ||
      currencyToAmount < 5 ||
      currencyToAmount > 10000
    ) {
      enqueueSnackbar("Invalid input amount", {
        variant: "error",
      });

      return;
    }

    enqueueSnackbar("Waiting for interaction in Wallet", {
      key: walletInteractionSnackBarKey,
      variant: "warning",
      persist: true,
      action: <SnackbarAction />,
    });

    try {
      await sendAromaBuy(currencyToAmount, { value: currencyToAmount * price });
    } catch (error) {
      enqueueSnackbar("Something must have gone wrong", {
        variant: "error",
      });
    }
  };

  /**
   * Handles the user input field (to and from conversion)
   * todo: connect to web3
   */
  const handleCurrencyToUserInput = (event) => {
    setCurrencyToAmount(event.target.value);
    setCurrencyFromAmount(event.target.value * priceFormatted);
  };

  return (
    <Card elevation={3}>
      {active ? (
        <CardContent>
          <Typography
            variant="h4"
            component="h2"
            color="secondary"
            align="center"
            mb={4}
          >
            {t("components.CurrencyExchange.title")}
          </Typography>
          <Stack spacing={2.5} alignItems="center">
            <CurrencyInputField
              id="token-exchange-from"
              disabled
              required
              currency={currencyFrom}
              label="You Pay"
              type="sell"
              value={currencyFromAmount}
            />
            <Divider flexItem>
              <Chip
                size="small"
                sx={{
                  "> .MuiChip-label": {
                    padding: "0 4px",
                  },
                }}
                icon={<KeyboardArrowDown />}
              />
            </Divider>
            <CurrencyInputField
              id="token-exchange-to"
              currency={currencyTo}
              label="You Get"
              type="buy"
              onUserInput={(e) => handleCurrencyToUserInput(e)}
              value={currencyToAmount}
              required
            />
            <Typography variant="body2" gutterBottom>
              Please enter amount between 5 and 10 000 AROMA
            </Typography>
            <LoadingButton
              size="xlarge"
              variant="yellowContained"
              fullWidth
              onClick={handleExchange}
              loading={transactionInProgress}
            >
              {t("components.CurrencyExchange.exchangeButton")}
            </LoadingButton>
            <Chip
              label={
                "For 1 " +
                NETWORKS[TARGET_CHAIN].nativeCurrency.symbol +
                " you get " +
                formatCurrency(1 / priceFormatted) +
                " AROMA tokens."
              }
              sx={{ margin: "8px 0" }}
              size="small"
              icon={
                (enableCurrencySwitch && (
                  <ShowChart onClick={switchCurrencies} />
                )) || <ShowChart />
              }
            />
          </Stack>
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
      <Dialog
        maxWidth="md"
        onClose={() => setSuccessDialog(false)}
        open={successDialog}
      >
        <DialogTitle>Congratulations</DialogTitle>
        <DialogContent>
          <Typography variant="body1" gutterBottom>
            You acquired some AROMA tokens. Check the balance in your account
            (top right)
          </Typography>
          <Typography variant="body1" gutterBottom>
            Now go on and get your CryptoChefs NFT!
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            disableElevation
            onClick={() => setSuccessDialog(false)}
            variant="contained"
            color="primary"
          >
            {t("base.close")}
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}

/**
 * @type {{enableCurrencySwitch: Requireable<boolean>}}
 */
CurrencyExchange.propTypes = {
  enableCurrencySwitch: PropTypes.bool,
};

export default withTranslation()(CurrencyExchange);
