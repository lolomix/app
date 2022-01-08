import React from "react";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Launch from "@mui/icons-material/Launch";
import { NETWORKS, TARGET_CHAIN } from "../../web3/constants";

function VerifyExplorerIconButton ({ address, size, fontSize }) {
  return (
    <Tooltip title="View on Explorer">
      <IconButton
        component="a"
        size={size}
        href={NETWORKS[TARGET_CHAIN].blockExplorerUrls[0] + 'address/' +
        address}
        target="_blank"
        aria-label="View on Explorer"

      >
        <Launch sx={{ fontSize: fontSize }} />
      </IconButton>
    </Tooltip>
  )
}

export default VerifyExplorerIconButton;
