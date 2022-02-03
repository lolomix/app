import React from "react";
import { Button, Stack } from "@mui/material";
import styled from "@emotion/styled";

const StyledButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== "color" && prop !== "size",
})(({ color, size, theme }) => ({
  ...(size === "large" && {
    width: "150px",
    height: "140px",
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
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
    border: `3px solid ${theme.palette.common.black}`,
    boxShadow: "none",
  }),
  ...(color === "dark" && {
    backgroundColor: "#00000080",
    color: theme.palette.common.white,
    border: "3px solid #0000002B",
    boxShadow: "inset 0px 3px 13px #FFFFFF3B",
  }),
  textAlign: "center",
  borderTop: "none",
}));

const SquareButton = (props) => {
  const { image, title } = props;

  return (
    <StyledButton
      variant="contained"
      href={props.href}
      color={props.color}
      size={props.size}
    >
      <Stack>
        {image}
        {title}
      </Stack>
    </StyledButton>
  );
};

export default SquareButton;
