import React from "react";
import { Grid, Card, Typography, Button, Box, Stack } from "@mui/material";
import AromaCoinsIcon from "../../components/icons/AromaCoinsIcon";
import CurrencyMaticIcon from "../../components/icons/CurrencyMaticIcon";
import CurrencyAromaCartoonIcon from "../../components/icons/CurrencyAromaCartoonIcon";
import AromaBagOfCoinsIcon from "../../components/icons/AromaBagOfCoinsIcon";
import AromaPotOfCoinsIcon from "../../components/icons/AromPotOfCoinsIcon";
import AromaCoinWithBackgroundIcon from "../../components/icons/AromaCoinWithBackgroundIcon";

const MarketAromaOffers = () => {
  const cardsContent = [
    {
      title: "Handful AROMA",
      amount: "1'000",
      freeAmount: "",
      icon: <AromaCoinsIcon style={{ fontSize: "170px" }} />,
      matic: true,
      price: "1000",
    },
    {
      title: "Pile of AROMA",
      amount: "3'000",
      freeAmount: "+500 Free",
      icon: <AromaBagOfCoinsIcon style={{ fontSize: "170px" }} />,
      matic: true,
      price: "3000",
    },
    {
      title: "Sack of AROMA",
      amount: "10'000",
      freeAmount: "+2'000 Free",
      icon: <AromaPotOfCoinsIcon style={{ fontSize: "170px" }} />,
      matic: true,
      price: "6000",
    },
    {
      title: "Custom",
      amount: "",
      icon: (
        <AromaCoinWithBackgroundIcon
          style={{ fontSize: "230px", marginBottom: "20px" }}
        />
      ),
      matic: false,
      price: "Enter",
    },
  ];
  return (
    <Grid container justifyContent="center">
      <Typography variant="h1">AROMA</Typography>
      <Grid container item mt={6} justifyContent="center">
        {cardsContent.map((card) => (
          <Grid item m={1.3}>
            <Card sx={{ width: "300px", height: "400px", padding: "15px" }}>
              <Card
                sx={{
                  backgroundColor: "rgba(255, 241, 243, 0.33)",
                  height: "100%",
                  width: "100%",
                  boxShadow: "inset 0px 1px 3px #FF000029",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "15px",
                }}
              >
                <Typography variant="h4" color="secondary.main">
                  {card.title}
                </Typography>
                <Stack direction="row" alignItems="center">
                  {card.matic && <CurrencyAromaCartoonIcon />}
                  <Typography variant="h3" fontWeight="bold" ml={1}>
                    {card.amount}
                  </Typography>
                </Stack>
                <Box as="span">{card.freeAmount}</Box>
                {card.icon}
                <Button
                  elongatedWidth
                  size="massive"
                  variant="yellowContained"
                  startIcon={card.matic && <CurrencyMaticIcon />}
                >
                  {card.price}
                </Button>
              </Card>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};
export default MarketAromaOffers;
