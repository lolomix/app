import React, { Component } from "react";
import { withTranslation } from "react-i18next";
//material-ui
import Grid from "@mui/material/Grid";
import TokenExchange from "../../components/CurrencyExchange";
import StoreSteps from "../../components/StoreSteps";
import NFTBuy from "../../components/NFTBuy";
import NFTSilhouette from "../../components/NFTSilhouette";
import Headline from "../../components/layout/Headline";

class Store extends Component {
  componentDidMount() {
    document.body.className = "store";
  }
  render() {
    //  const { t } = this.props;

    return (
      <Grid item xs={12} md={9} xl={6} id="store">
        <Headline title={"store.title"} />
        <Grid container spacing={2}>
          <Grid item sm={12} md={12}>
            <StoreSteps />
          </Grid>
          <Grid item sm={12} md={4}>
            <TokenExchange fullHeight />
          </Grid>
          <Grid item sm={12} md={4}>
            <NFTBuy fullHeight />
          </Grid>
          <Grid item sm={12} md={4}>
            <NFTSilhouette fullHeight />
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default withTranslation()(Store);
