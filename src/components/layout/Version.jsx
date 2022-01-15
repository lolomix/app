import * as React from "react";
// material-ui
import { Typography } from "@mui/material";
// custom
import { APP_VERSION } from "../../web3/constants";

/**
 * @returns {JSX.Element|null}
 * @constructor
 */
function Version() {
  return (
    <Typography
      marginLeft={1}
      marginTop="-1.6rem"
      color="tertiary.main"
      variant="body2"
    >
      {APP_VERSION}
    </Typography>
  );
}

export default Version;
