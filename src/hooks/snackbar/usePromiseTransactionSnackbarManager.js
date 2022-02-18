import { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import SnackbarAction from "../../components/snackbars/SnackbarAction";
import { useTranslation } from "react-i18next";

export const TRANSACTION_IN_PROGRESS_KEY = "transactionInProgress";
export const PENDING_SIGNATURE_KEY = "pendingSignature";

/**
 * @param {object} state
 * @returns {(boolean|((value: (((prevState: boolean) => boolean) | boolean)) => void))[][]}
 */
export function usePromiseTransactionSnackbarManager(state) {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { t } = useTranslation("contract", { keyPrefix: "exceptions" });

  /**
   * Define persisting transactions
   */
  const [pendingSignature, setPendingSignature] = useState(false);
  const [inProgress, setInProgress] = useState(false);

  useEffect(() => {
    console.debug(state);

    switch (state.status) {
      case "Mining":
        setInProgress(true);
        setPendingSignature(false);
        break;
      case "PendingSignature":
        setInProgress(false);
        setPendingSignature(true);
        break;
      case "Fail":
        setInProgress(false);
        setPendingSignature(false);
        enqueueSnackbar(t(state.errorMessage), {
          variant: "error",
        });
        break;
      case "Exception":
        setInProgress(false);
        setPendingSignature(false);
        enqueueSnackbar(t(state.errorMessage), {
          variant: "error",
        });
        break;
      case "Success":
        setInProgress(false);
        setPendingSignature(false);
        enqueueSnackbar("Transaction was successful", {
          variant: "success",
        });
        break;
      case "None":
      default:
        setInProgress(false);
        setPendingSignature(false);
        break;
    }
  }, [state, enqueueSnackbar]);

  /**
   * Handle transaction in progress snackbar
   */
  useEffect(() => {
    if (inProgress) {
      enqueueSnackbar("Transaction in progress", {
        key: TRANSACTION_IN_PROGRESS_KEY,
        variant: "warning",
        persist: true,
        action: <SnackbarAction />,
      });
    } else {
      closeSnackbar(TRANSACTION_IN_PROGRESS_KEY);
    }
  }, [inProgress, enqueueSnackbar, closeSnackbar]);

  /**
   * Handle pending signature snackbar
   */
  useEffect(() => {
    if (pendingSignature) {
      enqueueSnackbar("Pending Signature", {
        key: PENDING_SIGNATURE_KEY,
        variant: "warning",
        persist: true,
        action: <SnackbarAction />,
      });
    } else {
      closeSnackbar(PENDING_SIGNATURE_KEY);
    }
  }, [pendingSignature, closeSnackbar, enqueueSnackbar]);

  return [
    [inProgress, setInProgress],
    [pendingSignature, setPendingSignature],
  ];
}
