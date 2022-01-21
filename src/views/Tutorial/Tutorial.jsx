import React from "react";
import ViewHeading from "../../components/layout/ViewHeading";
import CurrencyAromaCartoonIcon from "../../components/icons/CurrencyAromaCartoonIcon";
import { Card, Divider, Stack, Grid, Button } from "@mui/material";

const Tutorial = () => {
  const steps = [
    {
      title: "Step 1",
      description: "Buy Aroma Coin and a CHEF from Market",
      icon: <CurrencyAromaCartoonIcon />,
    },
    {
      title: "Step 2",
      description: "Buy Aroma Coin and a CHEF from Market",
      icon: <CurrencyAromaCartoonIcon />,
    },
    {
      title: "Step 3",
      description: "Buy Aroma Coin and a CHEF from Market",
      icon: <CurrencyAromaCartoonIcon />,
    },
    {
      title: "Step 4",
      description: "Buy Aroma Coin and a CHEF from Market",
      icon: <CurrencyAromaCartoonIcon />,
    },
  ];

  return (
    <Stack sx={{ alignItems: "center" }}>
      <ViewHeading title={"Tutorial"} />
      <Card fullheight="true">
        <Stack
          sx={{
            padding: 2,
          }}
        >
          {steps.map((step) => (
            <>
              <Grid container xl={12}>
                <Grid container item flexDirection="column" xl={8}>
                  <Grid item>{step.title} </Grid>
                  <Grid item>{step.description}</Grid>
                </Grid>
                <Grid item xl={4} textAlign="center">
                  {step.icon}
                </Grid>
              </Grid>
              <Divider flexItem />
            </>
          ))}
          <Button variant="contained">Go to Market</Button>
        </Stack>
      </Card>
    </Stack>
  );
};
export default Tutorial;
