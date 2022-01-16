import { useState } from "react";

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
