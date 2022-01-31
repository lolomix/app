import React from "react";
// material-ui
import { Typography, Stack, Box } from "@mui/material";

function ViewHeading(props) {
  return (
    <Stack alignItems="center" mb={2}>
      <Stack direction="row" spacing={2}>
        {props.icon}
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
