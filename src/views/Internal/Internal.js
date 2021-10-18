import React, { useState } from "react";
import { withTranslation } from "react-i18next";
import { useWeb3React } from "@web3-react/core";
import { useSnackbar } from "notistack";
// material-ui
import { Box, Container, OutlinedInput, Button, InputAdornment, Grid, Typography } from "@mui/material";
// custom
import Headline from "../../components/layout/Headline";
import AromaPrice from "../../components/web3/AromaPrice";
import { NETWORKS, TARGET_CHAIN } from "../../web3/constants";
import abi from "../../web3/abi/CryptoChefsERC721Facet.json";
import abiAroma from "../../web3/abi/AROMATokenMatic.json";
import ToastLoading from "../../components/notification/ToastLoading";
import ToastLoadingIndeterminate from "../../components/notification/ToastLoadingIndeterminate";

function Internal({ t }) {
  const { account, library, chainId } = useWeb3React();
  const [isLoading, setIsLoading] = useState(false);
  const [contractErc721, setContractErc721] = useState(false);
  const contractMasterAddress = NETWORKS[TARGET_CHAIN].contractMaster;
  const contractAromaAddress = NETWORKS[TARGET_CHAIN].contractAroma;
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const handleAromaPrice = async () => {
    setIsLoading(true);
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
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      closeSnackbar(loadingSnackbar);
      enqueueSnackbar("Error", {
        variant: "error",
        action: (snackKey) => <ToastLoading snackKey={snackKey} closeSnackbar={closeSnackbar} />,
      });
      setIsLoading(false);
    }
  };

  const handleChefNftPrice = async () => {
    setIsLoading(true);
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
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      closeSnackbar(loadingSnackbar);
      enqueueSnackbar("Error", {
        variant: "error",
        action: (snackKey) => <ToastLoading snackKey={snackKey} closeSnackbar={closeSnackbar} />,
      });
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    if (!!library && !contractErc721) {
      setContractErc721(new library.eth.Contract(abi, contractMasterAddress));
    }
    if (!!library && contractErc721) {
      async function loadSupply() {
        try {
          //const cryptoChefSeasonSupply = await contractErc721.methods.getCryptoChefSeasonSupply().call();
          //setRemaining(cryptoChefSeasonSupply);
        } catch (e) {
          console.log(e);
        }
      }
      async function loadPrice() {
        try {
          //const cryptoChefPrice = await contractErc721.methods.getCryptoChefPrice().call();
          //setPrice(cryptoChefPrice);
        } catch (e) {
          console.log(e);
        }
      }
      loadSupply();
      loadPrice();
    }
  }, [library, contractErc721, contractMasterAddress]); // ensures refresh if referential identity of library doesn't change across chainIds

  const isAdmin = account === NETWORKS[TARGET_CHAIN].adminAccount;
  const web3ready = chainId === NETWORKS[TARGET_CHAIN].chainId;

  return (
    <Box pb={10}>
    <Container as="section">
      <Headline color="white" title={t("internal.title")} />
      {web3ready && isAdmin ? (
        <Grid container spacing={2}>
          <Grid item sm={12} md={6}>
            <Typography variant="h3">AROMA price</Typography>
            <Typography variant="body2">Current price is <AromaPrice /></Typography>
            <Typography variant="body2">Set Price of AROMA in native currency.</Typography>
            <OutlinedInput
              placeholder="Amount"
              variant="outlined"
              disabled={false}
              margin="normal"
              type="number"
              endAdornment={
                <InputAdornment position="end">
                  <Button variant="contained" edge="end" disabled={isLoading} onClick={handleAromaPrice}>
                    Set price
                  </Button>
                </InputAdornment>
              }
            />

          </Grid>
          <Grid item sm={12} md={6}>
            <Typography variant="h3">CHEF Price</Typography>
            <Typography variant="body2">Set Price of CHEF NFT in AROMA.</Typography>
            <OutlinedInput
              placeholder="Amount"
              variant="outlined"
              disabled={false}
              margin="normal"
              type="number"
              endAdornment={
                <InputAdornment position="end">
                  <Button variant="contained" edge="end" disabled={isLoading} onClick={handleChefNftPrice}>
                    Set price
                  </Button>
                </InputAdornment>
              }
            />
          </Grid>
        </Grid>
      ) : (
        <Typography variant="body2">No access</Typography>
      )}
    </Container>
  </Box>
  );
}

export default withTranslation()(Internal);
