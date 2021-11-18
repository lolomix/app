import React  from 'react'
import { withTranslation } from 'react-i18next'
// material-ui
import {
  Box,
  Container,
  Grid
} from '@mui/material'

import Headline from '../../components/layout/Headline'
import DripDivider from '../../components/layout/DripDivider'
import NFTCard from '../../components/web3/NFTCard'
import FAQ from '../../components/common/FAQ'
import { Helmet } from 'react-helmet'
import tokenAbi from '../../web3/abi/CryptoChefsERC721Facet.json'
import { NETWORKS, TARGET_CHAIN } from '../../web3/constants'
import { useTokensOfOwners } from '../../hooks/useTokensOfOwners'
import NoNFTNotificationCard from '../../components/common/NoNFTNotificationCard'

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
];

/**
 * @returns {JSX.Element}
 * @constructor
 */
function Collection () {
  const tokenAddress = NETWORKS[TARGET_CHAIN].contractMaster
  const nfts = useTokensOfOwners(tokenAbi, tokenAddress)

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
            Total CHEFs Owned: {nfts.length}
          </Headline>
          <Grid container justifyContent="center" alignItems="stretch">
            {nfts.length ? (
              <Grid item md={12} lg={10} container spacing={5}>
                {nfts.map((tokenID, index) => (
                  <Grid key={tokenID} item xs={12} sm={6} md={4}>
                    <NFTCard tokenAbi={tokenAbi}
                             tokenAddress={tokenAddress}
                             tokenID={tokenID}
                             lazyLoad={index > 2}
                    />
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Grid item md={6}>
                <NoNFTNotificationCard/>
              </Grid>
            )}
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
