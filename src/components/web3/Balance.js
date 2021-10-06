import React from "react";
import { useWeb3React } from "@web3-react/core";
import { utils } from "web3";

const Balance = function () {
  const { account, library, chainId } = useWeb3React();

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

  return <span>{balance === null ? "Error" : balance ? `Ξ${utils.fromWei(balance, "ether")}` : ""}</span>;
};

export default Balance;
