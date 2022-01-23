import React from "react";
import {
  Card,
  Divider,
  Stack,
  Grid,
  Button,
  Typography,
  Container,
  Box,
} from "@mui/material";
import ViewHeading from "../../components/layout/ViewHeading";
import CurrencyAromaCartoonIcon from "../../components/icons/CurrencyAromaCartoonIcon";
import BuffetWithSignsIcon from "../../components/icons/BuffetWithSignsIcon";
import MarketIcon from "../../components/icons/MarketIcon";
import MyChefsIcon from "../../components/icons/MyChefsIcon";
import KitchenIcon from "../../components/icons/KitchenIcon";

const Tutorial = () => {
  const steps = [
    {
      title: "Step 1",
      description: "Buy Aroma Coin and a CHEF from Market",
      icon: (
        <Box sx={{ marginY: 1 }}>
          <CurrencyAromaCartoonIcon
            sx={{ marginBottom: 2.5, marginRight: 1 }}
          />
          <MarketIcon sx={{ fontSize: 52, marginLeft: 1 }} />
          <MyChefsIcon
            sx={{
              fontSize: 35,
              marginBottom: 2,
              marginLeft: 1,
              transform: "rotate(30deg)",
            }}
          />
        </Box>
      ),
    },
    {
      title: "Step 2",
      description: `Wait for Reveal. CHEFS Bought will be added under "MyChefs"`,
      icon: <MyChefsIcon sx={{ fontSize: 60, marginY: 1 }} />,
    },
    {
      title: "Step 3",
      description: `Once CHEF is revealed, use it in "Kitchen" to Cook a recipe`,
      icon: (
        <Box sx={{ marginY: 1 }}>
          <CurrencyAromaCartoonIcon
            sx={{ marginBottom: 2.5, marginRight: 1 }}
          />
          <KitchenIcon sx={{ fontSize: 40, marginLeft: 1 }} />
          <MyChefsIcon
            sx={{
              fontSize: 35,
              marginBottom: 2,
              marginLeft: 1,
              transform: "rotate(30deg)",
            }}
          />
        </Box>
      ),
    },
    {
      title: "Step 4",
      description: `Your cooked recipe will be added to "Buffet" and see how it performs. You can collect reward from the Home itself`,
      icon: (
        <BuffetWithSignsIcon
          sx={{ fontSize: 140, marginTop: -4, marginBottom: -1 }}
        />
      ),
    },
  ];

  return (
    <Container maxWidth="sm">
      <ViewHeading title={"Tutorial"} />
      <Card sx={{ marginY: 5 }}>
        <Stack p={2} textAlign="center">
          <Typography variant="h4" color="secondary">
            How to Get Started
          </Typography>
          {steps.map((step) => (
            <>
              <Grid
                container
                item
                justifyContent="center"
                alignItems="center"
                p={2}
              >
                <Grid
                  item
                  xl={12}
                  md={12}
                  sm={12}
                  order={{ xl: 1, md: 1, sm: 1, xs: 1 }}
                >
                  <Typography
                    variant="h5"
                    color="text.primary"
                    textAlign="left"
                  >
                    {step.title}
                  </Typography>
                </Grid>
                <Grid
                  item
                  xl={7}
                  md={7}
                  sm={7}
                  order={{ xl: 2, md: 2, sm: 2, xs: 3 }}
                >
                  <Typography variant="h5" textAlign="justify">
                    {step.description}
                  </Typography>
                </Grid>
                <Grid
                  item
                  xl={5}
                  md={5}
                  sm={5}
                  xs={12}
                  order={{ xl: 3, md: 3, sm: 3, xs: 2 }}
                >
                  {step.icon}
                </Grid>
              </Grid>
              <Divider flexItem />
            </>
          ))}
          <Button
            variant="yellowContained"
            size="massive"
            href="/market"
            startIcon={<MarketIcon />}
            sx={{ marginTop: 2 }}
          >
            Go to Market
          </Button>
        </Stack>
      </Card>
    </Container>
  );
};
export default Tutorial;
