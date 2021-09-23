import React, { Component } from "react";
//material-ui
import Box from "@mui/material/Box";
import CircularProgress from '@mui/material/CircularProgress';

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
