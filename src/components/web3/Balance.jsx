import React from "react";
import { useEthers } from '@usedapp/core'
import { utils } from "web3";
import Skeleton from "@mui/material/Skeleton";

// utils
import { formatCurrency } from "../../utils/formatters";

const Balance = function () {
  const { account, library, chainId } = useEthers();

  const [balance, setBalance] = React.useState();

  React.useEffect(() => {
    if (!!account && !!library) {
      let stale = false;
      library.eth
        .getBalance(account)
        .then((balance) => {
          if (!stale) {
            setBalance(balance);
          }
        })
        .catch(() => {
          if (!stale) {
            setBalance(null);
          }
        });
      return () => {
        stale = true;
        setBalance(undefined);
      };
    }
  }, [account, library, chainId]); // ensures refresh if referential identity of library doesn't change across chainIds

  return balance === null ? (
    <Skeleton variant="text" />
  ) : balance ? (
    <span>{formatCurrency(utils.fromWei(balance, "ether"))}</span>
  ) : (
    <Skeleton variant="text" />
  );
};

export default Balance;
