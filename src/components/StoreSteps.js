import React from 'react'
import { withTranslation } from 'react-i18next'
import PropTypes from 'prop-types'
import { useWeb3React } from "@web3-react/core";
// material-ui
import { Box, CardContent, Card, LinearProgress, Grid, Typography } from '@mui/material'
import { ContactSupport } from '@mui/icons-material';
import CurrencyAROMAIcon from './icons/CurrencyAROMAIcon'
import ChefApronIcon from './icons/ChefApronIcon'
import { getErrorMessage} from "../web3/errors";

function StoreSteps({ t, step }) {

  const { error } = useWeb3React();

  const stepMap = {
    "buy-aroma": {
      progress: 15,
      text: t('components.StoreSteps.steps.buyAroma')
    },
    "buy-chef": {
      progress: 50,
      text: t('components.StoreSteps.steps.buyCHEF')
    },
    "wait-for-reveal": {
      progress: 85,
      text: t('components.StoreSteps.steps.waitForReveal')
    }
  }

  const progress = stepMap[step]?.progress ?? 1;

  return (
    <Card elevation={3}>
      {!error ? (
        <CardContent>
          <Grid container>
            <Grid item sm={4} container alignContent="center" justifyContent="center">
              <Grid item>
                <CurrencyAROMAIcon />
              </Grid>
              <Grid item>
                <Typography px={1}>
                  {t('components.StoreSteps.buyAromaTokens')}
                </Typography>
              </Grid>
            </Grid>
            <Grid item sm={4} container alignContent="center" justifyContent="center">
              <Grid item>
                <ChefApronIcon />
              </Grid>
              <Grid item>
                <Typography px={1}>
                  {t('components.StoreSteps.buyACHEF')}
                </Typography>
              </Grid>
            </Grid>
            <Grid item sm={4} container alignContent="center" justifyContent="center">
              <Grid item>
                <ContactSupport color="secondary"/>
              </Grid>
              <Grid item>
                <Typography px={1}>
                  {t('components.StoreSteps.waitForReveal')}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Box my={2}>
            <LinearProgress variant="determinate" value={progress}/>
          </Box>
          <Grid container justifyContent="center" alignItems="center" >
            <Grid item md={8}>
              <Typography textAlign="center">
                { stepMap[step].text }
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      ) : (
        <CardContent>
          <Typography variant="body2" align="center" my={4}>
          {getErrorMessage(error)}
          </Typography>
        </CardContent>
      )}
    </Card>
  )
}

StoreSteps.defaultProps = {
  step: 'buy-aroma'
}

StoreSteps.propTypes = {
  step: PropTypes.string
}

export default withTranslation()(StoreSteps)