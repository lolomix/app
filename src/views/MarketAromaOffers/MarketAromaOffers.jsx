import React from "react";
import { Grid, Card, Typography, Button, Stack } from "@mui/material";
import AromaCoinsIcon from "../../components/icons/AromaCoinsIcon";
import CurrencyMaticIcon from "../../components/icons/CurrencyMaticIcon";
import CurrencyAromaCartoonIcon from "../../components/icons/CurrencyAromaCartoonIcon";
import AromaBagOfCoinsIcon from "../../components/icons/AromaBagOfCoinsIcon";
import AromaPotOfCoinsIcon from "../../components/icons/AromPotOfCoinsIcon";
import AromaCoinWithBackgroundIcon from "../../components/icons/AromaCoinWithBackgroundIcon";
import { formatCurrency } from "../../utils/formatters";

const MarketAromaOffers = () => {
  const cardsContent = [
    {
      title: "Handful AROMA",
      amount: 1000,
      freeAmount: null,
      icon: <AromaCoinsIcon style={{ fontSize: "170px" }} />,
      price: 1000,
    },
    {
      title: "Pile of AROMA",
      amount: 3000,
      freeAmount: 500,
      icon: <AromaBagOfCoinsIcon style={{ fontSize: "170px" }} />,
      price: 3000,
    },
    {
      title: "Sack of AROMA",
      amount: 10000,
      freeAmount: 2000,
      icon: <AromaPotOfCoinsIcon style={{ fontSize: "170px" }} />,
      price: 6000,
    },
    {
      title: "Custom",
      amount: null,
      freeAmount: null,
      icon: (
        <AromaCoinWithBackgroundIcon
          style={{ fontSize: "230px", marginBottom: "20px" }}
        />
      ),
      price: null,
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
                  {card.amount && <CurrencyAromaCartoonIcon />}
                  <Typography variant="h3" fontWeight="bold" ml={1}>
                    {card.amount && formatCurrency(card.amount)}
                  </Typography>
                </Stack>
                <Typography variant="h6" component="span" color="tertiary.main">
                  {card.freeAmount &&
                    `+ ${formatCurrency(card.freeAmount)} Free`}
                </Typography>
                {card.icon}
                <Button
                  elongatedWidth
                  size="massive"
                  variant="yellowContained"
                  startIcon={card.price && <CurrencyMaticIcon />}
                >
                  {card.price ? (
                    formatCurrency(card.price)
                  ) : (
                    <Typography variant="h5">Enter</Typography>
                  )}
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
