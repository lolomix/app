import React from 'react'
import { withTranslation } from 'react-i18next'
import Blockies from 'react-blockies'
import { useWeb3React } from '@web3-react/core'
// material-ui
import {
  Avatar, Box, Button,
  List, ListItem, Stack, Tooltip,
  ListItemAvatar, ListItemText, Popover, Typography, IconButton,
} from '@mui/material'
import { Check, Close } from '@mui/icons-material'
// custom
import IconButtonVerifyExplorer from '../web3/IconButtonVerifyExplorer'
import IconButtonCopy from '../IconButtonCopy'
import { NETWORKS, TARGET_CHAIN } from '../../web3/constants'
import AromaBalance from '../web3/AromaBalance'
import Balance from '../web3/Balance'
import NFTIdList from '../web3/NFTIdList'
import CHEFAbi from '../../web3/abi/CryptoChefsERC721Facet.json'

function YourAccountPopover({ t, handleWeb3Modal, connectionMenu, handleConnectionMenu, handleCloseConnectionMenu }) {
  const { account } = useWeb3React();
  const CHEFAddress = NETWORKS[TARGET_CHAIN].contractMaster

  /**
   * Prettifies an ethereum address for presentation.
   *
   * @param address
   * @param charsAtStart
   * @param charsAtEnd
   * @returns {string}
   *
   * @todo refactor this to a global helper
   */
  function prettifyAccountAddress (address, charsAtStart = 6, charsAtEnd = 4) {
    return `${address.slice(0, charsAtStart)}...${address.slice(-(charsAtEnd))}`;
  }

  return (
    <Popover id="settings-menu"
             open={Boolean(connectionMenu)}
             onClose={handleCloseConnectionMenu}
             anchorEl={connectionMenu}
             anchorOrigin={{
               vertical: 'bottom',
               horizontal: 'right',
             }}
             transformOrigin={{
               vertical: -5,
               horizontal: 'right',
             }}
    >
      <Box py={2} px={4}>
        <List sx={{padding: 0}}>
          <ListItem disableGutters
                    disablePadding
                    divider={true}
                    secondaryAction={
                      <IconButton onClick={handleCloseConnectionMenu} aria-label="close">
                        <Close />
                      </IconButton>
                    }

          >
            <ListItemText disableTypography={true}>
              <Typography variant="h5">
                {t('base.yourAccount')}
              </Typography>
            </ListItemText>
          </ListItem>

          <ListItem disableGutters
                    secondaryAction={
                      <>
                          <IconButtonVerifyExplorer address={account} />
                      </>
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
                <span>{prettifyAccountAddress(account.toLowerCase(), 10, 6)}</span>
                <IconButtonCopy copyText={account} size="small" fontSize=".8rem"/>
              </>
            } primary={t("base.yourAddress")} />
          </ListItem>

          <ListItem disableGutters>
            <ListItemAvatar>
              <Avatar className="avatar-success">
                <Check color="tertiary" />
              </Avatar>
            </ListItemAvatar>
            <ListItemText secondary={"Successfully connected to " + TARGET_CHAIN.toUpperCase()} primary="Connected" />
          </ListItem>

          <ListItem disableGutters>
            <ListItemText secondary={<AromaBalance />} primary="Your AROMA balance" />
          </ListItem>
          <ListItem disableGutters>
            <ListItemText secondary={<Balance />} primary="Your MATIC balance" />
          </ListItem>
          <ListItem disableGutters>
            <ListItemText secondary={<NFTIdList tokenAbi={CHEFAbi} tokenAddress={CHEFAddress}/>} primary="Your CHEF NFTs" />
          </ListItem>
          <ListItem disableGutters>
            <ListItemText primary="Your CHEF NFTs will be revealed soon!" />
          </ListItem>
        </List>

        <Stack spacing={1} direction="row" justifyContent="center">
          <Button disableElevation color="primary" variant="contained" onClick={handleCloseConnectionMenu}>
            {t("base.close")}
          </Button>
          <Button color="primary" variant="outlined" onClick={handleWeb3Modal}>
            Web3 Settings
          </Button>
          <Button disableElevation color="error" variant="contained" onClick={handleWeb3Modal}>
            Disconnect
          </Button>
        </Stack>
      </Box>
    </Popover>
  )
}

export default withTranslation()(YourAccountPopover)