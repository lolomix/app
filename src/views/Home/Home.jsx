import { withTranslation } from "react-i18next";
import { Button, Stack } from "@mui/material";
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
        variant="yellowContained"
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
      <Stack
        direction="row"
        justifyContent="space-between"
        minWidth="100%"
        spacing={0.5}
      >
        <Stack direction="row" spacing={0.5} alignItems="flex-end">
          <SquareButton
            size={"large"}
            color={"light"}
            image={<MarketIcon sx={{ fontSize: "550%" }} />}
            title={"Market"}
            href={"/market"}
          >
            Market
          </SquareButton>
          <SquareButton
            size={"medium"}
            color={"light"}
            image={<MyChefsIcon sx={{ fontSize: "55px" }} />}
            title={"My Chefs"}
            href={"/my-chefs"}
          >
            My Chefs
          </SquareButton>
        </Stack>
        <Stack direction="row" spacing={0.5} alignItems="flex-end">
          <SquareButton
            size={"medium"}
            color={"light"}
            image={<KitchenIcon sx={{ fontSize: "50px" }} />}
            title={"Kitchen"}
            href={"/kitchen"}
          >
            Kitchen
          </SquareButton>
          <SquareButton
            size={"large"}
            color={"light"}
            image={<BuffetIcon sx={{ fontSize: "550%" }} />}
            title={"Buffet"}
            href={"/buffet"}
          >
            Buffet
          </SquareButton>
        </Stack>
      </Stack>
    </Layout>
  );
}

export default withTranslation()(Home);
