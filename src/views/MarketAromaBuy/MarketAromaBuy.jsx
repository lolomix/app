import React from "react";
import CurrencyExchange from "../../components/web3/CurrencyExchange";
import Layout from "../../components/layout/Layout";

const MarketAromaBuy = () => {
  return (
    <Layout helmetTitle="Aroma - Buy" title="Aroma" buttonType="back">
      <CurrencyExchange />
    </Layout>
  );
};
export default MarketAromaBuy;
