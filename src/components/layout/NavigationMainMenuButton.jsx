// material-ui
import { Tooltip, Grid, Link, Popover } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
// custom
import NavigationButton from "./NavigationButton";
import HomeIcon from "../icons/HomeIcon";
import MarketIcon from "../icons/MarketIcon";
import KitchenIcon from "../icons/KitchenIcon";
import MyChefsIcon from "../icons/MyChefsIcon";
import BuffetIcon from "../icons/BuffetIcon";
import { Link as RouterLink } from "react-router-dom";
import {
  usePopupState,
  bindTrigger,
  bindPopover,
} from "material-ui-popup-state/hooks";

function NavigationMainMenuButton() {
  const mainMenuPopoverState = usePopupState({
    variant: "popover",
    popupId: "mainMenuPopover",
  });

  const popoverOriginProps = {
    anchorOrigin: {
      vertical: "top",
      horizontal: "right",
    },
    transformOrigin: {
      vertical: "top",
      horizontal: "right",
    },
  };

  const views = [
    {
      title: "Home",
      ref: "/",
      icon: <HomeIcon sx={{ fontSize: "2.3rem" }} />,
    },
    {
      title: "Market",
      ref: "/market",
      icon: <MarketIcon sx={{ fontSize: "2.3rem" }} />,
    },
    {
      title: "My Chefs",
      ref: "/my-chefs",
      icon: <MyChefsIcon sx={{ fontSize: "2.3rem" }} />,
    },
    {
      title: "Kitchen",
      ref: "/kitchen",
      icon: <KitchenIcon sx={{ fontSize: "2.3rem" }} />,
    },
    {
      title: "Buffet",
      ref: "/buffet",
      icon: <BuffetIcon sx={{ fontSize: "2.3rem" }} />,
    },
  ];

  return (
    <>
      <Tooltip disableFocusListener title="Menu" aria-label="Menu">
        <NavigationButton
          icon={<MenuIcon />}
          variant="contained"
          {...bindTrigger(mainMenuPopoverState)}
        />
      </Tooltip>
      <Popover
        {...popoverOriginProps}
        {...bindPopover(mainMenuPopoverState)}
        closePopover={mainMenuPopoverState.close}
        PaperProps={{
          sx: {
            backgroundColor: "common.black",
            width: "fit-content",
          },
        }}
      >
        <Grid container pl={3} pb={3}>
          <Grid item xs={12} textAlign="right">
            <NavigationButton
              icon={<MenuIcon />}
              variant="contained"
              onClick={mainMenuPopoverState.close}
            />
          </Grid>
          <Grid container item xs={12} flexDirection="column" rowSpacing={3}>
            {views.map((item) => (
              <Grid
                container
                item
                alignItems="center"
                columnSpacing={2}
                key={item.title}
              >
                <Grid item>{item.icon}</Grid>
                <Grid item>
                  <Link
                    variant="h2"
                    underline="hover"
                    to={item.ref}
                    component={RouterLink}
                    color="common.white"
                    fontWeight={400}
                    fontSize={26}
                  >
                    {item.title}
                  </Link>
                </Grid>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Popover>
    </>
  );
}

export default NavigationMainMenuButton;
