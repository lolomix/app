import React from "react";
import { useWeb3React } from "@web3-react/core";
//import { utils } from "web3";
import Skeleton from "@mui/material/Skeleton";
import { NETWORKS, TARGET_CHAIN } from "../../web3/constants";
import abi from "../../web3/abi/CryptoChefsERC721Facet.json";

const NftList = function () {
  const { account, library } = useWeb3React();
  const [balance, setBalance] = React.useState();
  React.useEffect(() => {
    if (!!account && !!library) {
      async function loadNfts() {
        try {
          const contractMaster = NETWORKS[TARGET_CHAIN].contractMaster;
          const contract = new library.eth.Contract(abi, contractMaster);
          const balance = await contract.methods.tokensOfOwner(account).call({ from: account });
          setBalance(balance);
        } catch (e) {
          console.log(e);
        }
      }
      loadNfts();
    }
  }, [account, library]); // ensures refresh if referential identity of library doesn't change across chainIds

  return balance === null || !Array.isArray(balance) ? (
    <Skeleton variant="text" />
  ) : (
    <span>
      You have {balance.length} CHEF NFTs. (No.{" "}
      {balance.map((item) => (
        <span key={item}>{item} </span>
      ))}{" "}
      )
    </span>
  );
};

export default NftList;
