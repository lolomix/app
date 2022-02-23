import React from "react";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Launch from "@mui/icons-material/Launch";
import { getChainById, useConfig } from "@usedapp/core";

function VerifyExplorerIconButton({ address, size, fontSize }) {
  const { readOnlyChainId } = useConfig();
  const { getExplorerAddressLink } = getChainById(readOnlyChainId);

  return (
    <Tooltip title="View on Explorer">
      <IconButton
        component="a"
        size={size}
        href={getExplorerAddressLink(address)}
        target="_blank"
        aria-label="View on Explorer"
      >
        <Launch sx={{ fontSize: fontSize }} />
      </IconButton>
    </Tooltip>
  );
}

export default VerifyExplorerIconButton;
