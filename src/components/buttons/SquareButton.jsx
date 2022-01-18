import React, { useState, useEffect } from "react";
import { Button, Box } from "@mui/material";
import MarketIcon from "../icons/MarketIcon";

//function getWindowDimensions() {
//  const { innerWidth: width, innerHeight: height } = window;
//  return {
//    width,
//    height,
//  };
//}
//
//function useWindowDimensions() {
//  const [windowDimensions, setWindowDimensions] = useState(
//    getWindowDimensions()
//  );
//  useEffect(() => {
//    function handleResize() {
//      setWindowDimensions(getWindowDimensions());
//    }
//    window.addEventListener("resize", handleResize);
//    return () => window.removeEventListener("resize", handleResize);
//  }, []);
//  return windowDimensions;
//}

const SquareButton = (props) => {
  let widthSize = props.size === "medium" ? "70%" : "100%";
 
  let { squareColor, color, border, boxShadow } =
    props.color === "dark"
      ? {
          squareColor: "#00000080",
          color: "white",
          border: "3px solid #0000002B",
          boxShadow: "inset 0px 3px 13px #FFFFFF3B",
        }
      : {
          squareColor: "white",
          color: "black",
          border: "3px solid black",
          boxShadow: "none",
        };
  let image = props.image ? props.image : null;
  let title = props.title ? props.title : null;

  return (
    <Button
      variant="contained"
      href={props.href}
      sx={{
        width: widthSize,
        backgroundColor: squareColor,
        color: color,
        border: border,
        boxShadow: boxShadow,
        boxSizing: "border-box",
        borderTop: "none",
        textAlign: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img
          src={image}
          width="100%"
          height="auto"
          alt={image}
        ></img>
        {title}
      </Box>
    </Button>
  );
};

export default SquareButton;
