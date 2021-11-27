import React from 'react'
import { withTranslation } from 'react-i18next'
import Blockies from 'react-blockies'
import { useWeb3React } from '@web3-react/core'
// material-ui
import {
  Avatar, Box, Button,
  List, ListItem, Stack, Tooltip,
  ListItemAvatar, ListItemText, Dialog,
} from '@mui/material'
import { Check, Warning } from '@mui/icons-material'
// custom
import IconButtonVerifyExplorer from '../web3/IconButtonVerifyExplorer'
import IconButtonCopy from '../IconButtonCopy'
import { NETWORKS, TARGET_CHAIN } from '../../web3/constants'
import AromaBalance from '../web3/AromaBalance'
import Balance from '../web3/Balance'
import NFTIdList from '../web3/NFTIdList'
import CHEFAbi from '../../web3/abi/CryptoChefsERC721Facet.json'


function MyAccountPopover({ t, connectionMenu, handleConnectionMenu, handleWeb3Modal }) {
  const {account, chainId} = useWeb3React();
  const CHEFAddress = NETWORKS[TARGET_CHAIN].contractMaster

  /**
   * Prettifies an ethereum address for presentation.
   * @type {function(*): string}
   *
   * @todo refactor this to a global helper
   */
  const prettifyAccountAddress = (address) => `${address.slice(0, 6)}...${address.slice(-4)}`;

  return (
    <Dialog id="settings-menu" open={Boolean(connectionMenu)} onClose={handleConnectionMenu} maxWidth="md">
      <Box p={2}>
        <List dense>
          {account && (
            <ListItem
              secondaryAction={
                <>
                  <IconButtonVerifyExplorer address={account} />
                  <IconButtonCopy copyText={account} />
                </>
              }>
              <Tooltip disableFocusListener title={t("base.youraccount")}>
                <ListItemAvatar>
                  <Avatar>
                    <Blockies seed={account.toLowerCase()} size={10} scale={4} className="blockies" />
                  </Avatar>
                </ListItemAvatar>
              </Tooltip>
              <ListItemText secondary={prettifyAccountAddress(account.toLowerCase())} primary={t("base.yourAddress")} />
            </ListItem>
          )}
          {chainId === NETWORKS[TARGET_CHAIN].chainId ? (
            <ListItem>
              <ListItemAvatar>
                <Avatar className="avatar-success">
                  <Check color="tertiary" />
                </Avatar>
              </ListItemAvatar>
              <ListItemText secondary={TARGET_CHAIN.toUpperCase() + " network"} primary="Connection Established" />
            </ListItem>
          ) : (
            <ListItem>
              <ListItemAvatar>
                <Avatar className="avatar-warning">
                  <Warning />
                </Avatar>
              </ListItemAvatar>
              <ListItemText secondary={"Please select " + TARGET_CHAIN.toUpperCase() + " in your wallet"} primary="WRONG NETWORK" />
            </ListItem>
          )}
          <ListItem>
            <ListItemText secondary={<AromaBalance />} primary="Your AROMA balance" />
          </ListItem>
          <ListItem>
            <ListItemText secondary={<Balance />} primary="Your MATIC balance" />
          </ListItem>
          <ListItem>
            <ListItemText secondary={<NFTIdList tokenAbi={CHEFAbi} tokenAddress={CHEFAddress}/>} primary="Your CHEF NFTs" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Your CHEF NFTs will be revealed soon!" />
          </ListItem>
        </List>
        <Stack spacing={1} direction="row" justifyContent="center">
          <Button disableElevation color="primary" variant="contained" onClick={handleConnectionMenu}>
            {t("base.close")}
          </Button>
          <Button color="primary" variant="outlined" onClick={handleWeb3Modal}>
            Web3 Settings
          </Button>
        </Stack>
      </Box>
    </Dialog>
  )
}

export default withTranslation()(MyAccountPopover)