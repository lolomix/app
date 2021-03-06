import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { IconButton, InputAdornment, TextField, Tooltip } from "@mui/material";
import { theme } from "../../utils/theme";

/**
 * @param setValue
 * @param value
 * @param valueSuffix
 * @param adjustment
 * @param maxValue
 * @param minValue
 * @param hideSteppers
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
  hideSteppers = false,
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
        ...(hideSteppers || {
          startAdornment: (
            <InputAdornment position="start">
              <IconButton
                disabled={!canDecrement()}
                variant="contained"
                shape="squarish"
                size="xsmall"
                color="info"
                aria-label="close"
                onClick={decrement}
              >
                <Tooltip title="Decrease">
                  <RemoveIcon fontSize="small" />
                </Tooltip>
              </IconButton>
            </InputAdornment>
          ),
        }),
        ...(hideSteppers || {
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                disabled={!canIncrement()}
                variant="contained"
                shape="squarish"
                size="xsmall"
                color="info"
                aria-label="close"
                onClick={increment}
              >
                <Tooltip title="Increase">
                  <AddIcon fontSize="small" />
                </Tooltip>
              </IconButton>
            </InputAdornment>
          ),
        }),
      }}
    />
  );
}

export default GradualStepperInputField;
