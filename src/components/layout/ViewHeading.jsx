import React from "react";
// material-ui
import { Typography, Stack, Box } from "@mui/material";

function ViewHeading(props) {
  return (
    <Stack alignItems="center" mb={1}>
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
          mt={1}
        >
         <Typography variant="h5">{props.subTitle}</Typography> 
        </Box>
      )}
    </Stack>
  );
}

export default ViewHeading;
