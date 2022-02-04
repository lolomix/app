import React, { createRef } from "react";
// custom
import { SnackbarProvider as BaseSnackbarProvider } from "notistack";
import SnackbarAction from "./SnackbarAction";
// material-ui
import { theme } from "../../utils/theme";
import { makeStyles } from "@mui/styles";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WarningIcon from "@mui/icons-material/Warning";
import InfoIcon from "@mui/icons-material/Info";

/**
 * @param children
 * @returns {JSX.Element}
 * @constructor
 */
const useStyles = makeStyles({
  overriddenError: {
    color: `${theme.palette.error.light} !important`,
    WebkitTextFillColor: theme.snackbar.WebkitTextFillColor,
    background: theme.snackbar.background,
    borderRadius: theme.snackbar.borderRadius,
  },
  overriddenSuccess: {
    color: `${theme.palette.success.light} !important`,
    WebkitTextFillColor: theme.snackbar.WebkitTextFillColor,
    background: theme.snackbar.background,
    borderRadius: theme.snackbar.borderRadius,
  },
  overriddenWarning: {
    color: `${theme.palette.warning.main} !important`,
    WebkitTextFillColor: theme.snackbar.WebkitTextFillColor,
    background: theme.snackbar.background,
    borderRadius: theme.snackbar.borderRadius,
  },
  overriddenInfo: {
    color: `${theme.palette.info.main} !important`,
    WebkitTextFillColor: theme.snackbar.WebkitTextFillColor,
    background: theme.snackbar.background,
    borderRadius: theme.snackbar.borderRadius,
  },
});

function SnackbarProvider({ children }) {
  const snackbarRef = createRef();

  /**
   * The number of milliseconds to wait before automatically calling the `onClose` function.
   *
   * @type {number}
   */
  const autoHideDuration = 5000;
  const classes = useStyles();
  return (
    <BaseSnackbarProvider
      iconVariant={{
        error: (
          <CancelIcon
            sx={{ fontSize: "2rem", paddingRight: 1, paddingBottom: 0.5 }}
          />
        ),
        success: (
          <CheckCircleIcon
            sx={{ fontSize: "2rem", paddingRight: 1, paddingBottom: 0.5 }}
          />
        ),
        warning: (
          <WarningIcon
            sx={{ fontSize: "2rem", paddingRight: 1, paddingBottom: 0.5 }}
          />
        ),
        info: (
          <InfoIcon
            sx={{ fontSize: "2rem", paddingRight: 1, paddingBottom: 0.5 }}
          />
        ),
      }}
      ref={snackbarRef}
      maxSnack={3}
      preventDuplicate
      autoHideDuration={autoHideDuration}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      classes={{
        variantError: classes.overriddenError,
        variantSuccess: classes.overriddenSuccess,
        variantWarning: classes.overriddenWarning,
        variantInfo: classes.overriddenInfo,
      }}
      action={<SnackbarAction duration={autoHideDuration} />}
    >
      {children}
    </BaseSnackbarProvider>
  );
}

export default SnackbarProvider;
