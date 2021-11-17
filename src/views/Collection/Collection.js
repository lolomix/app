import React, { useState } from 'react'
import { withTranslation } from 'react-i18next'
// material-ui
import {
  Box,
  Chip,
  Container,
  Grid
} from '@mui/material'

import Headline from '../../components/layout/Headline'
import DripDivider from '../../components/layout/DripDivider'
import NFT from '../../components/web3/NFT'
import FAQ from '../../components/common/FAQ'
import { Helmet } from 'react-helmet'

/**
 * List of FAQ items to display.
 * @type {string[]}
 */
const faqKeys = ["WhatIsAroma", "WhatIsACryptochefNFT", "WhatIsARecipe", "WhatIsTheBuffet", "WhyDoIHaveToLockUpAroma"];

function Collection ({t}) {
  // todo: remove hard-coded ids
  const nfts = [1, 2, 3, 4, 5, 6, 9999]

  return (
    <>
      <Helmet>
        <title>Collection</title>
      </Helmet>
      <Box pb={10} pt={1} sx={{ backgroundColor: 'sunGlow.main' }}>
        <Container as="section">
          <Headline mb={0}>
            Collection
          </Headline>
          <Headline variant="h5" mt={0}>
            Total CHEFs Owned: 5
          </Headline>
          <Grid container
                spacing={3}
                justifyContent="center"
                alignItems="stretch"
          >
            {nfts.map((value) => (
              <Grid key={value} item sm={4}>
                <NFT tokenID={value}/>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      <Box id="faq" pb={10} sx={{ backgroundColor: 'secondary.main' }}>
        <DripDivider variant={2} color="sunGlow.main"/>
        <Container as="section">
          <Headline variant="h2" color="secondary.contrastText">
            FAQ
          </Headline>
          <Grid container justifyContent="center" alignItems="center" spacing={2}>
            <Grid item xs={12} sm={10} md={8}>
              <FAQ color="secondary.contrastText" faqKeys={faqKeys} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  )
}

export default withTranslation()(Collection)
