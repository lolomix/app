import React from "react";
//material-ui
import CircularProgress from "@material-ui/core/CircularProgress";

export default function ToastLoadingIndeterminate() {
  return <CircularProgress variant="indeterminate" color="secondary" size={30} thickness={2} />;
}
