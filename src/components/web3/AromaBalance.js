import React from "react";
import { useWeb3React } from "@web3-react/core";
//import { utils } from "web3";

const AromaBalance = function () {
  const { account, library } = useWeb3React();
  const [balance, setBalance] = React.useState();
  React.useEffect(() => {
    if (!!account && !!library) {
      async function loadBalance() {
        try {
          const aromaAddress = "0x41E0984a75d6Ad506Ff5551BE38B0d97C88Ea4A3";
          const minAbi = [
            {
              constant: true,
              inputs: [{ name: "_owner", type: "address" }],
              name: "balanceOf",
              outputs: [{ name: "balance", type: "uint256" }],
              type: "function",
            },
          ];
          const contract = new library.eth.Contract(minAbi, aromaAddress);
          const balance = await contract.methods.balanceOf(account).call();
          setBalance(balance);
        } catch (e) {
          console.log(e);
        }
      }
      loadBalance();
    }
  }, [account, library]); // ensures refresh if referential identity of library doesn't change across chainIds

  return <span>{balance === null ? "Error" : balance ? `AROMA ${balance}` : ""}</span>;
};

export default AromaBalance;
