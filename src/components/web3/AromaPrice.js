import React from "react";
import { useWeb3React } from "@web3-react/core";
//import { utils } from "web3";
import Skeleton from "@mui/material/Skeleton";
import { NETWORKS, TARGET_CHAIN } from "../../web3/constants";
import abi from "../../web3/abi/CryptoChefsERC721Facet.json";

const AromaPrice = function () {
  const { account, library } = useWeb3React();
  const [price, setPrice] = React.useState();
  React.useEffect(() => {
    if (!!account && !!library) {
      async function loadPrice() {
        try {
          const contractMaster = NETWORKS[TARGET_CHAIN].contractMaster;
          const contract = new library.eth.Contract(abi, contractMaster);
          const price = await contract.methods.getAROMAPrice().call();
          setPrice(price);
        } catch (e) {
          console.log(e);
        }
      }
      loadPrice();
    }
  }, [account, library]); // ensures refresh if referential identity of library doesn't change across chainIds

  return price ? <span>{price}</span> : <Skeleton variant="text" />;
};

export default AromaPrice;
