import React, { useState, Fragment } from "react";
import { withTranslation } from "react-i18next";
import { withRouter } from "react-router-dom";
import Blockies from "react-blockies";
//mui
import Tooltip from "@mui/material/Tooltip";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Popover from "@mui/material/Popover";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Typography from "@mui/material/Typography";
//icons
import AccountCircle from "@mui/icons-material/AccountCircle";
//import AddCircle from "@mui/icons-material/AddCircle";

function Web3connect(props) {
  const [address, setAddress] = useState(null);
  const [connectionMenu, setconnectionMenu] = useState(false);
  const [dialogWeb3, setdialogWeb3] = useState(false);

  const handleConnectionIconClick = (event) => {
    setconnectionMenu(event.currentTarget);
  };
  const handleConnectionMenuClose = () => {
    setconnectionMenu(null);
  };
  const handleWeb3Modal = () => {
    setdialogWeb3(!dialogWeb3);
  };
  const { t } = props;

  const logoutOfWeb3Modal = () => {
    setdialogWeb3(!dialogWeb3);
  };
  const loadWeb3Modal = () => {
    setdialogWeb3(!dialogWeb3);
  };

  return (
    <Fragment>
      {!address ? (
        <Tooltip title="Connect to your Ethereum account">
          <Button size="small" variant="outlined" color="secondary" onClick={loadWeb3Modal}>
            Connect
          </Button>
        </Tooltip>
      ) : (
        <>
          <Tooltip disableFocusListener title={t("base.connectionInfo")} aria-label={t("base.connectionInfo")}>
            <IconButton color="inherit" onClick={handleConnectionIconClick}>
              <AccountCircle />
            </IconButton>
          </Tooltip>
          <Backdrop open={Boolean(connectionMenu)} className="backdropZindex">
            <Popover id="settings-menu" open={Boolean(connectionMenu)} anchorEl={connectionMenu} onClose={handleConnectionMenuClose}>
              <Paper>
                <Box m={2}>
                  <List dense>
                    {address && (
                      <ListItem>
                        <Tooltip disableFocusListener title="your web3 address">
                          <ListItemAvatar>
                            <Avatar>
                              <Blockies seed={address.toLowerCase()} size={10} scale={4} className="blockies" />
                            </Avatar>
                          </ListItemAvatar>
                        </Tooltip>
                        <ListItemText secondary={address.toLowerCase()} primary={t("base.yourWeb3Account")} />
                      </ListItem>
                    )}
                    <ListItem>
                      <ListItemText secondary={""} primary="Your AROMA balance" />
                    </ListItem>
                    <ListItem>
                      <ListItemText secondary={""} primary="Your MATIC balance" />
                    </ListItem>
                  </List>
                  <Button color="primary" variant="contained" onClick={handleConnectionMenuClose}>
                    {t("base.close")}
                  </Button>
                  <Button color="primary" variant="outlined" onClick={logoutOfWeb3Modal}>
                    Logout
                  </Button>
                  <Button color="primary" variant="outlined">
                    buy some aroma
                  </Button>
                </Box>
              </Paper>
            </Popover>
          </Backdrop>
        </>
      )}
      <Dialog onClose={handleWeb3Modal} open={dialogWeb3} keepMounted maxWidth="lg">
        <DialogContent>
          <Typography variant="h2" gutterBottom>
            Connect Wallet
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleWeb3Modal} variant="contained" color="primary">
            {t("base.close")}
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}

export default withRouter(withTranslation()(Web3connect));
