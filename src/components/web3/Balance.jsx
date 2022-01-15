import React from "react";
// custom
import { useEtherBalance, useEthers } from "@usedapp/core";
import { formatCurrency } from "../../utils/formatters";
import { formatEther } from "@ethersproject/units";
// material-ui
import Skeleton from "@mui/material/Skeleton";

const Balance = function () {
  const { account } = useEthers();
  const etherBalance = useEtherBalance(account);

  let balance;

  if (etherBalance) {
    balance = formatEther(etherBalance);
  }

  return balance === undefined ? (
    <Skeleton variant="text" />
  ) : (
    <span>{formatCurrency(balance)}</span>
  );
};

export default Balance;
