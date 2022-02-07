/**
 * Binds all the required props using a dialog state to the triggering component
 *
 * @param dialogState
 * @returns {{onClick: ((function(): boolean)|*|handleOpen), 'aria-controls', 'aria-haspopup': boolean}}
 */
export function bindDialogClick(dialogState) {
  return {
    "aria-controls": dialogState.id,
    "aria-haspopup": true,
    onClick: dialogState.handleOpen,
  };
}

/**
 * Binds all the required props using a dialog state to the Dialog component
 *
 * @param dialogState
 * @returns {{onClose, 'aria-labelledby', id, open}}
 */
export function bindDialog(dialogState) {
  return {
    id: dialogState.id,
    "aria-labelledby": dialogState.id,
    open: dialogState.open,
    onClose: dialogState.onClose
  };
}
