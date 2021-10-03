import React from "react";

import { withTranslation } from 'react-i18next'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Card from '@mui/material/Card'
import { Divider } from '@mui/material'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'

class NFTBuy extends React.Component {
  state = {
    currentNFT: 'cryptochefsS01',
    NFTs: {
      cryptochefsS01: {
        sold: 0,
        remaining: 0,
        price: 34231,
        season: 1
      }
    }
  }

  buy = () => {
    console.log('Buy Nft')
  }

  render() {
    const { t, fullHeight } = this.props;
    const NFT = this.state.NFTs[this.state.currentNFT]

    let sx = {};

    if (fullHeight) {
      sx = { height: "100%" }
    }

    return (
      <Card sx={sx}>
        <CardContent>
          <Typography gutterBottom variant="h5" textAlign="center">
            CryptoChefs
          </Typography>
          <Typography gutterBottom variant="h6" textAlign="center">
            Remaining
          </Typography>
          <Typography gutterBottom variant="h1" textAlign="center">
            {NFT.remaining}
          </Typography>
          <Typography gutterBottom variant="h4" color="purple" textAlign="center">
            {NFT.sold} Sold
          </Typography>

          <Divider />

          <Grid container alignContent="center" alignItems="center" mt={2} mb={6}>
            <Grid item xs p={1}>
              Season {NFT.season}
            </Grid>
            <Divider orientation="vertical" flexItem />
            <Grid item xs p={1}>
              <Typography variant="body1">
                Price per CryptoChef
              </Typography>
              <Typography variant="h5" color="purple">
                {NFT.price} AROMA
              </Typography>
            </Grid>
          </Grid>
          <Button variant="contained" fullWidth onClick={this.buy}>Buy CryptoChef</Button>
        </CardContent>
      </Card>
    );
  }
}

export default withTranslation()(NFTBuy);

