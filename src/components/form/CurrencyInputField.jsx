import {
  FilledInput,
  FormControl,
  InputAdornment,
  Typography,
} from "@mui/material";
import CurrencyAromaIcon from "../icons/CurrencyAromaIcon";
import CurrencyMaticIcon from "../icons/CurrencyMaticIcon";
import CurrencyEthIcon from "../icons/CurrencyEthIcon";

/**
 * @type object {{}}
 *
 * @todo move this to a common location
 */
const currencyIconComponents = {
  MATIC: CurrencyMaticIcon,
  AROMA: CurrencyAromaIcon,
  ETH: CurrencyEthIcon,
};

/**
 * @param id
 * @param label
 * @param currency
 * @param onUserInput
 * @param value
 * @param disabled
 * @returns {JSX.Element}
 * @constructor
 */
function CurrencyInputField({
  id,
  label,
  currency,
  onUserInput,
  value,
  disabled,
}) {
  const CurrencyIcon = currencyIconComponents[currency];

  return (
    <FormControl variant="outlined" fullWidth>
      <Typography variant="subtitle2" mb={1}>
        {label}
      </Typography>
      <FilledInput
        disableUnderline
        hiddenLabel
        id={id}
        value={value}
        onChange={onUserInput}
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
                border: "1px solid #fff",
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

export default CurrencyInputField;
