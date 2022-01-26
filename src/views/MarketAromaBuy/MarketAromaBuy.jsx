import { Container, Grid } from "@mui/material";
import React from "react";
import CurrencyExchange from "../../components/web3/CurrencyExchange";
import ViewHeading from "../../components/layout/ViewHeading";

const MarketAromaBuy = () => {
  return (
    <Container maxWidth="xs">
      <ViewHeading title="Aroma" />
      <CurrencyExchange />
    </Container>
  );
};
export default MarketAromaBuy;
