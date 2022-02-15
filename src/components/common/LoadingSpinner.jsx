import { Component } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { Stack } from "@mui/material";

class LoadingSpinner extends Component {
  render() {
    return (
      <Stack height="100vh" alignItems="center" justifyContent="center">
        <CircularProgress disableShrink thickness="5" />
      </Stack>
    );
  }
}

export default LoadingSpinner;
