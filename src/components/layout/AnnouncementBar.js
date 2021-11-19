import * as React from 'react';
// material-ui
import { Alert } from '@mui/material'
import { TARGET_CHAIN, NETWORKS} from "../../web3/constants";

/**
 * @returns {JSX.Element|null}
 * @constructor
 *
 * @todo refactor this to be more sophisticated and remove constant dependency
 */
function AnnouncementBar() {
  const testnet = NETWORKS[TARGET_CHAIN].testnet === true

  // only show warning on testnet
  if (testnet) {
    return (
      <Alert variant="filled" severity="error" sx={{ borderRadius: 0, justifyContent: 'center' }}>
        TESTNET ALERT - Connected to {NETWORKS[TARGET_CHAIN].name}
      </Alert>
    );
  }

  return null
}

export default AnnouncementBar