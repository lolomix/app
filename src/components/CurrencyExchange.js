import React, { useState } from "react";
import { withTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { useWeb3React } from "@web3-react/core";
// material-ui
import LoadingButton from "@mui/lab/LoadingButton";
import { KeyboardArrowDown, ShowChart } from "@mui/icons-material";
import { Card, CardContent, Typography, Stack, Divider, Chip } from "@mui/material";
// custom
import CurrencyInputField from "./form/CurrencyInputField";
import { NETWORKS, TARGET_CHAIN } from "../web3/constants";
import abi from "../web3/abi/CryptoChefsERC721Facet.json";

function CurrencyExchange({ t, variant, web3ready, enableCurrencySwitch }) {
  const { account, library } = useWeb3React();
  const [price, setPrice] = React.useState();
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

  /**
   * Handles the switch of currencies if `enableCurrencySwitch` is enabled
   */
  const switchCurrencies = () => {
    // if currency switch is not enabled return
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
   * todo: connect to web3
   */
  const handleExchange = async () => {
    setExchangeLoading(true);

    // todo: replace with the transaction
    // please use `setExchangeLoading` to make it work
    const contractMaster = NETWORKS[TARGET_CHAIN].contractMaster;
    const contract = new library.eth.Contract(abi, contractMaster);
    console.log(currencyFromAmount);
    try {
      const result = await contract.methods.buyAROMA(currencyFromAmount).send({ value: "1000", from: account, gas: 10000000 });
      console.log(result);
      setExchangeLoading(false);
    } catch (error) {
      console.log(error);
      setExchangeLoading(false);
    }

    /*
    console.log("Quick Validation of Inputs");
    console.log("Create Transaction Object");
    setTimeout(function () {
      console.log("Send a Transaction to the Network");
      console.log("Handle Errors... if needed");
      console.log("Transaction Successful...");
      setExchangeLoading(false);
    }, 3000);
    */
  };

  /**
   * Handles the user input field (to and from conversion)
   * todo: connect to web3
   */
  const handleCurrencyToUserInput = (event) => {
    setCurrencyToAmount(event.target.value);

    console.log("User Input Noticed");
    console.log(`User want to buy AROMA`);

    // user would like to buy X amount of AROMA (CurrencyTo)
    console.log(`Calculating Exchange Rate`);
    console.log(`Calculating required amount of MATIC (CurrencyFrom)`);
    console.log(`Fill the MATIC (CurrencyFrom) input with the calculated amount.`);
    setCurrencyFromAmount(event.target.value / price);
    console.log(`Quick validation that user has sufficient MATIC to buy AROMA`);
    console.log(`Trigger input WARNING ONLY if available MATIC is insufficient`);
  };

  return (
    <Card variant={variant}>
      {web3ready ? (
        <CardContent>
          <Typography variant="h4" component="h3" align="center" gutterBottom>
            {t("components.CurrencyExchange.title")}
          </Typography>
          <Stack my={4} spacing={2.5} alignItems="center">
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
              loadingPosition="end">
              {t("components.CurrencyExchange.exchangeButton")}
            </LoadingButton>
            <Chip
              label={"For 1" + NETWORKS[TARGET_CHAIN].nativeToken + " you get " + price + " AROMA tokens."}
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
