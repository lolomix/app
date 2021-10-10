import React from 'react'
import { withTranslation } from 'react-i18next'
import PropTypes from 'prop-types'
// material-ui
import {
  Box,
  CardContent,
  Card,
  LinearProgress,
  Grid,
  Typography
} from '@mui/material'
import { ContactSupport } from '@mui/icons-material';
import CurrencyAromaIcon from './icons/CurrencyAromaIcon'


function StoreSteps({ t, step }) {

  const progressMap = {
    "buy-aroma": 33,
    "buy-cryptochef": 66,
    "wait-for-reveal": 99
  }

  const progress = progressMap[step] ?? 1;

  return (
    <Card>
      <CardContent>
        <Grid container>
          <Grid item sm={4}>
            <Grid container alignContent="center" justifyContent="center">
              <Grid item>
                <CurrencyAromaIcon/>
              </Grid>
              <Grid item>
                <Typography px={1}>
                  Exchange AROMA tokens
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item sm={4}>
            <Grid container alignContent="center" justifyContent="center">
              <Grid item>
                {/* todo: chef head icon*/}
                <CurrencyAromaIcon/>
              </Grid>
              <Grid item>
                <Typography px={1}>
                  Buy a CryptoCHEF
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item sm={4}>
            <Grid container alignContent="center" justifyContent="center">
              <Grid item>
                <ContactSupport color="secondary"/>
              </Grid>
              <Grid item>
                <Typography px={1}>
                  Wait for Reveal
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Box pt={2}>
          <LinearProgress variant="determinate" value={progress} />
        </Box>
      </CardContent>
    </Card>
  )
}

StoreSteps.propTypes = {
  progress: PropTypes.number
}

export default withTranslation()(StoreSteps)