import React from "react";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Launch from "@mui/icons-material/Launch";
import { NETWORKS, TARGET_CHAIN } from "../../web3/constants";

const IconButtonVerifyExplorer = function ({address}) {
  return (
    <Tooltip title="Verify on blockchain explorer">
        <IconButton 
            component="a" 
            aria-label="Verify on blockchain explorer" 
            href={NETWORKS[TARGET_CHAIN].blockExplorer + "address/" + address} 
            target="_blank">
        <Launch />
        </IconButton>
    </Tooltip>
  );
};

export default IconButtonVerifyExplorer;
