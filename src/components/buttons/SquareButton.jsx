import React, { useState, useEffect } from "react";
import { Button, Box, Typography, Grid } from "@mui/material";
import MarketIcon from "../icons/MarketIcon";

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );
  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return windowDimensions;
}

const SquareButton = (props) => {
  let { squareSize, padding } =
    props.size === "medium"
      ? { squareSize: "80%", padding: "35% 0px 35% 0px" }
      : { squareSize: "100%", padding: "45% 0px 45% 0px" };

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
    <Grid container item xs={12} md={12} xl={12} justifyContent="center">
      {useWindowDimensions().width > 700 ? (
        <Button
          variant="contained"
          sx={{
            width: squareSize,
            backgroundColor: squareColor,
            color: color,
            padding: padding,
            border: border,
            boxShadow: boxShadow,
            boxSizing: "border-box",
            borderTop: "none",
            textAlign: "center",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              bottom: "10%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <Box sx={{ width: "100%" }}>
              <img src={image} width="100%" height="auto" alt={image}></img>
            </Box>
            {title}
          </Box>
        </Button>
      ) : (
        <Button
          variant="contained"
          sx={{
            width: "83px",
            backgroundColor: squareColor,
            color: color,
            padding: padding,
            border: border,
            boxShadow: boxShadow,
            color: color,
            padding: "38px 0px 38px 0px",
            borderRadius: "20%",
            boxSizing: "border-box",
            borderTop: "none",
            textAlign: "center",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              bottom: "10%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "12px",
            }}
          >
            <Box sx={{ width: "100%" }}>
              <img
                src={image}
                width={props.size === "medium" ? "70%" : "50%"}
                height="auto"
                alt={image}
              ></img>
            </Box>
            {title}
          </Box>
        </Button>
      )}
    </Grid>
  );
};

export default SquareButton;
