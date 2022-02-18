import React from "react";
import { Grid, Card, Typography, Button, Stack } from "@mui/material";
import AromaCoinsIcon from "../../components/icons/AromaCoinsIcon";
//import CurrencyMaticIcon from "../../components/icons/CurrencyMaticIcon";
import CurrencyAromaCartoonIcon from "../../components/icons/CurrencyAromaCartoonIcon";
import AromaBagOfCoinsIcon from "../../components/icons/AromaBagOfCoinsIcon";
import AromaPotOfCoinsIcon from "../../components/icons/AromPotOfCoinsIcon";
import AromaCoinWithBackgroundIcon from "../../components/icons/AromaCoinWithBackgroundIcon";
import { formatCurrency } from "../../utils/formatters";
import Layout from "../../components/layout/Layout";
import { Link as RouterLink } from "react-router-dom";

const MarketAromaOffers = () => {
  const cardsContent = [
    {
      title: "Handful AROMA",
      amount: 1000,
      freeAmount: null,
      icon: <AromaCoinsIcon style={{ fontSize: "170px" }} />,
      price: "Coming Soon",
    },
    {
      title: "Pile of AROMA",
      amount: 3000,
      freeAmount: null,
      icon: <AromaBagOfCoinsIcon style={{ fontSize: "170px" }} />,
      price: "Coming Soon",
    },
    {
      title: "Sack of AROMA",
      amount: 10000,
      freeAmount: null,
      icon: <AromaPotOfCoinsIcon style={{ fontSize: "170px" }} />,
      price: "Coming Soon",
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
    <Layout helmetTitle="Aroma - Offers" title="Aroma" buttonType="back">
      <Grid
        container
        item
        xs={12}
        sm={11}
        gap={2}
        justifyContent="center"
        alignItems="stretch"
      >
        {cardsContent.map((card) => (
          <Grid item xs={12} sm={8} md={6} lg={3.8} columns={16} key={`card:${card.title}`}>
            <Card fullheight="true" sx={{ padding: 2 }}>
              <Stack
                sx={{
                  height: "100%",
                  backgroundColor: "rgba(255, 241, 243, 0.33)",
                  boxShadow: "inset 0px 1px 3px #FF000029",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderRadius: "inherit",
                  paddingX: 1,
                  paddingY: 2,
                  textAlign: "center",
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
                  fullWidth
                  size="massive"
                  bg="yellowContainedSmall"
                  sx={{ marginTop: 3 }}
                  to={card.price === null && "/market/aroma/buy"}
                  component={RouterLink}
                  /*startIcon={card.price && <CurrencyMaticIcon />}*/
                  disabled={card.price !== null}
                >
                  {card.price ? /*formatCurrency(*/ card.price : "Enter"}
                </Button>
              </Stack>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Layout>
  );
};
export default MarketAromaOffers;
