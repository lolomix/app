import React from "react";
// custom
import { formatCurrency } from "../../utils/formatters";
import { useAromaBalanceOf } from "../../hooks/useAromaBalanceOf";
// material-ui
import Skeleton from "@mui/material/Skeleton";
import { useEthers } from "@usedapp/core";

function AromaBalance({ placeholder }) {
  const { account } = useEthers();
  const [balance, balanceFormatted] = useAromaBalanceOf(account);

  return balance === undefined ? (
    placeholder ? (
      placeholder
    ) : (
      <Skeleton variant="text" width={30} sx={{ display: "inline-block" }} />
    )
  ) : (
    <span>{formatCurrency(balanceFormatted)}</span>
  );
}

export default AromaBalance;
