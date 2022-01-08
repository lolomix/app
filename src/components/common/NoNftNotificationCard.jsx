import React from 'react'
import { Link } from 'react-router-dom'
// material-ui
import { Card, CardContent, Grid } from '@mui/material'
import Typography from '@mui/material/Typography'
// custom
import chefs from '../../assets/components/common/no-nft-notification-card/chefs@2x.png'

/**
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
function NoNftNotificationCard (props) {
  const { rest } = props

  return (
    <Card {...rest}>
      <CardContent>
        <Grid container justifyContent="center" alignItems="center">
          <Grid item textAlign="center">
            <img src={chefs}
                 alt="Chef Silhouettes"
                 style={{ maxWidth: '182px' }}
            />
            <Typography mt={3}>
              It seems that you do not own any CHEFs. <Link to="/market">Visit our Market</Link> to dive into our delicious word.
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default NoNftNotificationCard