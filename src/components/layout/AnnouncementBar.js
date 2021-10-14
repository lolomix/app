import * as React from 'react';
// material-ui
import { Alert } from '@mui/material'
import { TARGET_CHAIN } from "../../web3/constants";

/**
 * @returns {JSX.Element|null}
 * @constructor
 *
 * @todo refactor this to be more sophisticated and remove constant dependency
 */
function AnnouncementBar() {
  const production = TARGET_CHAIN === 'matic'

  // early return if this is production
  if (production) return null

  return (
    <Alert variant="filled" severity="error" sx={{ borderRadius: 0, justifyContent: 'center' }}>
      THIS IS A TEST ENVIRONMENT
    </Alert>
  );
}

export default AnnouncementBar