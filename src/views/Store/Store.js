import React from 'react'
import { withTranslation } from 'react-i18next'
// material-ui
import { Box, Container, Grid } from '@mui/material'
// custom
import CurrencyExchange from '../../components/CurrencyExchange'
import NFTBuy from '../../components/NFTBuy'
import Headline from '../../components/layout/Headline'
import DripDivider from '../../components/layout/DripDivider'
import FAQ from '../../components/common/FAQ'
import PleaseConnectCard from '../../components/common/PleaseConnectCard'
import { useWeb3React } from '@web3-react/core'

/**
 * List of FAQ items to display.
 * @type {string[]}
 */
const faqKeys = [
  'WhatIsAroma',
  'WhatIsACryptochefNFT',
  'WhatIsARecipe',
  'WhatIsTheBuffet',
  'WhyDoIHaveToLockUpAroma'
]

/**
 * @param t
 * @returns {JSX.Element}
 * @constructor
 */
function Store ({ t }) {
  const { active } = useWeb3React();

  return (
    <>
      <Box id="store" pb={10} pt={1} sx={{ backgroundColor: 'sunGlow.main' }}>
        <Container as="section">
          <Headline title={t('store.title')}/>
          <Grid container
                spacing={3}
                justifyContent="center"
                alignItems="stretch"
          >
            {active ? (
              <>
                <Grid item xs={12} lg={4}>
                  <CurrencyExchange fullheight="true"/>
                </Grid>
                <Grid item xs={12} lg={8}>
                  <NFTBuy fullheight="true"/>
                </Grid>
              </>
            ):(
              <Grid item xs={10} sm={7} md={5} lg={4}>
                <PleaseConnectCard elevation={3}/>
              </Grid>
            )}
          </Grid>
        </Container>
      </Box>

      <Box id="faq" pb={10} sx={{ backgroundColor: 'secondary.main' }}>
        <DripDivider variant={2} color="sunGlow.main"/>
        <Container as="section">
          <Headline variant="h2" color="secondary.contrastText" title="FAQ"/>
          <Grid container
                justifyContent="center"
                alignItems="center"
                spacing={2}
          >
            <Grid item xs={12} sm={10} md={8}>
              <FAQ color="secondary.contrastText" faqKeys={faqKeys}/>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  )
}

export default withTranslation()(Store)