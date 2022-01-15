import { useState } from "react";
import { withTranslation } from "react-i18next";
// material-ui
import { Dialog, IconButton, Tooltip } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
// custom
import NavigationButton from "./NavigationButton";

/**
 * @param t
 * @returns {JSX.Element}
 * @constructor
 */
function NavigationMainMenuButton({ t }) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Tooltip disableFocusListener title="Menu" aria-label="Menu">
        <NavigationButton icon={<MenuIcon />} onClick={handleClickOpen} />
      </Tooltip>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        // TransitionComponent={Transition}
      >
        <IconButton
          edge="start"
          color="inherit"
          onClick={handleClose}
          aria-label="close"
        >
          <CloseIcon />
        </IconButton>
        MAIN MENU DIALOG
      </Dialog>
    </>
  );
}

export default withTranslation()(NavigationMainMenuButton);
