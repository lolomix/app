import React, { Fragment, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { withTranslation } from "react-i18next";
//import { utils } from "web3";
import mainProxyAbi from "../../web3/abi/CryptoChefsERC721Facet.json";
import { NETWORKS, TARGET_CHAIN } from "../../web3/constants";
//mui
/*
import Tooltip from "@mui/material/Tooltip";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Popover from "@mui/material/Popover";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
*/
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

function BuyAroma(props) {
  const { t } = props;
  const { account, library } = useWeb3React();
  const [dialog, setDialog] = useState(false);
  const [amount, setAmount] = useState(100);

  const getSomeAroma = async () => {
    const contractMaster = NETWORKS[TARGET_CHAIN].contractMaster;
    const contract = new library.eth.Contract(mainProxyAbi, contractMaster);
    console.log(contract);
    try {
      const result = await contract.methods.buyAROMA(100).send({ value: "1000", from: account, gas: 10000000 });
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDialog = () => {
    setDialog(!dialog);
  };

  const changeAmount = (e) => setAmount(e.target.value);

  return (
    <Fragment>
      <Button
        variant="contained"
        onClick={() => {
          handleDialog();
        }}>
        {t("store.buyAroma")}
      </Button>
      <Dialog
        onClose={() => {
          handleDialog();
        }}
        open={dialog}
        keepMounted
        maxWidth="lg">
        <DialogContent>
          <Typography variant="h2" gutterBottom>
            Buy AROMA tokens
          </Typography>

          <TextField
            onChange={changeAmount}
            value={amount}
            label={t("store.buyAroma.fieldLabel")}
            helperText={t("store.buyAroma.fieldHelper")}
            placeholder={t("store.buyAroma.fieldPlaceholder")}
            variant="outlined"
            disabled={false}
            margin="normal"
            type="number"
          />

          <Typography variant="body2" gutterBottom>
            Costs: ...
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => getSomeAroma()} variant="contained">
            Buy now
          </Button>
          <Button
            onClick={() => {
              handleDialog();
            }}
            variant="outlined"
            color="primary">
            {t("base.cancel")}
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}

export default withTranslation()(BuyAroma);
