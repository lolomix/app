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
  static contextType = getWeb3ReactContext();
  state = {
    step: "buy-aroma",
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
    const { t } = this.props;
    const web3ready = this.context.chainId === NETWORKS[TARGET_CHAIN].chainId;
    const error = this.context.error;

    /**
     * List of FAQ items to display.
     * @type {string[]}
     */
    const faqKeys = ["WhatIsAroma", "WhatIsACryptochefNFT", "WhatIsARecipe", "WhatIsTheBuffet", "WhyDoIHaveToLockUpAroma"];

    return (
      <>
        <Box id="store" pb={10} sx={{ backgroundColor: "background.default" }}>
          <DripDivider variant={1} color="sunGlow.main" />
          <Container as="section">
            <Headline color="white" title={t("store.title")} />
            <Grid container spacing={3} justifyContent="center" alignItems="stretch">
              <Grid item xs={12}>
                {/*   <StoreSteps step={this.state.step} web3ready={web3ready} /> */}
              </Grid>
              <Grid item xs={12} lg={4}>
                <CurrencyExchange fullHeight={true} web3ready={web3ready} />
              </Grid>
              <Grid item xs={12} lg={8}>
                <NFTBuy fullHeight={true} web3ready={web3ready} error={error} />
              </Grid>
            </Grid>
          </Container>
        </Box>

        <Box id="faq" pb={10} sx={{ backgroundColor: "darkSkyBlue.main" }}>
          <DripDivider variant={2} color="cafeNoir.main" />
          <Container as="section">
            <Headline variant="h2" title="FAQ" />
            <Grid container justifyContent="center" alignItems="center" spacing={2}>
              <Grid item xs={12} sm={10} md={8}>
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
