import React  from 'react'
import { Helmet } from 'react-helmet'
import { withTranslation } from 'react-i18next'
import { useEthers } from '@usedapp/core'
// material-ui
import { Box, Container, Grid, Skeleton } from '@mui/material'
// custom
import Headline from '../../components/layout/Headline'
import DripDivider from '../../components/layout/DripDivider'
import NFTCard from '../../components/web3/NFTCard'
import FAQ from '../../components/common/FAQ'
import NoNFTNotificationCard from '../../components/common/NoNFTNotificationCard'
import tokenAbi from '../../web3/abi/CryptoChefsERC721Facet.json'
import { NETWORKS, TARGET_CHAIN } from '../../web3/constants'
import { useTokensOfOwner } from '../../hooks/useTokensOfOwner'
import ConnectionErrorCard from '../../components/common/ConnectionErrorCard'
import { useCHEFOfOwner } from '../../hooks/useCHEFofOwner'
import { BigNumber } from 'ethers'

/**
 * @returns {JSX.Element}
 * @constructor
 *
 * @todo refactor and get rid of if hell in jsx
 */
function Collection () {
  const { active, error } = useEthers();

  const tokenAddress = NETWORKS[TARGET_CHAIN].contractMaster
  const nfts = useCHEFOfOwner()

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
          <Headline variant="h5" mt={0} textAlign="center">
            {active && (nfts ? (
              <>Total CHEFs Owned: {nfts.length}</>
              ) : (
              <Skeleton variant="h5" width={220} sx={{ margin: "auto" }}/>
            ))}
          </Headline>
          <Grid container justifyContent="center" alignItems="stretch">
            {active ? (
              nfts ? (
                nfts.length ? (
                  <Grid item md={12} lg={10} container spacing={5}>
                    {nfts.map((tokenID, index) => (
                      <Grid key={tokenID.toString()} item sm={12} md={6}>
                        <a target="_blank"
                           rel="noreferrer nofollow"
                           href={`${NETWORKS[TARGET_CHAIN].openSeaLink}/${NETWORKS[TARGET_CHAIN].contractMaster}/${tokenID.toString()}`}
                           style={{ textDecoration: 'none' }}
                        >
                          <NFTCard tokenAbi={tokenAbi}
                                   tokenAddress={tokenAddress}
                                   tokenID={tokenID.toNumber()}
                                   lazyLoad={index > 2}
                          />
                        </a>
                      </Grid>
                    ))}
                  </Grid>
                ) : (
                  <Grid item md={6} mb={21}>
                    <NoNFTNotificationCard/>
                  </Grid>
                )
              ) : (
                <Grid item md={6} mb={21}>
                  <Skeleton variant="rectangular" height={350}/>
                </Grid>
              )
            ) : (
              <Grid item xs={10} sm={7} md={5} lg={4} mb={21}>
                <ConnectionErrorCard error={error} elevation={3}/>
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
              <FAQ color="secondary.contrastText" />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  )
}

export default withTranslation()(Collection)
