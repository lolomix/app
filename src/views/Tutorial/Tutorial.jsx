import React from "react";
import {
  Card,
  Divider,
  Stack,
  Grid,
  Button,
  Typography,
  Box,
} from "@mui/material";
import CurrencyAromaCartoonIcon from "../../components/icons/CurrencyAromaCartoonIcon";
import BuffetWithSignsIcon from "../../components/icons/BuffetWithSignsIcon";
import MarketIcon from "../../components/icons/MarketIcon";
import MyChefsIcon from "../../components/icons/MyChefsIcon";
import KitchenIcon from "../../components/icons/KitchenIcon";
import Layout from "../../components/layout/Layout";
import { CustomContainer } from "../Buffet/Buffet";
import { Link as RouterLink } from "react-router-dom";

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
    <Layout helmetTitle="Tutorial" title="Tutorial" buttonType="back">
      <Box>
        <CustomContainer
          mb={{ xs: 0, md: -18 }}
          right={{ sm: "15vw", lg: 180 }}
        >
          <Button
            bg="yellowContained"
            href="https://discord.com/invite/JufpFYBdKG/"
            target="_blank"
            rel="nofollow noindex"
            size="large"
          >
            Join Discord
          </Button>
          <Button
            bg="yellowContained"
            href="https://cryptochefs.io/static/media/White_Pepper.69eb102b.pdf"
            target="_blank"
            rel="nofollow noindex"
            size="large"
          >
            White Pepper
          </Button>
        </CustomContainer>
        <Card sx={{ marginY: 5, maxWidth: "sm" }}>
          <Stack p={2} textAlign="center">
            <Typography variant="h4" color="secondary">
              How to Get Started
            </Typography>
            {steps.map((step) => (
              <Box key={`step:${step.title}`}>
                <Grid
                  container
                  justifyContent="center"
                  alignItems="center"
                  p={2}
                >
                  <Grid item sm={12} order={{ xs: 1 }}>
                    <Typography
                      variant="h5"
                      color="text.primary"
                      textAlign="left"
                    >
                      {step.title}
                    </Typography>
                  </Grid>
                  <Grid item sm={7} order={{ sm: 2, xs: 3 }}>
                    <Typography variant="h5" textAlign="justify">
                      {step.description}
                    </Typography>
                  </Grid>
                  <Grid item sm={5} xs={12} order={{ sm: 3, xs: 2 }}>
                    {step.icon}
                  </Grid>
                </Grid>
                <Divider flexItem />
              </Box>
            ))}
            <Button
              bg="yellowContained"
              size="massive"
              to="/market"
              component={RouterLink}
              startIcon={<MarketIcon />}
              sx={{ marginTop: 2 }}
            >
              Go to Market
            </Button>
          </Stack>
        </Card>
      </Box>
    </Layout>
  );
};
export default Tutorial;
