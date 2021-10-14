import React, { Fragment, useState } from "react";
import { withTranslation } from "react-i18next";
import { useWeb3React } from "@web3-react/core";
// material-ui
import { Box, Card, CardContent, Divider, Grid, Typography } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";
// custom
import ChefSilhouette from "./icons/ChefSilhouette";
import { NETWORKS, TARGET_CHAIN, AROMA_DECIMALS } from "../web3/constants";
import abi from "../web3/abi/CryptoChefsERC721Facet.json";

function NFTBuy({ t, variant, web3ready }) {
  const { account, library } = useWeb3React();
  //const [sold, setSold] = useState(1);
  const [remaining, setRemaining] = useState(0);
  const [price, setPrice] = useState(0);
  //  const [season, setSeason] = useState(1);
  const season = 1; // set season manually for the time being
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
   * todo: connect to web3
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
    // todo: replace with the transaction
    // please use `setBuyLoading` to make it work
    /*
    console.log("Has AROMA approved to be spent?");
    console.log("Approve it");
    console.log("Quick Validation there is sufficient AROMA");
    console.log("Create Transaction Object");
    setTimeout(function () {
      console.log("Send a Transaction to the Network");
      console.log("Handle Errors... if needed");
      console.log("Transaction Successful...");
      setBuyLoading(false);
    }, 3000);
    */
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
      <Card variant={variant}>
        {web3ready ? (
          <CardContent>
            <Typography variant="h4" component="h3" align="center" gutterBottom>
              {t("components.NFTBuy.title")}
            </Typography>
            <Grid container justifyContent="center" alignItems="stretch" my={3}>
              <Grid item sm={12} md={6}>
                <Typography gutterBottom variant="body1" textAlign="center">
                  {t("components.NFTBuy.remaining")}
                </Typography>
                <Typography gutterBottom variant="h1" textAlign="center">
                  {remaining}
                </Typography>
                {/*
                <Typography gutterBottom variant="h4" color="purple" textAlign="center">
                  {sold} {t("components.NFTBuy.sold")}
                </Typography>
                */}
                <Divider />

                <Grid container alignContent="center" alignItems="center" mt={2} mb={6}>
                  <Grid item xs p={1}>
                    {t("components.NFTBuy.season")} {season}
                  </Grid>
                  <Divider orientation="vertical" flexItem />
                  <Grid item xs p={1}>
                    <Typography variant="body1">{t("components.NFTBuy.pricePerCryptoCHEF")}</Typography>
                    <Typography variant="h5" color="purple">
                      {price / AROMA_DECIMALS} AROMA
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item sm={12} md={6}>
                <Card
                  sx={{
                    backgroundColor: "#F7D2A3",
                    margin: "0 32px",
                  }}>
                  <CardContent>
                    <Box textAlign="center">
                      <ChefSilhouette sx={{ fontSize: 170 }} />
                    </Box>
                    <LoadingButton
                      color="secondary"
                      size="xlarge"
                      variant="contained"
                      fullWidth
                      onClick={handleBuyDialog}
                      loading={buyLoading}
                      loadingPosition="end">
                      {t("components.NFTBuy.buyButton")}
                    </LoadingButton>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </CardContent>
        ) : (
          <CardContent>
            <Typography variant="body2" align="center" gutterBottom>
              Connect your wallet and select the right chain.
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
