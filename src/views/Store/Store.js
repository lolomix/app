import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import { getWeb3ReactContext } from "@web3-react/core";
// material-ui
import { Box, Container, Grid } from "@mui/material";
// custom
import CurrencyExchange from "../../components/CurrencyExchange";
//import StoreSteps from "../../components/StoreSteps";
import NFTBuy from "../../components/NFTBuy";
import Headline from "../../components/layout/Headline";
import DripDivider from "../../components/layout/DripDivider";
import FAQ from "../../components/common/FAQ";
import { NETWORKS, TARGET_CHAIN } from "../../web3/constants";

class Store extends Component {
  /*
  componentDidMount() {
    document.body.className = "store";
  }
  */
  static contextType = getWeb3ReactContext();
  state = {
    step: "buy-aroma",
    message: "",
  };

  // todo: get this from the ancestor - please remove if not used
  walletHasAroma = () => {
    return true;
  };

  // todo: get this from the ancestor - please remove if not used
  walletHasEnoughAroma = () => {
    return true;
  };

  // todo: get this from the ancestor - please remove if not used
  // check for Season 1 CryptoChef
  walletHasNFT = () => {
    return true;
  };

  // if (this.walletHasAroma && this.walletHasNFT) {
  //   this.setState({step: 'wait-for-reveal'})
  // } else (this.walletHasAroma) {
  //   this.setState({step: 'buy-nft'})
  // }

  render() {
    // Pass this array to the FAQ component to amend the
    // list of questions and order.
    const { t } = this.props;
    const faqKeys = ["WhatIsAroma", "WhatIsACryptochefNFT", "WhatIsARecipe", "WhatIsTheBuffet", "WhyDoIHaveToLockUpAroma"];
    const web3ready = this.context.chainId === NETWORKS[TARGET_CHAIN].chainId;

    return (
      <>
        <Box id="store" pb={10} sx={{ backgroundColor: "background.default" }}>
          <DripDivider variant={1} color="sunGlow.main" />
          <Container as="section">
            <Headline color="white" title={t("store.title")} />
            <Grid container justifyContent="center" alignItems="stretch" spacing={2}>
              <Grid item sm={12} md={12}>
                {/* <StoreSteps /> */}
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <CurrencyExchange variant="fullHeight" web3ready={web3ready} />
              </Grid>
              <Grid item sm={12} md={8}>
                <NFTBuy variant="fullHeight" web3ready={web3ready} />
              </Grid>
            </Grid>
          </Container>
        </Box>

        <Box id="faq" pb={10} sx={{ backgroundColor: "columbiaBlue.main" }}>
          <DripDivider variant={2} color="cafeNoir.main" />
          <Container as="section">
            <Headline variant="h2" title="FAQ" />
            <Grid container justifyContent="center" alignItems="center" spacing={2}>
              <Grid item sm={12} md={8}>
                <FAQ faqKeys={faqKeys} />
              </Grid>
            </Grid>
          </Container>
        </Box>
      </>
    );
  }
}

export default withTranslation()(Store);
