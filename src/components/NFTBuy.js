import React, { Fragment, useState } from "react";
import { withTranslation } from "react-i18next";
import { useWeb3React } from "@web3-react/core";
// material-ui
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";
// custom
import ChefSilhouette from "./icons/ChefSilhouette";
import { NETWORKS, TARGET_CHAIN, AROMA_DECIMALS } from "../web3/constants";
import abi from "../web3/abi/CryptoChefsERC721Facet.json";

function NFTBuy({ t, fullHeight, web3ready }) {
  const { account, library } = useWeb3React();
  const [sold, setSold] = useState(1);
  const [remaining, setRemaining] = useState(0);
  const [price, setPrice] = useState(0);
  //const season = 1; // set season manually for the time being
  const contractMaster = NETWORKS[TARGET_CHAIN].contractMaster;

  /**
   * Definition of the `Buy CryptoCHEF` Button loading state
   */
  const [buyLoading, setBuyLoading] = React.useState(false);
  const [buyDialog, setBuyDialog] = React.useState(false);
  const [contract, setContract] = React.useState(false);

  const handleBuyDialog = () => {
    setBuyDialog(!buyDialog);
  };

  /**
   * Handles the actual exchange by triggering the blockchain transaction
   */
  const handleApprove = async () => {
    setBuyLoading(true);
    try {
      const result = await contract.methods.approve(account, "1000000000000000000").send({ from: account, gas: 10000000 });
      console.log(result);
      setBuyLoading(false);
    } catch (error) {
      console.log(error);
      setBuyLoading(false);
    }
  };

  const handleBuy = async () => {
    setBuyDialog(true);
    try {
      const result = await contract.methods.buyCryptoChef().send({ from: account, gas: 10000000 });
      console.log(result);
      setBuyLoading(false);
    } catch (error) {
      console.log(error);
      setBuyLoading(false);
    }
  };

  React.useEffect(() => {
    if (!!library && !contract) {
      setContract(new library.eth.Contract(abi, contractMaster));
    }
    if (!!library && contract) {
      async function loadSupply() {
        try {
          const cryptoChefSeasonSupply = await contract.methods.getCryptoChefSeasonSupply().call();
          setRemaining(cryptoChefSeasonSupply);
        } catch (e) {
          console.log(e);
        }
      }
      async function loadPrice() {
        try {
          const cryptoChefPrice = await contract.methods.getCryptoChefPrice().call();
          setPrice(cryptoChefPrice);
        } catch (e) {
          console.log(e);
        }
      }
      loadSupply();
      loadPrice();
    }
  }, [library, contract, contractMaster]); // ensures refresh if referential identity of library doesn't change across chainIds

  return (
    <Fragment>
      <Card fullHeight={fullHeight} elevation={3}>
        {web3ready ? (
          <CardContent>
            <Typography variant="h4" component="h2" align="center" mb={4}>
              {t('components.NFTBuy.title')}
            </Typography>
            <Grid container spacing={6} justifyContent="center" alignItems="stretch">
              <Grid item xs={12} md={6}>
                <Typography gutterBottom variant="h5" component="div" textAlign="center" mt={3} sx={{ 'textTransform': 'uppercase' }}>
                  {t('components.NFTBuy.remaining')}
                </Typography>
                <Typography gutterBottom variant="h1" component="div" textAlign="center" color="secondary" sx={{ 'textTransform': 'uppercase', 'fontWeight': 'bold' }}>
                  {remaining}
                </Typography>
                <Typography gutterBottom variant="h6" component="div" textAlign="center" mb={3} sx={{ 'textTransform': 'uppercase' }}>
                  {sold} {t('components.NFTBuy.sold')}
                </Typography>

                <Divider variant="middle" />

                <Grid container alignContent="center" alignItems="center" mt={3} mb={6}>
                  <Grid item xs p={1}>
                    <Typography textAlign="center" sx={{ 'textTransform': 'uppercase' }}>
                      {t('components.NFTBuy.season')}
                    </Typography>
                    <Typography textAlign="center" color="secondary" sx={{ 'textTransform': 'uppercase', 'fontWeight': 'bold' }}>
                      ONE
                    </Typography>
                  </Grid>

                  <Divider flexItem orientation="vertical" />

                  <Grid item xs p={1}>
                    <Typography variant="body2" textAlign="center" sx={{ 'textTransform': 'uppercase' }}>
                      {t('components.NFTBuy.pricePerCryptoCHEF')}
                    </Typography>
                    <Typography variant="h5" color="secondary" textAlign="center" sx={{ 'fontWeight': 'bold', 'textTransform': 'uppercase' }}>
                      {price / AROMA_DECIMALS} AROMA
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item sm={12} md={6} spacing={4} container justifyContent="center">
                <Grid item xs={10}>
                  <Card fullHeight={true}
                        variant="outlined"
                        sx={{
                          maxWidth: "280px",
                          backgroundColor: "#F7D2A3",
                          display: "block",
                          margin: "auto"
                        }}
                  >
                    <CardContent sx={{height: "100%"}}>
                      <Grid container justifyContent="center" alignItems="center" sx={{height: "100%"}}>
                        <Grid item>
                          <ChefSilhouette sx={{ fontSize: 170 }} />
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={10}>
                  <LoadingButton
                    mt={2}
                    color="secondary"
                    size="xlarge"
                    variant="contained"
                    fullWidth
                    onClick={handleBuyDialog}
                    loading={buyLoading}
                  >
                    {t("components.NFTBuy.buyButton")}
                  </LoadingButton>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        ) : (
          <CardContent>
            <Typography variant="body2" align="center" my={20}>
              { t("base.connectWalletAndNetwork") }
            </Typography>
          </CardContent>
        )}
      </Card>
      <Dialog onClose={handleBuyDialog} open={buyDialog} keepMounted maxWidth="md">
        <DialogContent>
          <Typography variant="h2" gutterBottom>
            Buy CHEF
          </Typography>
          <Typography variant="body2" gutterBottom>
            To buy a CHEF NFT, you need to do 2 Web3 Transactions. First, you need to approve that you have enough AROMA in your wallet. Second, you spend AROMA
            tokens to buy the CHEF NFT.
          </Typography>
          <Typography variant="body2" gutterBottom>
            Step 1
          </Typography>
          <Button onClick={handleApprove} variant="contained" color="primary">
            1. Approve
          </Button>
          <Typography variant="body2" gutterBottom>
            Step 2
          </Typography>
          <Button onClick={handleBuy} variant="contained" color="primary">
            2. Buy CHEF NFT
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleBuyDialog} variant="outlined" color="primary">
            {t("base.close")}
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}

export default withTranslation()(NFTBuy);
