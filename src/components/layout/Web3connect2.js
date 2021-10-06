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
//custom
import {connectorsByName} from "../../web3/new/connectorsList";

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
        {Object.keys(connectorsByName).map(name => {
            <Button
              style={{
                height: '3rem',
                borderRadius: '1rem',
                borderColor: currentConnector === activatingConnector ? 'orange' : currentConnector === connector ? 'green' : 'unset',
                cursor: disabled ? 'unset' : 'pointer',
                position: 'relative'
              }}
              disabled={!triedEager || !!activatingConnector || currentConnector === connector || !!error}
              key={name}
              onClick={() => {
                setActivatingConnector(connectorsByName[name])
                activate(connectorsByName[name])
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: '0',
                  left: '0',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  color: 'black',
                  margin: '0 0 0 1rem'
                }}
              >
                {currentConnector === activatingConnector && <span>loading</span>}
                {currentConnector === connector && (
                  <span role="img" aria-label="check">
                    ✅
                  </span>
                )}
              </div>
              {name}
            </Button>
          
        })}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {(active || error) && (
          <button
            style={{
              height: '3rem',
              marginTop: '2rem',
              borderRadius: '1rem',
              borderColor: 'red',
              cursor: 'pointer'
            }}
            onClick={() => {
              deactivate()
            }}
          >
            Deactivate
          </button>
        )}

        {!!error && <h4 style={{ marginTop: '1rem', marginBottom: '0' }}>{getErrorMessage(error)}</h4>}
      </div>

      <hr style={{ margin: '2rem' }} />

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
