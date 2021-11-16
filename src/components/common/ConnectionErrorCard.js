import React from 'react'
import PropTypes from 'prop-types'
// material-ui
import { Card, CardContent, Grid } from '@mui/material'
import Typography from '@mui/material/Typography'
// custom
import { getErrorMessage } from '../../web3/errors'
import bg from '../../assets/components/common/please-connect/bg@2x.png'

/**
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
function ConnectionErrorCard (props) {
  const { error, rest } = props

  return (
    <Card {...rest}>
      <CardContent>
        <Grid container justifyContent="center" alignItems="center">
          <Grid item textAlign="center">
            <img src={bg}
                 alt="Crypto Wallet Providers"
                 style={{ maxWidth: '182px' }}
            />
            <Typography mt={3}>
              {getErrorMessage(error)}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

/**
 * @type {{error: Validator<NonNullable<Error>>}}
 */
ConnectionErrorCard.propTypes = {
  error: PropTypes.instanceOf(Error)
}

export default ConnectionErrorCard