import React, { Component } from "react";
import logo from "./assets/logo.svg";

class AppLaunch extends Component {
  render() {
    return (
      <div style={{
        margin: 0,
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)"
      }}>
        <img src={logo} width={400} height={400} alt="CryptoChefs Logo" />
        <p style={{textAlign:"center"}}>Loading...</p>
      </div>
    );
  }
}

export default AppLaunch;
