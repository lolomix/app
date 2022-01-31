import React from "react";
import { withTranslation } from "react-i18next";
import Blockies from "react-blockies";
import { useEthers } from "@usedapp/core";
// material-ui
import { Tooltip, Avatar } from "@mui/material";
import { AccountBalanceWallet } from "@mui/icons-material";
// custom
import MyAccountPopover from "./MyAccountPopover";
import ProvidersPopover from "./ProvidersPopover";
import NavigationButton from "./NavigationButton";
import {
  usePopupState,
  bindTrigger,
  bindPopover,
} from "material-ui-popup-state/hooks";

/**
 * @type {{transformOrigin: {horizontal: string, vertical: number}, anchorOrigin: {horizontal: string, vertical: string}}}
 */
const popoverOriginProps = {
  anchorOrigin: {
    vertical: "bottom",
    horizontal: "right",
  },
  transformOrigin: {
    vertical: -5,
    horizontal: "right",
  },
};

function NavigationWalletButton({ t }) {
  const { active, account } = useEthers();

  const providersPopoverState = usePopupState({
    variant: "popover",
    popupId: "providersPopover",
  });

  const myAccountPopoverState = usePopupState({
    variant: "popover",
    popupId: "myAccountPopover",
  });

  return (
    <>
      {active && account ? (
        <>
          <Tooltip
            disableFocusListener
            title={t("base.myAccount")}
            aria-label={t("base.myAccount")}
          >
            <NavigationButton
              icon={
                <Avatar variant="inheritBorderRadius">
                  <Blockies seed={account.toLowerCase()} size={10} />
                </Avatar>
              }
              sx={{
                padding: 0.1,
              }}
              {...bindTrigger(myAccountPopoverState)}
            />
          </Tooltip>
          <MyAccountPopover
            {...popoverOriginProps}
            {...bindPopover(myAccountPopoverState)}
            closePopover={myAccountPopoverState.close}
            openProvidersPopover={providersPopoverState.open}
          />
        </>
      ) : (
        <Tooltip title={t("base.connectToMyWallet")}>
          <NavigationButton
            icon={<AccountBalanceWallet />}
            text={t("base.connectWallet")}
            {...bindTrigger(providersPopoverState)}
          />
        </Tooltip>
      )}
      <ProvidersPopover
        {...popoverOriginProps}
        {...bindPopover(providersPopoverState)}
        closePopover={providersPopoverState.close}
      />
    </>
  );
}

export default withTranslation()(NavigationWalletButton);
