import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { theme } from "../../utils/theme";

/**
 * @param setValue
 * @param value
 * @param valueSuffix
 * @param adjustment
 * @param maxValue
 * @param minValue
 * @returns {JSX.Element}
 * @constructor
 */
function GradualStepperInputField({
  setValue,
  value = 0,
  valueSuffix = "",
  adjustment = 1,
  maxValue = 100,
  minValue = 0,
}) {
  /**
   * @returns {boolean}
   */
  const canIncrement = () => value < maxValue;
  /**
   * @returns {boolean}
   */
  const canDecrement = () => value > minValue;

  const increment = () => {
    setValue(canIncrement() ? value + adjustment : maxValue);
  };

  const decrement = () => {
    setValue(canDecrement() ? value - adjustment : minValue);
  };

  return (
    <TextField
      disabled
      hiddenLabel
      id="filled-start-adornment"
      variant="filled"
      value={`${value}${valueSuffix}`}
      inputProps={{
        sx: {
          padding: 0,
          textAlign: "center",
        },
      }}
      InputProps={{
        disableUnderline: true,
        sx: {
          padding: `${theme.spacing(0.1)} ${theme.spacing(0.35)}`,
        },
        startAdornment: (
          <InputAdornment position="start">
            <IconButton
              disabled={!canDecrement()}
              variant="contained"
              shape="squarish"
              size="xsmall"
              color="success"
              aria-label="close"
              onClick={decrement}
            >
              <RemoveIcon fontSize="small" />
            </IconButton>
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              disabled={!canIncrement()}
              variant="contained"
              shape="squarish"
              size="xsmall"
              color="success"
              aria-label="close"
              onClick={increment}
            >
              <AddIcon fontSize="small" />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
}

export default GradualStepperInputField;
