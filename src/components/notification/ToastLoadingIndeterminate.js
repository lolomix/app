import React from "react";
//material-ui
import CircularProgress from "@mui/material/CircularProgress";

export default function ToastLoadingIndeterminate() {
  return <CircularProgress variant="indeterminate" size={30} thickness={2} />;
}
