import React, { Fragment, useState } from "react";
import { withTranslation } from "react-i18next";
import { useWeb3React } from "@web3-react/core";
import { useSnackbar } from "notistack";
// material-ui
import {
  Card,
  CardContent,
  DialogTitle,
  Divider,
  Grid,
  Typography,
} from '@mui/material'
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";
// custom
import { NETWORKS, TARGET_CHAIN, AROMA_DECIMALS } from "../web3/constants";
import abi from "../web3/abi/CryptoChefsERC721Facet.json";
import abiAroma from "../web3/abi/AROMATokenMatic.json";
import ToastLoading from "./notification/ToastLoading";
import ToastLoadingIndeterminate from "./notification/ToastLoadingIndeterminate";
import ChefSilhouetteIcon from "./icons/ChefSilhouetteIcon";

function NFTBuy({ t, fullHeight, web3ready }) {
  const { account, library } = useWeb3React();
  //const [sold, setSold] = useState(1);
  const sold = 1;
  const [remaining, setRemaining] = useState(0);
  const [price, setPrice] = useState(0);
  //const season = 1; // set season manually for the time being

  /**
   * Definition of the `Buy CryptoCHEF` Button loading state
   */
  const [buyLoading, setBuyLoading] = React.useState(false);
  const [buyDialog, setBuyDialog] = React.useState(false);
  const [contractErc721, setContractErc721] = React.useState(false);
  const contractMasterAddress = NETWORKS[TARGET_CHAIN].contractMaster;
  const contractAromaAddress = NETWORKS[TARGET_CHAIN].contractAroma;
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const handleBuyDialog = () => {
    setBuyDialog(!buyDialog);
  };

  /**
   * Handles the actual exchange by triggering the blockchain transaction
   */
  const handleApprove = async () => {
    setBuyLoading(true);
    let loadingSnackbar = enqueueSnackbar("Transaction ongoing", {
      variant: "warning",
      persist: true,
      action: <ToastLoadingIndeterminate />,
    });
    try {
      const contractAroma = new library.eth.Contract(abiAroma, contractAromaAddress);
      const resultApprove = await contractAroma.methods.approve(contractMasterAddress, "1000000000000000000").send({ from: account, gas: 10000000 });
      console.log(resultApprove);
      const result = await contractErc721.methods.buyCryptoChef().send({ from: account, gas: 10000000 });
      console.log(result);
      closeSnackbar(loadingSnackbar);
      enqueueSnackbar("Success", {
        variant: "success",
        action: (snackKey) => <ToastLoading snackKey={snackKey} closeSnackbar={closeSnackbar} />,
      });
      setBuyLoading(false);
    } catch (error) {
      console.log(error);
      closeSnackbar(loadingSnackbar);
      enqueueSnackbar("Error", {
        variant: "error",
        action: (snackKey) => <ToastLoading snackKey={snackKey} closeSnackbar={closeSnackbar} />,
      });
      setBuyLoading(false);
    }
  };

  React.useEffect(() => {
    if (!!library && !contractErc721) {
      setContractErc721(new library.eth.Contract(abi, contractMasterAddress));
    }
    if (!!library && contractErc721) {
      async function loadSupply() {
        try {
          const cryptoChefSeasonSupply = await contractErc721.methods.getCryptoChefSeasonSupply().call();
          setRemaining(cryptoChefSeasonSupply);
        } catch (e) {
          console.log(e);
        }
      }
      async function loadPrice() {
        try {
          const cryptoChefPrice = await contractErc721.methods.getCryptoChefPrice().call();
          setPrice(cryptoChefPrice);
        } catch (e) {
          console.log(e);
        }
      }
      loadSupply();
      loadPrice();
    }
  }, [library, contractErc721, contractMasterAddress]); // ensures refresh if referential identity of library doesn't change across chainIds

  return (
    <Fragment>
      <Card fullHeight={fullHeight} elevation={3}>
        {web3ready ? (
          <CardContent>
            <Typography variant="h4" component="h2" align="center" mb={4}>
              {t("components.NFTBuy.title")}
            </Typography>
            <Grid container spacing={6} justifyContent="center" alignItems="stretch">
              <Grid item xs={12} md={6}>
                <Typography gutterBottom variant="h5" component="div" textAlign="center" mt={3} sx={{ textTransform: "uppercase" }}>
                  {t("components.NFTBuy.remaining")}
                </Typography>
                <Typography
                  gutterBottom
                  variant="h1"
                  component="div"
                  textAlign="center"
                  color="secondary"
                  sx={{ textTransform: "uppercase", fontWeight: "bold" }}>
                  {remaining}
                </Typography>
                <Typography gutterBottom variant="h6" component="div" textAlign="center" mb={3} sx={{ textTransform: "uppercase" }}>
                  {sold} {t("components.NFTBuy.sold")}
                </Typography>

                <Divider variant="middle" />

                <Grid container alignContent="center" alignItems="center" mt={3} mb={6}>
                  <Grid item xs p={1}>
                    <Typography textAlign="center" sx={{ textTransform: "uppercase" }}>
                      {t("components.NFTBuy.season")}
                    </Typography>
                    <Typography textAlign="center" color="secondary" sx={{ textTransform: "uppercase", fontWeight: "bold" }}>
                      ONE
                    </Typography>
                  </Grid>

                  <Divider flexItem orientation="vertical" />

                  <Grid item xs p={1}>
                    <Typography variant="body2" textAlign="center" sx={{ textTransform: "uppercase" }}>
                      {t("components.NFTBuy.pricePerCryptoCHEF")}
                    </Typography>
                    <Typography variant="h5" color="secondary" textAlign="center" sx={{ fontWeight: "bold", textTransform: "uppercase" }}>
                      {price / AROMA_DECIMALS} AROMA
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item sm={12} md={6} spacing={4} container justifyContent="center">
                <Grid item xs={8}>
                  <Card
                    fullHeight={true}
                    elevation={2}
                    sx={{
                      maxWidth: "280px",
                      paddingTop: "16px",
                      paddingBottom: "16px",
                      backgroundColor: "white"
                    }}>
                    <CardContent>
                      <Grid container justifyContent="center" alignItems="center">
                        <Grid item>
                          <ChefSilhouetteIcon sx={{ fontSize: 205 }} />
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={10}>
                  <LoadingButton color="secondary" size="xlarge" variant="contained" fullWidth onClick={handleBuyDialog} loading={buyLoading}>
                    {t("components.NFTBuy.buyButton")}
                  </LoadingButton>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        ) : (
          <CardContent>
            <Typography variant="body2" align="center" my={20}>
              {t("base.connectWalletAndNetwork")}
            </Typography>
          </CardContent>
        )}
      </Card>
      <Dialog onClose={handleBuyDialog} open={buyDialog} keepMounted maxWidth="sm">
        <DialogTitle>
          Buy CHEF
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1" gutterBottom>
            You can only buy CHEF NFT with AROMA.
          </Typography>
          <Typography p={1} variant="body2" gutterBottom>
            1. Approve AROMA token in your wallet.<br />
            2. Spend AROMA token to buy the CHEF NFT.
          </Typography>
          <Typography variant="caption" gutterBottom>
            (Please be patient and stay on this site until both transactions are successful.)
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button disableElevation onClick={handleBuyDialog} variant="contained" color="primary">
            {t("base.close")}
          </Button>
          <Button disableElevation onClick={handleApprove} variant="contained" color="secondary" disabled={buyLoading}>
            Approve & Buy CHEF NFT
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}

export default withTranslation()(NFTBuy);
