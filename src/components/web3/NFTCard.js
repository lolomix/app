import React from 'react'
import PropTypes from 'prop-types'
// material-ui
import { Box, Card, CardContent, darken } from '@mui/material'
import Typography from '@mui/material/Typography'
// custom
import { useNFTWithMetadata } from '../../hooks/useNFTWithMetadata'
import { theme } from '../../utils/theme'
import placeholder from '../../assets/components/web3/nft-card/placeholder.png'

/**
 * @param tokenAbi
 * @param tokenAddress
 * @param tokenID
 * @param lazyLoad
 * @returns {JSX.Element}
 * @constructor
 */
function NFTCard ({ tokenAbi, tokenAddress, tokenID, lazyLoad = false}) {
  const NFT = useNFTWithMetadata(tokenAbi, tokenAddress, tokenID)

  const lore = NFT?.metadata?.attributes?.find(attr => attr.trait_type == 'Lore')?.value ?? 'Unrevealed'
  const image = NFT?.metadata?.image ?? placeholder

  return (
    <Card elevation={2}>
      <CardContent>
        <Box bgcolor={darken(theme.palette.tertiary.main, 0.06)}
             minHeight="320px"
             borderRadius={theme.shape.borderRadius + 'px'}
        >
          <picture>
            <source srcSet={image}/>
            <img style={{ maxWidth: '100%' }}
                 src={image}
                 alt={'CHEF #' + tokenID + ' image'}
                 {...(lazyLoad && { loading: "lazy" })}
            />
          </picture>
        </Box>
        {/* todo: Retrieve base chef name from smart contract */}
        <Typography textAlign="center" variant="h5" mt={2}>
          {lore}
        </Typography>
        <Typography textAlign="center" variant="h6" color="primary">
          CHEF #{tokenID}
        </Typography>
      </CardContent>
    </Card>
  )
}

/**
 * @type {{tokenAddress: Validator<NonNullable<string>>, tokenID: Validator<NonNullable<number>>, tokenAbi: Validator<NonNullable<any[]>>, lazyLoad: Requireable<boolean>}}
 */
NFTCard.propTypes = {
  tokenAbi: PropTypes.array.isRequired,
  tokenAddress: PropTypes.string.isRequired,
  tokenID: PropTypes.number.isRequired,
  lazyLoad: PropTypes.bool
}

export default NFTCard