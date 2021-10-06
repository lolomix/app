import React from "react";
import { useWeb3React } from "@web3-react/core";
//import { utils } from "web3";
import mainProxyAbi from "../../web3/abi/CryptoChefsERC721Facet.json";
//mui
import Button from "@mui/material/Button";

const BuyAroma = function () {
  const { account, library } = useWeb3React();
  const getSomeAroma = async () => {
    const mainProxyAddress = "0x41E0984a75d6Ad506Ff5551BE38B0d97C88Ea4A3";
    const contract = new library.eth.Contract(mainProxyAbi, mainProxyAddress);
    console.log(contract);
    try {
      const result = await contract.methods.buyAROMA(100).send({ value: "1000", from: account, gas: 10000000 });
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Button
      onClick={() => {
        getSomeAroma();
      }}>
      Get few AROMA
    </Button>
  );
};

export default BuyAroma;