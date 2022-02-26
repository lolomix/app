import { useState, useEffect, useCallback } from "react";
import { withTranslation } from "react-i18next";
import { useConfig, useEthers } from "@usedapp/core";
import { useSnackbar } from "notistack";
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
import CurrencyInputField from "../form/CurrencyInputField";
import { NETWORKS } from "../../web3/constants";
import { formatCurrency } from "../../utils/formatters";
import { useAromaPrice } from "../../hooks/aroma/useAromaPrice";
import { useAromaBuy } from "../../hooks/aroma/useAromaBuy";
import { parseUnits } from "@ethersproject/units";
import {
  SUCCESS,
  usePromiseTransactionSnackbarManager,
} from "../../hooks/snackbar/usePromiseTransactionSnackbarManager";

/**
 * @param t
 * @param enableCurrencySwitch
 * @returns {JSX.Element}
 * @constructor
 */
function CurrencyExchange({ t, enableCurrencySwitch = false }) {
  const { readOnlyChainId } = useConfig();
  const { account } = useEthers();
  const { enqueueSnackbar } = useSnackbar();
  const price = useAromaPrice();

  /**
   * Definition of the success dialog state
   */
  const [successDialog, setSuccessDialog] = useState(false);

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

  useEffect(() => {
    setCurrencyFrom(NETWORKS[readOnlyChainId].nativeCurrency.symbol);
  }, [readOnlyChainId]);

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
  const [[transactionInProgress]] = usePromiseTransactionSnackbarManager(
    aromaBuyState,
    useCallback((status) => {
      if (status === SUCCESS) setSuccessDialog(true);
    }, [])
  );

  /**
   * Handles the actual exchange by triggering a blockchain transaction
   *
   * @todo: maybe we should decouple validation
   */
  const handleExchange = async () => {
    if (
      isNaN(currencyToAmount) ||
      currencyToAmount % 1 !== 0 ||
      currencyToAmount < 5 ||
      currencyToAmount > 10000
    ) {
      const message = t(
        "exceptions.execution reverted: token count is out of the allowd range",
        {
          ns: "contract",
        }
      );
      enqueueSnackbar(message, {
        variant: "error",
      });
      return;
    }

    await sendAromaBuy(currencyToAmount, {
      value: parseUnits(price)?.mul(currencyToAmount),
    });
  };

  /**
   * Handles the user input field (to and from conversion)
   *
   * todo: connect to web3
   */
  const handleCurrencyToUserInput = (event) => {
    setCurrencyToAmount(event.target.value);
    setCurrencyFromAmount(event.target.value * price);
  };

  return (
    <Card elevation={3}>
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
        <Stack spacing={1.5} alignItems="center">
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
          {account ? (
            <LoadingButton
              size="massive"
              bg="yellowContained"
              fullWidth
              onClick={handleExchange}
              loading={transactionInProgress}
            >
              {t("components.CurrencyExchange.exchangeButton")}
            </LoadingButton>
          ) : (
            // @todo is this the right place to handle such things?
            <Button size="massive" bg="yellowContained" fullWidth disabled>
              Connect Wallet
            </Button>
          )}
          <Chip
            label={
              "For 1 " +
              NETWORKS[readOnlyChainId].nativeCurrency.symbol +
              " you get " +
              formatCurrency(1 / price) +
              " AROMA tokens."
            }
            size="small"
            icon={
              (enableCurrencySwitch && (
                <ShowChart onClick={switchCurrencies} />
              )) || <ShowChart />
            }
          />
        </Stack>
      </CardContent>
      <Dialog
        maxWidth="md"
        onClose={() => setSuccessDialog(false)}
        open={successDialog}
      >
        <DialogTitle>Congratulations</DialogTitle>
        <DialogContent>
          <Typography variant="body1" gutterBottom>
            You've acquired some AROMA tokens, you can see your balance in the
            top left corner.
          </Typography>
          <Typography variant="body1" gutterBottom>
            Get yourself some CHEFs or cook a recipe!
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            disableElevation
            elongatedwidth="30"
            onClick={() => setSuccessDialog(false)}
            bg="yellowContainedSecondary"
            size="large"
            color="primary"
          >
            {t("base.close")}
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}

export default withTranslation()(CurrencyExchange);
