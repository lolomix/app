import React from "react";
import {
  Card,
  Divider,
  Stack,
  Grid,
  Button,
  Typography,
  Container,
} from "@mui/material";
import ViewHeading from "../../components/layout/ViewHeading";
import CurrencyAromaCartoonIcon from "../../components/icons/CurrencyAromaCartoonIcon";
import BuffetWithSignsIcon from "../../components/icons/BuffetWithSignsIcon";

const Tutorial = () => {
  const steps = [
    {
      title: "Step 1",
      description: "Buy Aroma Coin and a CHEF from Market",
      icon: <BuffetWithSignsIcon sx={{ fontSize: "150px" }} />,
    },
    {
      title: "Step 2",
      description: `Wait for Reveal. CHEFS Bought will be added under "MyChefs"`,
      icon: <BuffetWithSignsIcon sx={{ fontSize: "150px" }} />,
    },
    {
      title: "Step 3",
      description: `Once CHEF is revealed, use it in "Kitchen" to Cook a recipe`,
      icon: <BuffetWithSignsIcon sx={{ fontSize: "150px" }} />,
    },
    {
      title: "Step 4",
      description: `Your cooked recipe will be added to "Buffet" and see how it performs. You can collect reward from the Home itself`,
      icon: <BuffetWithSignsIcon sx={{ fontSize: "150px" }} />,
    },
  ];

  return (
    <Container maxWidth="sm">
      <ViewHeading title={"Tutorial"} />
      <Card fullheight="true" sx={{ margin: 2 }}>
        <Stack
          spacing={1}
          sx={{
            padding: 2,
            textAlign: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h4" color="secondary.main" textAlign="center">
            How to Get Started
          </Typography>
          {steps.map((step) => (
            <>
              <Grid container item alignItems="center">
                <Grid
                  container
                  item
                  flexDirection="column"
                  alignItems="flex-start"
                  xl={8}
                  md={8}
                  sm={8}
                  xs={12}
                >
                  <Grid item>{step.title}</Grid>
                  <Grid item textAlign="left">
                    {step.description}
                  </Grid>
                </Grid>
                <Grid item xl={4} md={4} sm={4} xs={12}>
                  {step.icon}
                </Grid>
              </Grid>
              <Divider flexItem />
            </>
          ))}
          <Button variant="contained">Go to Market</Button>
        </Stack>
      </Card>
    </Container>
  );
};
export default Tutorial;
