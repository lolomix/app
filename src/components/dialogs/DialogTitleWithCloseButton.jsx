// material-ui
import { DialogTitle, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

/**
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
function DialogTitleWithCloseButton(props) {
  const { handleClose, children, ...rest } = props;

  return (
    <DialogTitle {...rest}>
      {children}
      {handleClose && (
        <IconButton
          variant="contained"
          shape="squarish"
          size="xsmall"
          color="error"
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 16,
            top: 16,
          }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      )}
    </DialogTitle>
  );
}

export default DialogTitleWithCloseButton;
