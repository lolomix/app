import React from "react";
import { withTranslation } from "react-i18next";
import Blockies from "react-blockies";
import { useEthers } from "@usedapp/core";
// material-ui
import {
  Avatar,
  Box,
  Button,
  List,
  ListItem,
  Tooltip,
  ListItemAvatar,
  ListItemText,
  Popover,
  Typography,
  IconButton,
  Divider,
  Grid,
} from "@mui/material";
import { Check, Settings } from "@mui/icons-material";
// custom
import VerifyExplorerIconButton from "../buttons/VerifyExplorerIconButton";
import IconButtonCopy from "../buttons/CopyIconButton";
import { TARGET_CHAIN } from "../../web3/constants";
import AddTokenToWalletButton from "../web3/AddTokenToWalletButton";
import { truncate } from "../../utils/formatters";

function MyAccountPopover(props) {
  const { t, closePopover, openProvidersPopover, anchorEl, ...rest } = props;
  const { account, deactivate } = useEthers();

  return (
    <Popover {...rest} anchorEl={anchorEl}>
      <Box pt={2} pb={3} px={3} width="350px">
        <Grid container alignItems="center" mb={1}>
          <Grid item xs>
            <Typography variant="h5">{t("base.myAccount")}</Typography>
          </Grid>
          <Grid item xs={1}>
            <Tooltip title="Wallet Settings">
              <IconButton
                variant="outlined"
                onClick={() => {
                  closePopover();
                  openProvidersPopover(anchorEl);
                }}
              >
                <Settings />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>

        <Divider />

        <List disablePadding>
          <ListItem
            disableGutters
            secondaryAction={<VerifyExplorerIconButton address={account} />}
          >
            <Tooltip disableFocusListener title={t("base.myAccount")}>
              <ListItemAvatar>
                <Avatar>
                  <Blockies
                    seed={account.toLowerCase()}
                    size={10}
                    scale={4}
                    className="blockies"
                  />
                </Avatar>
              </ListItemAvatar>
            </Tooltip>
            <ListItemText
              secondary={
                <>
                  <span>{truncate(account.toLowerCase(), 10, -4)}</span>
                  <IconButtonCopy
                    copyText={account}
                    size="small"
                    fontSize=".9rem"
                  />
                </>
              }
              primary={t("base.address")}
            />
          </ListItem>

          <ListItem disableGutters>
            <ListItemAvatar>
              <Avatar
                sx={{
                  backgroundColor: "primary.main",
                }}
              >
                <Check
                  sx={{
                    color: "common.white",
                  }}
                />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              secondary={
                "Successfully connected to " + TARGET_CHAIN.toUpperCase()
              }
              primary="Connected"
            />
          </ListItem>
        </List>

        <Divider />

        <Grid container>
          <Grid item xs>
            <Box my={2}>
              <AddTokenToWalletButton />
            </Box>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs>
            <Button
              fullWidth
              color="error"
              variant="contained"
              onClick={() => {
                closePopover();
                deactivate();
              }}
            >
              {t("base.disconnect")}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Popover>
  );
}

export default withTranslation()(MyAccountPopover);
