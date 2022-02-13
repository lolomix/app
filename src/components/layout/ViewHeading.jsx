import React from "react";
import { useNavigate } from "react-router-dom";
// material-ui
import styled from "@emotion/styled";
import { Typography, Box, Button, Grid } from "@mui/material";
import homeButton from "../../assets/home-button.svg";
import backButton from "../../assets/back-button.svg";

const StyledButton = styled(Button)(({ type, theme }) => ({
  ...(type === "home" && {
    background: `transparent url(${homeButton}) no-repeat center`,
    backgroundSize: "cover",
    [theme.breakpoints.down("md")]: {
      width: "40px",
      height: "42px",
    },
  }),
  ...(type === "back" && {
    background: `transparent url(${backButton}) no-repeat center`,
    backgroundSize: "cover",
    [theme.breakpoints.down("md")]: {
      width: "40px",
      height: "42px",
      marginLeft: "5px",
    },
  }),
  ...(type === "none" && {
    visibility: "hidden",
  }),
  textAlign: "center",
  borderTop: "none",
  minWidth: "43px",
  width: "65px",
  height: "62px",
}));

function ViewHeading(props) {
  const navigate = useNavigate();

  return (
    <Grid container justifyContent="center" zIndex="999">
      <Grid item xs={0.5}>
        <StyledButton
          variant="yellowContained"
          type={props.buttonType}
          onClick={
            props.buttonType === "home"
              ? () => navigate("/")
              : () => navigate(-1)
          }
        ></StyledButton>
      </Grid>
      <Grid
        container
        item
        xs={11.5}
        flexDirection="column"
        alignItems="center"
        mb={1}
      >
        <Grid container item justifyContent="center">
          <Grid item pr={1}>
            {props.icon}
          </Grid>
          <Grid item xs={6} sm={4} md={3.2} lg={2.5} xl={2} textAlign="center">
            <Typography variant="h1">{props.title}</Typography>
          </Grid>
        </Grid>
        {props.subTitle && (
          <Box
            as="span"
            textAlign="center"
            maxWidth="394px"
            color="text.secondary"
            mt={1}
          >
            <Typography variant="h5">{props.subTitle}</Typography>
          </Box>
        )}
      </Grid>
    </Grid>
  );
}

export default ViewHeading;
