import React from "react";
// utils
import { formatCurrency } from "../../utils/formatters";
import { useChefBalanceOf } from "../../hooks/chef/useChefBalanceOf";
import { useEthers } from "@usedapp/core";
// material-ui
import Skeleton from "@mui/material/Skeleton";

function ChefBalance() {
  const { account } = useEthers();
  const [balance, balanceFormatted] = useChefBalanceOf(account);

  return balance === undefined ? (
    <Skeleton variant="text" />
  ) : (
    <span>{formatCurrency(balanceFormatted)}</span>
  );
}

export default ChefBalance;
