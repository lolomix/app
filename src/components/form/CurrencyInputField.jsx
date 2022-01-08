import React from "react";
import { withTranslation } from "react-i18next";
// material-ui
import { FormControl, InputAdornment, OutlinedInput, Typography } from "@mui/material";
import CurrencyAromaIcon from "../icons/CurrencyAromaIcon";
import CurrencyMaticIcon from "../icons/CurrencyMaticIcon";
import CurrencyEthIcon from "../icons/CurrencyEthIcon";

function CurrencyInputField({ id, label, currency, onUserInput, value, disabled }) {
  const currencyIconComponents = {
    MATIC: CurrencyMaticIcon,
    AROMA: CurrencyAromaIcon,
    ETH: CurrencyEthIcon,
    "TEST ETHER": CurrencyEthIcon,
  };

  // dynamically reference the icon component
  const CurrencyIcon = currencyIconComponents[currency];

  return (
    <FormControl variant="outlined" fullWidth>
      <Typography variant="overline">{label}</Typography>
      <OutlinedInput
        id={id}
        value={value}
        onChange={onUserInput}
        sx={{
          backgroundColor: "#fff",
        }}
        inputProps={{
          inputMode: "numeric",
          pattern: "[0-9]*",
        }}
        endAdornment={
          <InputAdornment position="end">
            <Typography pr={1} fontWeight={500}>
              {currency}
            </Typography>
            <CurrencyIcon
              fontSize="large"
              sx={{
                border: "2px solid #f1f1f1",
                borderRadius: "100%",
              }}
            />
          </InputAdornment>
        }
        disabled={disabled}
      />
    </FormControl>
  );
}

export default withTranslation()(CurrencyInputField);
