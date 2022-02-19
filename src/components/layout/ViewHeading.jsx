import React from "react";
import { useNavigate } from "react-router-dom";
// material-ui
import styled from "@emotion/styled";
import { Typography, Box, ButtonUnstyled, Grid, Tooltip } from "@mui/material";
import backButton from "../../assets/back-button.svg";

export const StyledButton = styled(ButtonUnstyled)(({ type, theme }) => ({
  ...(type === "back" && {
    background: `transparent url(${backButton}) no-repeat center`,
    backgroundSize: "cover",
    [theme.breakpoints.down("md")]: {
      width: "40px",
      height: "42px",
      marginLeft: 0,
    },
  }),
  ...(type === "none" && {
    visibility: "hidden",
  }),
  textAlign: "center",
  border: "none",
  minWidth: "42px",
  width: "43px",
  height: "45px",
  borderRadius: "9px",
  cursor: "pointer",
  "&:hover": {
    transform: "scale(1.05)"
  },
}));

function ViewHeading({ buttonType, title, icon, subTitle }) {
  const navigate = useNavigate();

  if (buttonType === "none") return null;

  return (
    <Grid container justifyContent="center" zIndex="999" ml={0.5}>
      <Grid item sx={{position: "relative", left: "-44%", top: 20}}>
        <Tooltip title={buttonType === "home" ? "Home" : "Back"}>
          <StyledButton
            bg="yellowContained"
            type={buttonType}
            onClick={
              buttonType === "home" ? () => navigate("/") : () => navigate(-1)
            }
          ></StyledButton>
        </Tooltip>
      </Grid>
      <Grid
        container
        item
        xs={12}
        flexDirection="column"
        alignItems="center"
        mb={1}
      >
        <Grid container item justifyContent="center" px={5}>
          <Grid item pr={1}>
            {icon}
          </Grid>
          <Grid item textAlign="center">
            <Typography variant="h1">{title}</Typography>
          </Grid>
        </Grid>
        {subTitle && (
          <Box as="span" textAlign="center" color="text.secondary" mt={1}>
            <Typography variant="h5">{subTitle}</Typography>
          </Box>
        )}
      </Grid>
    </Grid>
  );
}

export default ViewHeading;
