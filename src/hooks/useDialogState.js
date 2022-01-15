import { useState } from "react";

/**
 * @param dialogState
 * @returns {{onClick: *, 'aria-controls': *, 'aria-describedby': *, 'aria-haspopup': boolean}}
 */
export function bindClick(dialogState) {
  return {
    "aria-controls": dialogState?.id,
    "aria-haspopup": true,
    onClick: dialogState?.handleOpen,
  };
}

/**
 * @param dialogState
 * @returns {{onClose: (handleClose|*), 'aria-labelledby', handleClose: (handleClose|*), id, open}}
 */
export function bindDialog(dialogState) {
  return {
    id: dialogState.id,
    "aria-labelledby": dialogState.id,
    open: dialogState.open,
    handleClose: dialogState.handleClose,
    onClose: dialogState.handleClose,
  };
}

/**
 * @param options
 * @returns {{handleOpen: handleOpen, handleClose: handleClose, id: string, open: boolean}}
 */
export function useDialogState(options) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return {
    id: options?.dialogId,
    open: open,
    handleOpen,
    handleClose,
  };
}
