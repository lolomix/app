import React, { Component } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
//import AlertTitle from '@material-ui/lab/Alert';
import Typography from "@material-ui/core/Typography";

export default class CustomSnackbar extends Component {
  render() {
    return (
      <Snackbar anchorOrigin={{ vertical: "top", horizontal: "center" }} autoHideDuration={5000} open={this.props.open} onClose={this.props.handleClose}>
        <Alert variant="filled" onClose={this.props.handleClose} severity={this.props.severity ? this.props.severity : "info"}>
          {this.props.title && <Typography variant="body1">{this.props.title}</Typography>}
          {this.props.message ? this.props.message.toString() : <></>}
        </Alert>
      </Snackbar>
    );
  }
}
