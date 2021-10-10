import React, { useState } from 'react'
import { withTranslation } from 'react-i18next'
// material-ui
import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
} from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
// custom
import ChefSilhouette from './icons/ChefSilhouette'

function NFTBuy ({ t, variant }) {
  const [sold, setSold] = useState(1)
  const [remaining, setRemaining] = useState(5554)
  const [price, setPrice] = useState(1000)
  const [season, setSeason] = useState(1)

  /**
   * Definition of the `Buy CryptoCHEF` Button loading state
   */
  const [buyLoading, setBuyLoading] = React.useState(false)

  /**
   * Handles the actual exchange by triggering the blockchain transaction
   * todo: connect to web3
   */
  const handleBuy = () => {
    setBuyLoading(true)

    // todo: replace with the transaction
    // please use `setBuyLoading` to make it work
    console.log('Has AROMA approved to be spent?')
    console.log('Approve it')
    console.log('Quick Validation there is sufficient AROMA')
    console.log('Create Transaction Object')
    setTimeout(function () {
      console.log('Send a Transaction to the Network')
      console.log('Handle Errors... if needed')
      console.log('Transaction Successful...')
      setBuyLoading(false)
    }, 3000)
  }


 console.log(remaining)
  return (
    <Card variant={variant}>
      <CardContent>
        <Typography variant="h4" component="h3" align="center" gutterBottom>
          {t('components.NFTBuy.title')}
        </Typography>
        <Grid container justifyContent="center" alignItems="stretch" my={3}>
          <Grid item sm={12} md={6}>
            <Typography gutterBottom
                        variant="body1"
                        textAlign="center">
              {t('components.NFTBuy.remaining')}
            </Typography>
            <Typography gutterBottom
                        variant="h1"
                        textAlign="center">
              {remaining}
            </Typography>
            <Typography gutterBottom
                        variant="h4"
                        color="purple"
                        textAlign="center">
              {sold} {t('components.NFTBuy.sold')}
            </Typography>

            <Divider/>

            <Grid container alignContent="center" alignItems="center" mt={2}
                  mb={6}>
              <Grid item xs p={1}>
                {t('components.NFTBuy.season')} {season}
              </Grid>
              <Divider orientation="vertical" flexItem/>
              <Grid item xs p={1}>
                <Typography variant="body1">
                  {t('components.NFTBuy.pricePerCryptoCHEF')}
                </Typography>
                <Typography variant="h5" color="purple">
                  {price} AROMA
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item sm={12} md={6}>
            <Card sx={{
              backgroundColor: "#F7D2A3",
              margin: "0 32px"
            }}>
              <CardContent>
                <Box textAlign="center">
                  <ChefSilhouette sx={{ fontSize: 170 }} />
                </Box>
                <LoadingButton color="secondary"
                               size="xlarge"
                               variant="contained"
                               fullWidth
                               onClick={handleBuy}
                               loading={buyLoading}
                               loadingPosition="end"
                >
                  {t('components.NFTBuy.buyButton')}
                </LoadingButton>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default withTranslation()(NFTBuy)

