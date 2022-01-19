import { withTranslation } from "react-i18next";
import { Button, Stack } from "@mui/material";
import RecipeOnPlateIcon from "../../components/icons/RecipeOnPlateIcon";
import SquareButton from "../../components/buttons/SquareButton";
import Market from "../../assets/market-icon.svg";
import MyChefs from "../../assets/my-chefs-icon.png";
import Kitchen from "../../assets/kitchen-icon.svg";
import Buffet from "../../assets/buffet-icon.svg";
import WhiteFlameIcon from "../../components/icons/WhiteFlameIcon";

function Home() {
  return (
    <Stack alignItems="center" spacing={3} mb="5vw">
      <RecipeOnPlateIcon sx={{ fontSize: 350 }} />
      <Button
        elongatedWidth
        size="massive"
        variant="yellowContained"
        href="/kitchen/recipe/create/"
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
        href="/tutorial/"
      >
        Tutorial
      </Button>
      <Stack
        direction="row"
        justifyContent="space-between"
        width="90%"
        spacing={0.5}
      >
        <Stack direction="row" spacing={0.5}>
          <SquareButton
            size={"large"}
            color={"light"}
            image={Market}
            title={"Market"}
            href={"/market/"}
          >
            Market
          </SquareButton>
          <SquareButton
            size={"medium"}
            color={"light"}
            image={MyChefs}
            title={"My Chefs"}
            href={"/collection/"}
          >
            My Chefs
          </SquareButton>
        </Stack>
        <Stack direction="row" spacing={0.5}>
          <SquareButton
            size={"medium"}
            color={"light"}
            image={Kitchen}
            title={"Kitchen"}
            href={"/kitchen/"}
          >
            Kitchen
          </SquareButton>
          <SquareButton
            size={"large"}
            color={"light"}
            image={Buffet}
            title={"Buffet"}
            href={"/buffet/"}
          >
            Buffet
          </SquareButton>
        </Stack>
      </Stack>
    </Stack>
  );
}

export default withTranslation()(Home);
