import React, { Component } from "react";
import { withTranslation } from "react-i18next";
//material-ui
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

class Store extends Component {
  render() {
    const { t } = this.props;

    return (
      <Grid item xs={12} md={9} xl={6}>
        <Typography variant="h1" gutterBottom>
          {t("store.title")}
        </Typography>
        <Grid container spacing={2}>
          <Grid item sm={12} md={6}>
            <Card>
              <CardContent>
                <Typography gutterBottom variant="h5">
                  Buy AROMA
                </Typography>
                <Typography variant="body2">It looks like that you are not yet a chef. In order to create a recipe, you must acquire a chef NFT.</Typography>
                <Box my={2}>
                  <TextField
                    id="outlined-basic"
                    label="AROMA tokens"
                    variant="outlined"
                    type="number"
                    helperText="Enter the amount of AROMA you want to buy."
                    inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                  />
                </Box>
                <Box my={2}>
                  <TextField
                    id="outlined-basic"
                    label="You pay"
                    variant="outlined"
                    type="number"
                    helperText="You're currently have 256 MATIC in your wallet."
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Box>
                <Button variant="contained">Buy 25 AROMA tokens</Button>
              </CardContent>
            </Card>
          </Grid>
          <Grid item sm={12} md={6}>
            <Card>
              <CardContent>
                <Typography gutterBottom variant="h5">
                  ...
                </Typography>
                <Typography variant="body2">Content form https://cryptochefs.github.io/store to be pasted here.</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default withTranslation()(Store);
