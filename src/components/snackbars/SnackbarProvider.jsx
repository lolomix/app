import React, { createRef } from "react";
// custom
import { SnackbarProvider as BaseSnackbarProvider } from "notistack";
import SnackbarAction from "./SnackbarAction";
// material-ui
import { theme } from "../../utils/theme";

/**
 * @param children
 * @returns {JSX.Element}
 * @constructor
 */
function SnackbarProvider({ children }) {
  const snackbarRef = createRef();

  /**
   * The number of milliseconds to wait before automatically calling the `onClose` function.
   *
   * @type {number}
   */
  const autoHideDuration = 5000;

  return (
    <BaseSnackbarProvider
      ref={snackbarRef}
      maxSnack={3}
      preventDuplicate
      autoHideDuration={autoHideDuration}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      classes={{
        variantSuccess: {
          backgroundImage: theme.palette.success.main,
        },
        variantError: {
          backgroundImage: theme.palette.error.main,
        },
        variantWarning: {
          backgroundImage: theme.palette.warning.main,
        },
        variantInfo: {
          backgroundImage: theme.palette.info.main,
        },
      }}
      action={<SnackbarAction duration={autoHideDuration} />}
    >
      {children}
    </BaseSnackbarProvider>
  );
}

export default SnackbarProvider;
