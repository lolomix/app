import React from "react";
import { Container } from "@mui/material";
import ViewHeading from "../../components/layout/ViewHeading";
import NftBuy from "../../components/web3/NftBuy";

const MarketChefBuy = () => {
  return (
    <Container>
      <ViewHeading title="Chef" />
      <NftBuy />
    </Container>
  );
};

export default MarketChefBuy;
