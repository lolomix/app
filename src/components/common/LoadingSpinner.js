import React, { Component } from "react";
//material-ui
import Box from "@material-ui/core/Box";
import CircularProgress from '@material-ui/core/CircularProgress';

class LoadingSpinner extends Component {
  render() {
    return (
      <Box 
        my={6}
        textAlign="center"
        alignItems="center"
        justifyContent="center"
      >
        <CircularProgress color="primary" />
      </Box>
    );
  }
}

export default LoadingSpinner;
