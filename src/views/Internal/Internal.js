import React, { useState } from "react";
import { withTranslation } from "react-i18next";
import { useWeb3React } from "@web3-react/core";
import { useSnackbar } from "notistack";
// material-ui
import { Box, Container, OutlinedInput, Button, InputAdornment, Grid, Typography } from "@mui/material";
// custom
import Headline from "../../components/layout/Headline";
//import AromaPrice from "../../components/web3/AromaPrice";
import { NETWORKS, TARGET_CHAIN } from "../../web3/constants";
import abi from "../../web3/abi/CryptoChefsERC721Facet.json";
import abiAroma from "../../web3/abi/AROMATokenMatic.json";
import ToastLoading from "../../components/notification/ToastLoading";
import ToastLoadingIndeterminate from "../../components/notification/ToastLoadingIndeterminate";

function Internal({ t }) {
  const { account, library, chainId } = useWeb3React();
  const [isLoading, setIsLoading] = useState(false);
  const [contractErc721, setContractErc721] = useState(false);
  const [contractAroma, setContractAroma] = useState(false);
  const contractMasterAddress = NETWORKS[TARGET_CHAIN].contractMaster;
  const contractAromaAddress = NETWORKS[TARGET_CHAIN].contractAroma;
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [data, setData] = useState({});
  const [aromaPrice, setAromaPrice] = useState(0);
  const [chefPrice, setChefPrice] = useState(0);

  const handleAromaPrice = (event) => { setAromaPrice(event.target.value);  };
  const handleChefPrice = (event) => { setChefPrice(event.target.value);  };

  const deployAromaPrice = async () => {
    console.log(aromaPrice)
    console.log(account)
    setIsLoading(true);
    let loadingSnackbar = enqueueSnackbar("Transaction ongoing", {
      variant: "warning",
      persist: true,
      action: <ToastLoadingIndeterminate />,
    });
    try {
      const result = await contractErc721.methods.setAROMAPrice(aromaPrice).send({ from: account, gas: 10000000 });
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

  const deployChefPrice = async () => {
    setIsLoading(true);
    let loadingSnackbar = enqueueSnackbar("Transaction ongoing", {
      variant: "warning",
      persist: true,
      action: <ToastLoadingIndeterminate />,
    });
    try {
      const result = await contractErc721.methods.setCryptoChefPrice(chefPrice).send({ from: account, gas: 10000000 });
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
    if (!!library && !contractAroma) {
      setContractAroma(new library.eth.Contract(abiAroma, contractAromaAddress));
    }
    if(library && contractErc721 && contractAroma) {
      async function loadData() {
      let dataTemp = {};
      let result;
      try {
          result = await contractErc721.methods.getCryptoChefSeasonSupply().call();
          dataTemp.getCryptoChefSeasonSupply = result;
          result = await contractErc721.methods.getCryptoChefPrice().call();
          dataTemp.getCryptoChefPrice = result;
          result = await contractErc721.methods.getAROMAPrice().call();
          dataTemp.getAROMAPrice = result;
          result = await contractErc721.methods.totalSupply().call();
          dataTemp.totalSupply = result;
          result = await contractErc721.methods.symbol().call();
          dataTemp.symbol = result;
        setData(dataTemp);
        console.log(dataTemp)
      } catch (e) {
        console.log(e);
      }
    }
    loadData();
    }
  }, [library, contractErc721, contractMasterAddress, contractAroma, contractAromaAddress]); 

 // const isAdmin = account === NETWORKS[TARGET_CHAIN].adminAccount;
  const web3ready = chainId === NETWORKS[TARGET_CHAIN].chainId;

  return (
    <Box pb={10}>
    <Container as="section">
      <Headline color="white" title={t("internal.title")} />
      {web3ready ? ( // web3ready && isAdmin ? (
        <Grid container spacing={2}>
          <Grid item sm={12} md={6}>
            <Typography variant="h3">AROMA price</Typography>
            <Typography variant="body2">Set Price of AROMA in native currency.</Typography>
            <OutlinedInput
              variant="outlined"
              disabled={false}
              type="number"
              onChange={(e) => handleAromaPrice(e)}
              value={aromaPrice}
              endAdornment={
                <InputAdornment position="end">
                  <Button variant="contained" edge="end" disabled={isLoading} onClick={deployAromaPrice}>
                    Set price
                  </Button>
                </InputAdornment>
              }
            />
            <Typography variant="h3">CHEF Price</Typography>
            <Typography variant="body2">Set Price of CHEF NFT in AROMA.</Typography>
            <OutlinedInput
              variant="outlined"
              disabled={false}
              type="number"
              onChange={(e) => handleChefPrice(e)}
              value={chefPrice}
              endAdornment={
                <InputAdornment position="end">
                  <Button variant="contained" edge="end" disabled={isLoading} onClick={deployChefPrice}>
                    Set price
                  </Button>
                </InputAdornment>
              }
            />
          </Grid>
          <Grid item sm={12} md={6}>
            <Typography variant="h3">Addresses (parameters)</Typography>
            <Typography variant="body2">Contract Aroma: {NETWORKS[TARGET_CHAIN].contractAroma}</Typography>
            <Typography variant="body2">Contract Proxy Master: {NETWORKS[TARGET_CHAIN].contractMaster}</Typography>
            <Typography variant="body2" gutterBottom>Admin account: {NETWORKS[TARGET_CHAIN].adminAccount}</Typography>

            <Typography variant="h3">Stats CHEFS</Typography>
            <Typography variant="body2">Admin account: </Typography>
            <Typography variant="body2" gutterBottom >...</Typography>
            <Typography variant="body2">totalSupply: </Typography>
            <Typography variant="body2" gutterBottom >{data.totalSupply ? data.totalSupply : "DATA UNAVAILABLE"}</Typography>
            <Typography variant="body2">getCryptoChefSeasonSupply: </Typography>
            <Typography variant="body2" gutterBottom >{data.getCryptoChefSeasonSupply ? data.getCryptoChefSeasonSupply : "DATA UNAVAILABLE"}</Typography>
            <Typography variant="body2">getAROMAPrice: </Typography>
            <Typography variant="body2" gutterBottom >{data.getAROMAPrice ? data.getAROMAPrice : "DATA UNAVAILABLE"}</Typography>
            <Typography variant="body2">getCryptoChefPrice: </Typography>
            <Typography variant="body2" gutterBottom >{data.getCryptoChefPrice ? data.getCryptoChefPrice : "DATA UNAVAILABLE"}</Typography>
           
            <Typography variant="h3">Stats AROMA</Typography>
            <Typography variant="body2">Total Supply: </Typography>
            <Typography variant="body2" gutterBottom >...</Typography>
            <Typography variant="body2">Decimals: </Typography>
            <Typography variant="body2" gutterBottom >...</Typography>
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
