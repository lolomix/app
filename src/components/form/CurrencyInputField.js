import React from "react";
import { withTranslation } from "react-i18next";
// material-ui
import { FormControl, InputAdornment, OutlinedInput, Typography } from "@mui/material";
import CurrencyAROMAIcon from "../icons/CurrencyAROMAIcon";
import CurrencyMATICIcon from "../icons/CurrencyMATICIcon";
import CurrencyETHIcon from "../icons/CurrencyETHIcon";


function CurrencyInputField({ id, label, currency, onUserInput, value, disabled }) {
  const currencyIconComponents = {
    MATIC: CurrencyMATICIcon,
    AROMA: CurrencyAROMAIcon,
    ETH: CurrencyETHIcon,
    'TEST ETHER': CurrencyETHIcon
  };

  // dynamically reference the icon component
  const CurrencyIcon = currencyIconComponents[currency];

  return (
    <FormControl fullWidth>
      <InputLabel htmlFor={id} shrink={true}>
        {label}
      </InputLabel>
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
