import React from "react";
import { Button, Stack } from "@mui/material";
import styled from "@emotion/styled";
import SquareButtonsBackground from "../../assets/square-buttons-background.svg";
import { Link as RouterLink } from "react-router-dom";

const StyledButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== "color" && prop !== "size",
})(({ color, size, theme }) => ({
  ...(size === "large" && {
    width: "150px",
    height: "135px",
    [theme.breakpoints.down("md")]: {
      width: "80px",
      height: "75px",
      fontSize: "10px",
    },
  }),
  ...(size === "medium" && {
    width: "110px",
    height: "100px",
    [theme.breakpoints.down("md")]: {
      width: "80px",
      height: "75px",
      fontSize: "10px",
    },
  }),
  ...(color === "light" && {
    background: `transparent url(${SquareButtonsBackground}) no-repeat center`,
    backgroundSize: "cover",
    color: theme.palette.common.black,
    border: `3px solid ${theme.palette.common.black}`,
    boxShadow: "none",
  }),
  ...(color === "dark" && {
    backgroundColor: "#00000080",
    color: theme.palette.common.white,
    border: "3px solid #0000002B",
    boxShadow: "inset 0px 3px 13px #FFFFFF3B",
    "&:hover": {
      backgroundColor:"#00000080 !important",
    },
  }),
  textAlign: "center",
  borderTop: "none",
  borderRadius: "20px",
}));

const SquareButton = (props) => {
  const { image, title } = props;

  return (
    <StyledButton
      variant="contained"
      to={props.href && props.href}
      component={RouterLink}
      color={props.color}
      size={props.size}
      onClick={props.onClick}
    >
      <Stack>
        {image}
        {title}
      </Stack>
    </StyledButton>
  );
};

export default SquareButton;
