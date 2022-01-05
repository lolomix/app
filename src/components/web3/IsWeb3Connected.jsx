import React, { Fragment, useState } from "react";
import { useEthers } from '@usedapp/core';
import { withTranslation } from "react-i18next";
//import { utils } from "web3";
import mainProxyAbi from "../../web3/abi/CryptoChefsERC721Facet.json";
import { NETWORKS, TARGET_CHAIN } from "../../web3/constants";
//mui
import Tooltip from "@mui/material/Tooltip";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Popover from "@mui/material/Popover";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

function BuyAroma(props) {
  return account ? <Box>yes</Box> : <Box>no</Box>;
}

export default withTranslation()(BuyAroma);
