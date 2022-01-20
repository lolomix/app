import React from "react";
// material-ui
import { Typography, Stack, Box } from "@mui/material";

function ViewHeading(props) {
  return (
    <Stack alignItems="center" mt={6}>
      <Stack direction="row" spacing={2}>
        {props.icon && (
          <img
            src={props.icon}
            alt={props.icon}
            width="55px"
            height="55px"
          ></img>
        )}
        <Typography variant="h1">{props.title}</Typography>
      </Stack>
      {props.subTitle && (
        <Box
          as="span"
          textAlign="center"
          maxWidth="394px"
          color="text.secondary"
        >
          {props.subTitle}
        </Box>
      )}
    </Stack>
  );
}

export default ViewHeading;
