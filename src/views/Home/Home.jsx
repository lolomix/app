import { withTranslation } from "react-i18next";
import { Button, Grid } from "@mui/material";
import RecipeOnPlateIcon from "../../components/icons/RecipeOnPlateIcon";
import SquareButton from "../../components/buttons/SquareButton";
import WhiteFlameIcon from "../../components/icons/WhiteFlameIcon";
import MarketIcon from "../../components/icons/MarketIcon";
import KitchenIcon from "../../components/icons/KitchenIcon";
import BuffetIcon from "../../components/icons/BuffetIcon";
import MyChefsIcon from "../../components/icons/MyChefsIcon";
import Layout from "../../components/layout/Layout";

function Home() {
  return (
    <Layout helmetTitle="Home">
      <RecipeOnPlateIcon sx={{ fontSize: 290 }} />
      <Button
        elongatedWidth
        size="massive"
        variant="yellowContainedSmall"
        href="/kitchen/recipe/create"
        startIcon={<WhiteFlameIcon />}
      >
        Cook A Recipe
      </Button>
      <Button
        elongatedWidth
        variant="contained"
        shape="roundish"
        sx={{
          backgroundColor: "common.white",
        }}
        href="/tutorial"
      >
        Tutorial
      </Button>
      <Grid container xs={12} justifyContent="center" columnSpacing={0.5}>
        <Grid
          container
          item
          xs={6}
          textAlign="left"
          alignItems="flex-end"
          spacing={1}
        >
          <Grid item>
            <SquareButton
              size="large"
              color="light"
              image={<MarketIcon sx={{ fontSize: "550%" }} />}
              title="Market"
              href="/market"
            >
              Market
            </SquareButton>
          </Grid>
          <Grid item>
            <SquareButton
              size="medium"
              color="light"
              image={<MyChefsIcon sx={{ fontSize: "55px" }} />}
              title="My Chefs"
              href="/my-chefs"
            >
              My Chefs
            </SquareButton>
          </Grid>
        </Grid>
        <Grid
          container
          item
          xs={6}
          textAlign="right"
          justifyContent="flex-end"
          alignItems="flex-end"
          spacing={1}
        >
          <Grid item>
            <SquareButton
              size="medium"
              color="light"
              image={<KitchenIcon sx={{ fontSize: "50px" }} />}
              title="Kitchen"
              href="/kitchen"
            >
              Kitchen
            </SquareButton>
          </Grid>
          <Grid item>
            <SquareButton
              size="large"
              color="light"
              image={<BuffetIcon sx={{ fontSize: "550%" }} />}
              title="Buffet"
              href="/buffet"
            >
              Buffet
            </SquareButton>
          </Grid>
        </Grid>
      </Grid>
    </Layout>
  );
}

export default withTranslation()(Home);
