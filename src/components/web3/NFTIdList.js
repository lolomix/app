import React from "react";
import PropTypes from 'prop-types'
// material-ui
import Skeleton from "@mui/material/Skeleton";
// custom
import { useTokensOfOwner } from '../../hooks/useTokensOfOwner'

/**
 * @param tokenAbi
 * @param tokenAddress
 * @returns {JSX.Element}
 * @constructor
 */
function NFTIdList ({ tokenAbi, tokenAddress }) {
  const nfts = useTokensOfOwner(tokenAbi, tokenAddress)

  return nfts ? (
    <div>
      <span>
        {nfts.map(id => "#"+id).join(', ')}
        {nfts.length === 0 && "None"}
      </span>
    </div>
    ) : (
      <Skeleton variant="text" />
    )
}

/**
 * @type {{tokenAddress: Validator<NonNullable<string>>, tokenAbi: Validator<NonNullable<any[]>>}}
 */
NFTIdList.propTypes = {
  tokenAbi: PropTypes.array.isRequired,
  tokenAddress: PropTypes.string.isRequired
}

export default NFTIdList;