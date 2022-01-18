import { withTranslation } from "react-i18next";
import { Grid, Button } from "@mui/material";
import RecipeOnPlateIcon from "../../components/icons/RecipeOnPlaceIcon";
import WhiteFlameIcon from "../../assets/white-flame-icon.svg";
import { Link } from "react-router-dom";
import SquareButton from "../../components/buttons/SquareButton";
import Market from "../../assets/market-icon.svg";
import MyChefs from "../../assets/my-chefs-icon.png";
import Kitchen from "../../assets/kitchen-icon.svg";
import Buffet from "../../assets/buffet-icon.svg";

function Home() {
  return (
    <Grid container justifyContent="center" alignItems="center">
      <Grid
        container
        item
        xs={12}
        md={12}
        xl={12}
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Grid item>
          <RecipeOnPlateIcon sx={{ fontSize: 350 }} />
        </Grid>
        <Grid item>
          <Button
            variant="yellowContained"
            style={{
              width: "258px",
              height: "60px",
              fontSize: "21px",
            }}
            component={Link}
            to="/kitchen/recipe/create/"
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "space-evenly",
                alignItems: "center",
              }}
            >
              <img
                src={WhiteFlameIcon}
                alt="WhiteFlameIcon"
                width="8%"
                height="auto"
                style={{ marginBottom: "4px" }}
              ></img>
              <h4>Cook A Recipe</h4>
            </div>
          </Button>
        </Grid>
        <Grid item mt="1%">
          <Button
            variant="yellowContained"
            style={{
              width: "128px",
              height: "32px",
              borderRadius: "25px",
              background: "#FFFFFF",
              fontSize: "16px",
              fontFamily: "Rubik",
              fontWeight: "bold",
            }}
            component={Link}
            to="/tutorial/"
          >
            <h4>Tutorial</h4>
          </Button>
        </Grid>
      </Grid>
      <Grid
        container
        item
        xs={12}
        md={12}
        xl={12}
        mt="100px"
        mr="5vw"
        ml="5vw"
        justifyContent="space-between"
        alignItems="flex-end"
      >
        <Grid container item xs={6} md={6} xl={6} alignItems="flex-end">
          <Grid container item xs={6} md={3} xl={3}>
            <SquareButton
              size={"large"}
              color={"light"}
              image={Market}
              title={"Market"}
              component={Link}
              to="/market/"
            >
              Market
            </SquareButton>
          </Grid>
          <Grid container item xs={6} md={3} xl={3}>
            <SquareButton
              size={"medium"}
              color={"light"}
              image={MyChefs}
              title={"My Chefs"}
              component={Link}
              to="/collection/"
            >
              My Chefs
            </SquareButton>
          </Grid>
        </Grid>
        <Grid
          container
          item
          xs={6}
          md={6}
          xl={6}
          justifyContent="flex-end"
          alignItems="flex-end"
        >
          <Grid container item xs={6} md={3} xl={3}>
            <SquareButton
              size={"medium"}
              color={"light"}
              image={Kitchen}
              title={"Kitchen"}
              component={Link}
              to="/kitchen/"
            >
              Kitchen
            </SquareButton>
          </Grid>
          <Grid container item xs={6} md={3} xl={3}>
            <SquareButton
              size={"large"}
              color={"light"}
              image={Buffet}
              title={"Buffet"}
              component={Link}
              to="/buffet/"
            >
              Buffet
            </SquareButton>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default withTranslation()(Home);
