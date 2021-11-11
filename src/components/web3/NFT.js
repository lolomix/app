import React from 'react'
import PropTypes from 'prop-types'
// material-ui
import { Card, CardContent, Grid } from '@mui/material'
import Typography from '@mui/material/Typography'
// custom
import ChefSilhouetteIcon from '../icons/ChefSilhouetteIcon'
import SuspenseImage from '../common/SuspenseImage'
import { useNFTWithMetadata } from '../../hooks/useNFTWithMetadata'
// web3
import { NETWORKS, TARGET_CHAIN } from '../../web3/constants'
import tokenAbi from '../../web3/abi/CryptoChefsERC721Facet.json'

function NFT ({ tokenID }) {
  const tokenAddress = NETWORKS[TARGET_CHAIN].contractMaster
  const NFT = useNFTWithMetadata(tokenAbi, tokenAddress, tokenID)

  return <Card fullheight="true" elevation={2}>
    <CardContent>
      <Grid container justifyContent="center" alignItems="center">
        <Grid item>
          {!NFT ? (
            <>
              <Typography variant="h5">#{tokenID}</Typography>
              <ChefSilhouetteIcon sx={{ fontSize: 205 }}/>
              <Typography textAlign="center" variant="h6">
                Unminted CHEF
              </Typography>
            </>
          ) : (
            <>
              <Typography variant="h5">#{NFT.tokenID}</Typography>
              <SuspenseImage style={{ maxWidth: '100%' }}
                             src={NFT.metadata.image}
                             alt={NFT.metadata.name + ' image'}
              />
              <Typography textAlign="center"
                          variant="h6">
                {NFT.metadata.name}
              </Typography>
            </>
          )}
        </Grid>
      </Grid>
    </CardContent>
  </Card>
}

/**
 * @type {{tokenID: Validator<NonNullable<number>>}}
 */
NFT.propTypes = {
  tokenID: PropTypes.number.isRequired,
}

export default NFT