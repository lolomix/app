import React from "react";
import { useWeb3React } from "@web3-react/core";
//import { utils } from "web3";
import Skeleton from "@mui/material/Skeleton";
import { NETWORKS, TARGET_CHAIN, AROMA_DECIMALS } from "../../web3/constants";

// utils
import {formatCurrency} from '../../utils/formatters'

const AromaBalance = function () {
  const { account, library } = useWeb3React();
  const [balance, setBalance] = React.useState();
  React.useEffect(() => {
    if (!!account && !!library) {
      async function loadBalance() {
        try {
          const contractAroma = NETWORKS[TARGET_CHAIN].contractAroma;
          const minAbi = [
            {
              constant: true,
              inputs: [{ name: "_owner", type: "address" }],
              name: "balanceOf",
              outputs: [{ name: "balance", type: "uint256" }],
              type: "function",
            },
          ];
          const contract = new library.eth.Contract(minAbi, contractAroma);
          const balance = await contract.methods.balanceOf(account).call();
          setBalance(balance / AROMA_DECIMALS);
        } catch (e) {
          console.log(e);
        }
      }
      loadBalance();
    }
  }, [account, library]); // ensures refresh if referential identity of library doesn't change across chainIds

  return balance === null ? <Skeleton variant="text" /> : balance ? <span>AROMA {formatCurrency(balance)}</span> : <Skeleton variant="text" />;
};

export default AromaBalance;
