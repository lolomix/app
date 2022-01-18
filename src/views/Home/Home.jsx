import { withTranslation } from "react-i18next";
import { Button, Stack } from "@mui/material";
import RecipeOnPlateIcon from "../../components/icons/RecipeOnPlateIcon";
import WhiteFlameIcon from "../../assets/white-flame-icon.svg";
import SquareButton from "../../components/buttons/SquareButton";
import Market from "../../assets/market-icon.svg";
import MyChefs from "../../assets/my-chefs-icon.png";
import Kitchen from "../../assets/kitchen-icon.svg";
import Buffet from "../../assets/buffet-icon.svg";

function Home() {
  return (
    <Stack alignItems="center" spacing={3} mb="5vw">
      <RecipeOnPlateIcon sx={{ fontSize: 350 }} />
      <Button
        variant="yellowContained"
        href="/kitchen/recipe/create/"
        style={{
          width: "258px",
          height: "60px",
          fontSize: "21px",
        }}
      >
        <img
          src={WhiteFlameIcon}
          alt="WhiteFlameIcon"
          width="8%"
          height="auto"
          style={{ marginBottom: "5px", marginRight: "12px" }}
        ></img>
        Cook A Recipe
      </Button>
      <Button
        variant="yellowContained"
        style={{
          borderRadius: "25px",
          background: "#FFFFFF",
        }}
        href="/tutorial/"
      >
        Tutorial
      </Button>
      <Stack direction="row" justifyContent="space-between" width="95%"  spacing={2}>
        <Stack direction="row" spacing={2}>
          <SquareButton
            size={"large"}
            color={"light"}
            image={Market}
            title={"Market"}
            href="/market/"
          >
            Market
          </SquareButton>
          <SquareButton
            size={"medium"}
            color={"light"}
            image={MyChefs}
            title={"My Chefs"}
            href="/collection/"
          >
            My Chefs
          </SquareButton>
        </Stack>
        <Stack direction="row" spacing={2}>
          <SquareButton
            size={"medium"}
            color={"light"}
            image={Kitchen}
            title={"Kitchen"}
            href="/kitchen/"
          >
            Kitchen
          </SquareButton>
          <SquareButton
            size={"large"}
            color={"light"}
            image={Buffet}
            title={"Buffet"}
            href="/buffet/"
          >
            Buffet
          </SquareButton>
        </Stack>
      </Stack>
    </Stack>
  );
}

export default withTranslation()(Home);
