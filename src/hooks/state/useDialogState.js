import { useState } from "react";

/**
 *
 * @param options
 * @returns {{onClose: (function|undefined), handleOpen: function, handleClose: function, handleToggle: function, id: (string|undefined), open: boolean}}
 */
export function useDialogState(options) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prev) => !prev);
  };

  return {
    id: options?.dialogId,
    open,
    onClose: options?.onClose ?? handleClose,
    handleOpen,
    handleClose,
    handleToggle,
  };
}
