import React, { Component } from "react";
import QrReader from "react-qr-reader";

class QrCamera extends Component {
  handleScan = (data) => {
    if (data) {
      this.props.qrStoreResult(data);
    }
  };
  handleError = (err) => {
    console.error(err);
  };

  render() {
    return <QrReader delay={300} onError={this.handleError} onScan={this.handleScan} style={{ width: "100%" }} />;
  }
}

export default QrCamera;
