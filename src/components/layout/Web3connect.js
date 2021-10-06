import React, { useState, Fragment, useEffect } from "react";
import { withTranslation } from "react-i18next";
import { withRouter } from "react-router-dom";
import Blockies from "react-blockies";
import { useWeb3React } from "@web3-react/core";
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
//custom
import { connectorsByName } from "../../web3/connectorsList";
import { getErrorMessage } from "../../web3/errors";
import { useEagerConnect } from "../../web3/hooks";
import Balance from "../web3/Balance";
import AromaBalance from "../web3/AromaBalance";
import BuyAroma from "../web3/BuyAroma";

function Web3connect(props) {
  const Web3Context = useWeb3React();
  const triedEager = useEagerConnect();
  const { connector, account, activate, deactivate, active, error } = Web3Context;
  const [activatingConnector, setActivatingConnector] = React.useState();
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

  useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined);
    }
  }, [activatingConnector, connector]);

  return (
    <Fragment>
      {!account ? (
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
                    {account && (
                      <ListItem>
                        <Tooltip disableFocusListener title="your web3 address">
                          <ListItemAvatar>
                            <Avatar>
                              <Blockies seed={account.toLowerCase()} size={10} scale={4} className="blockies" />
                            </Avatar>
                          </ListItemAvatar>
                        </Tooltip>
                        <ListItemText secondary={account.toLowerCase()} primary={t("base.yourWeb3Account")} />
                      </ListItem>
                    )}
                    <ListItem>
                      <ListItemText secondary={<AromaBalance />} primary="Your AROMA balance" />
                    </ListItem>
                    <ListItem>
                      <ListItemText secondary={<Balance />} primary="Your MATIC balance" />
                    </ListItem>
                  </List>
                  <Button color="primary" variant="contained" onClick={handleConnectionMenuClose}>
                    {t("base.close")}
                  </Button>
                  <Button color="primary" variant="outlined" onClick={logoutOfWeb3Modal}>
                    Logout
                  </Button>
                  <BuyAroma />
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
          {Object.keys(connectorsByName).map((name) => (
            <Button
              style={{
                borderColor: connectorsByName[name] === activatingConnector ? "orange" : connectorsByName[name] === connector ? "green" : "unset",
              }}
              disabled={!triedEager || !!activatingConnector || connectorsByName[name] === connector || !!error}
              key={name}
              onClick={() => {
                setActivatingConnector(connectorsByName[name]);
                activate(connectorsByName[name]);
              }}>
              <div>
                {connectorsByName[name] === activatingConnector && <span>loading</span>}
                {connectorsByName[name] === connector && (
                  <span role="img" aria-label="check">
                    ✅
                  </span>
                )}
              </div>
              {name}
            </Button>
          ))}
          <div>
            {(active || error) && (
              <Button
                onClick={() => {
                  deactivate();
                }}>
                Deactivate
              </Button>
            )}
            {!!error && <h4 style={{ marginTop: "1rem", marginBottom: "0" }}>{getErrorMessage(error)}</h4>}
          </div>
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
