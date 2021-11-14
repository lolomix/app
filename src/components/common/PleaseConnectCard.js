import React from 'react'
// material-ui
import { Card, CardContent, Grid } from '@mui/material'
import Typography from '@mui/material/Typography'
// custom
import bg from '../../assets/components/common/please-connect/bg@2x.png'

/**
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
function PleaseConnectCard (props) {
  return (
    <Card {...props}>
      <CardContent>
        <Grid container justifyContent="center" alignItems="center">
          <Grid item>
            <img src={bg}
                 alt="Crypto Wallet Providers"
                 style={{ maxWidth: '182px' }}
            />
            <Typography mt={3} textAlign="center">
              Please connect your wallet
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default PleaseConnectCard