import React from 'react'
import { withTranslation } from 'react-i18next'
import Blockies from 'react-blockies'
import { useEthers } from '@usedapp/core'
//mui
import {
  Tooltip,
  Button,
  Avatar,
  IconButton,
} from '@mui/material'
import { AccountBalanceWallet } from '@mui/icons-material'
//custom
import MyAccountPopover from './MyAccountPopover'
import ConnectorsPopover from './ConnectorsPopover'
import {
  usePopupState,
  bindTrigger,
  bindPopover,
} from 'material-ui-popup-state/hooks'

/**
 * @type {{transformOrigin: {horizontal: string, vertical: number}, anchorOrigin: {horizontal: string, vertical: string}}}
 */
const popoverOriginProps = {
  anchorOrigin: {
    vertical: 'bottom',
    horizontal: 'right',
  },
  transformOrigin: {
    vertical: -5,
    horizontal: 'right',
  }
}

function WalletSelector({ t }) {
  const { active, account } = useEthers();

  const connectorsPopoverState = usePopupState({
    variant: 'popover',
    popupId: 'connectorsPopover',
  })

  const myAccountPopoverState = usePopupState({
    variant: 'popover',
    popupId: 'myAccountPopover',
  })

  return (
    <>
      {active && account ? (
          <>
            <Tooltip disableFocusListener title={t("base.myAccount")} aria-label={t("base.myAccount")}>
              <IconButton color="inherit" {...bindTrigger(myAccountPopoverState)}>
                <Avatar>
                  <Blockies seed={account.toLowerCase()} size={10} scale={4} className="blockies" />
                </Avatar>
              </IconButton>
            </Tooltip>
            <MyAccountPopover
              {...popoverOriginProps}
              {...bindPopover(myAccountPopoverState)}
              closePopover={myAccountPopoverState.close}
              openConnectorsPopover={connectorsPopoverState.open}
            />
          </>
      ) : (
        <Tooltip title={t("base.connectToMyWallet")}>
          <Button elongatedwidth="true"
                  color="primary"
                  variant="contained"
                  startIcon={<AccountBalanceWallet />}
                  {...bindTrigger(connectorsPopoverState)}
          >
            {t("base.connectWallet")}
          </Button>
        </Tooltip>
      )}
      <ConnectorsPopover
        {...popoverOriginProps}
        {...bindPopover(connectorsPopoverState)}
        closePopover={connectorsPopoverState.close}
      />
    </>
  );
}

export default withTranslation()(WalletSelector);
