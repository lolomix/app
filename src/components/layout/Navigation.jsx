import { withTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
// material-ui
import { Toolbar, AppBar, Grid, Tooltip } from "@mui/material";
// import NotificationsIcon from "@mui/icons-material/Notifications";
// custom
import NavigationWalletButton from "./NavigationWalletButton";
import LanguageSelector from "./LanguageSelector";
// import NavigationButton from "./NavigationButton";
import NavigationMenuButton from "./NavigationMainMenuButton";
import NavigationAromaBalance from "./NavigationAromaBalance";
import { StyledButton } from "./ViewHeading";
/**
 * @param t
 * @returns {JSX.Element}
 * @constructor
 */
function Navigation({ t }) {
  /**
   * @type {*[]}
   *
   * @todo create a hook that gathers all related notifications
   */
  // const notifications = [];

  const navigate = useNavigate();

  return (
    <AppBar elevation={0} position="static">
      <Toolbar disableGutters sx={{ marginX: 1.5, marginTop: 1 }}>
        <Grid container justifyContent="space-between" alignItems="flex-start">
          <Grid
            item
            container
            xs={5}
            md={4}
            justifyContent="left"
            alignItems="center"
          >
            <NavigationAromaBalance />
          </Grid>
          <Grid
            item
            container
            xs={7}
            md={8}
            justifyContent="right"
            alignItems="center"
          >
            <Grid
              container
              item
              spacing={1}
              justifyContent="flex-end"
              mt={-0.5}
            >
              {/*notifications.length > 0 && (
                  <NavigationButton icon={<NotificationsIcon />} />
                )*/}
              <Grid item>
                <Tooltip title="Home">
                  <StyledButton
                    bg="yellowContained"
                    type="home"
                    onClick={() => navigate("/")}
                  ></StyledButton>
                </Tooltip>
              </Grid>
              <Grid item>
                <NavigationWalletButton />
              </Grid>
              <Grid item>
                <NavigationMenuButton />
              </Grid>
            </Grid>
           <Grid item>
               {/*@todo: remove this but keep the language selected*/}
                <LanguageSelector />
            </Grid>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

export default withTranslation()(Navigation);
