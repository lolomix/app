import React, { useState } from "react";
import { withTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { useWeb3React } from "@web3-react/core";
import { useSnackbar } from "notistack";
// material-ui
import LoadingButton from "@mui/lab/LoadingButton";
import { KeyboardArrowDown, ShowChart } from "@mui/icons-material";
import { Card, CardContent, Typography, Stack, Divider, Chip } from "@mui/material";
// custom
import CurrencyInputField from "./form/CurrencyInputField";
import { NETWORKS, TARGET_CHAIN, ETHER_IN_WEI } from "../web3/constants";
import abi from "../web3/abi/CryptoChefsERC721Facet.json";
import ToastLoading from "./notification/ToastLoading";
import ToastLoadingIndeterminate from "./notification/ToastLoadingIndeterminate";
import { formatCurrency } from "../utils/formatters";

function CurrencyExchange({ t, fullHeight, web3ready, enableCurrencySwitch }) {
  const { account, library } = useWeb3React();
  const [price, setPrice] = React.useState();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  React.useEffect(() => {
    if (!!account && !!library) {
      async function loadPrice() {
        try {
          const contractMaster = NETWORKS[TARGET_CHAIN].contractMaster;
          const contract = new library.eth.Contract(abi, contractMaster);
          const price = await contract.methods.getAROMAPrice().call();
          setPrice(price);
          //console.log(price);
        } catch (e) {
          console.log(e);
        }
      }
      loadPrice();
    }
  }, [account, library]); // ensures refresh if referential identity of library doesn't change across chainIds

  /**
   * Definition of the currency input field amounts/values
   * todo: maybe set different initial amount??
   */
  const [currencyFromAmount, setCurrencyFromAmount] = useState(0);
  const [currencyToAmount, setCurrencyToAmount] = useState(0);

  /**
   * Definition of the exchange currencies
   */
  const [currencyFrom, setCurrencyFrom] = useState("MATIC");
  const [currencyTo, setCurrencyTo] = useState("AROMA");

  React.useEffect(() => {
    setCurrencyFrom(NETWORKS[TARGET_CHAIN].nativeToken)
  }, [])

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
   * Definition of the `Exchange` Button loading state
   */
  const [exchangeLoading, setExchangeLoading] = React.useState(false);

  /**
   * Handles the actual exchange by triggering the blockchain transaction
   */
  const handleExchange = async () => {
    setExchangeLoading(true);
    let loadingSnackbar = enqueueSnackbar("Transaction ongoing", {
      variant: "warning",
      persist: true,
      action: <ToastLoadingIndeterminate />,
    });
    const contractMaster = NETWORKS[TARGET_CHAIN].contractMaster;
    const contract = new library.eth.Contract(abi, contractMaster);
    console.log("currencyToAmount");
    console.log(currencyToAmount);
    console.log("currencyFromAmount");
    console.log(currencyFromAmount);
    try {
      const result = await contract.methods.buyAROMA(currencyToAmount).send({ value: currencyToAmount * price, from: account, gas: 10000000 });
      console.log(result);
      setExchangeLoading(false);
      closeSnackbar(loadingSnackbar);
      enqueueSnackbar("Success", {
        variant: "success",
        action: (snackKey) => <ToastLoading snackKey={snackKey} closeSnackbar={closeSnackbar} />,
      });
    } catch (error) {
      console.log(error);
      setExchangeLoading(false);
      closeSnackbar(loadingSnackbar);
      enqueueSnackbar("Error", {
        variant: "error",
        action: (snackKey) => <ToastLoading snackKey={snackKey} closeSnackbar={closeSnackbar} />,
      });
    }
  };

  /**
   * Handles the user input field (to and from conversion)
   * todo: connect to web3
   */
  const handleCurrencyToUserInput = (event) => {
    setCurrencyToAmount(event.target.value);
    //console.log("User Input Noticed");
    //console.log(`User want to buy AROMA`);
    // user would like to buy X amount of AROMA (CurrencyTo)
    //console.log(`Calculating Exchange Rate`);
    //console.log(`Calculating required amount of MATIC (CurrencyFrom)`);
    //console.log(`Fill the MATIC (CurrencyFrom) input with the calculated amount.`);
    setCurrencyFromAmount(event.target.value / price);
    //console.log(`Quick validation that user has sufficient MATIC to buy AROMA`);
    //console.log(`Trigger input WARNING ONLY if available MATIC is insufficient`);
  };

  return (
    <Card fullHeight={fullHeight} elevation={3}>
      {web3ready ? (
        <CardContent>
          <Typography variant="h4" component="h2" align="center" mb={4}>
            {t("components.CurrencyExchange.title")}
          </Typography>
          <Stack spacing={2.5} alignItems="center">
            <CurrencyInputField id="token-exchange-from" currency={currencyFrom} label="You Pay" type="sell" value={currencyFromAmount} disabled required />
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
            <LoadingButton
              color="secondary"
              size="xlarge"
              variant="contained"
              fullWidth
              onClick={handleExchange}
              loading={exchangeLoading}
            >
              {t("components.CurrencyExchange.exchangeButton")}
            </LoadingButton>
            <Chip
              label={"For 1" + NETWORKS[TARGET_CHAIN].nativeToken + " you get " + formatCurrency(ETHER_IN_WEI / price) + " AROMA tokens."}
              sx={{ margin: "8px 0" }}
              size="small"
              icon={(enableCurrencySwitch && <ShowChart onClick={switchCurrencies} />) || <ShowChart />}
            />
          </Stack>
        </CardContent>
      ) : (
        <CardContent>
          <Typography variant="body2" align="center" gutterBottom>
            Connect your wallet and select the right chain.
          </Typography>
        </CardContent>
      )}
    </Card>
  );
}

CurrencyExchange.defaultProps = {
  enableCurrencySwitch: false,
};

CurrencyExchange.propTypes = {
  enableCurrencySwitch: PropTypes.bool,
};

export default withTranslation()(CurrencyExchange);
