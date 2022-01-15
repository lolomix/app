import React from "react";
// custom
import { formatCurrency } from "../../utils/formatters";
import { useAromaBalanceOf } from "../../hooks/useAromaBalanceOf";
// material-ui
import Skeleton from "@mui/material/Skeleton";
import { useEthers } from "@usedapp/core";

function AromaBalance() {
  const { account } = useEthers();
  const [balance, balanceFormatted] = useAromaBalanceOf(account);

  return balance === undefined ? (
    <Skeleton variant="text" />
  ) : (
    <span>{formatCurrency(balanceFormatted)}</span>
  );
}

export default AromaBalance;
