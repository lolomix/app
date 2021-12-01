import React from 'react'
import { withTranslation } from 'react-i18next'
import Blockies from 'react-blockies'
import { useWeb3React } from '@web3-react/core'
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
} from '@mui/material'
import { Check, Close, Settings } from '@mui/icons-material'
// custom
import IconButtonVerifyExplorer from '../web3/IconButtonVerifyExplorer'
import IconButtonCopy from '../common/IconButtonCopy'
import { NETWORKS, TARGET_CHAIN } from '../../web3/constants'
import AromaBalance from '../web3/AromaBalance'
import Balance from '../web3/Balance'
import CHEFBalance from '../web3/CHEFBalance'
import ButtonAddAssetToWallet from '../web3/ButtonAddAssetToWallet'
import { truncate } from '../../utils/formatters'

function YourAccountPopover(props) {
  const { t, closePopover, openConnectorsPopover, anchorEl, ...rest } = props
  const { account, deactivate } = useWeb3React();

  return (
    <Popover {...rest} anchorEl={anchorEl}>
      <Box pt={2} pb={3} px={3} width="350px">
        <Grid container alignItems="center" mb={1}>
          <Grid item xs>
            <Typography variant="h5">
              {t('base.yourAccount')}
            </Typography>
          </Grid>
          <Grid item xs={1}>
            <Tooltip title="Close Menu">
              <IconButton onClick={closePopover} aria-label="Close Popover">
                <Close />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>

        <Divider />

        <List disablePadding>
          <ListItem
            disableGutters
            secondaryAction={
              <IconButtonVerifyExplorer address={account} />
            }
          >
            <Tooltip disableFocusListener title={t("base.yourAccount")}>
              <ListItemAvatar>
                <Avatar>
                  <Blockies seed={account.toLowerCase()} size={10} scale={4} className="blockies" />
                </Avatar>
              </ListItemAvatar>
            </Tooltip>
            <ListItemText secondary={
              <>
                <span>
                  {truncate(account.toLowerCase(), 10, -4)}
                </span>
                <IconButtonCopy copyText={account} size="small" fontSize=".9rem" />
              </>
            } primary={t("base.address")} />
          </ListItem>

          <ListItem disableGutters>
            <ListItemAvatar>
              <Avatar className="avatar-success">
                <Check color="tertiary" />
              </Avatar>
            </ListItemAvatar>
            <ListItemText secondary={"Successfully connected to " + TARGET_CHAIN.toUpperCase()} primary="Connected" />
          </ListItem>
        </List>

        <Divider />

        <Typography mt={2} mb={1}>
          Balance
        </Typography>
        <Grid container spacing={.5} mb={2}>
          <Grid item xs={6}>
            <Typography variant="body2">
              AROMA
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2">
              <AromaBalance />
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2">
              {NETWORKS[TARGET_CHAIN].nativeCurrency.symbol}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2">
              <Balance />
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2">
              CHEF NFTs
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <CHEFBalance />
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs>
            <Box mb={2}>
              <ButtonAddAssetToWallet />
            </Box>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs>
            <Button fullWidth disableElevation color="error" variant="contained" onClick={() => {
              closePopover()
              deactivate()
            }}>
              {t('base.disconnect')}
            </Button>
          </Grid>
          <Grid item xs={1}>
            <Tooltip title="Wallet Settings">
              <IconButton color="primary" variant="outlined" onClick={() => {
                closePopover()
                openConnectorsPopover(anchorEl)
              }}>
                <Settings/>
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      </Box>
    </Popover>
  )
}

export default withTranslation()(YourAccountPopover)