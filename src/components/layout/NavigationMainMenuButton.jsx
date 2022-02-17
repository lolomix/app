import { useState } from "react";
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

function NavigationMainMenuButton() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  /*const externalLinks = [
    {
      title: "OpenSea",
      ref: "https://opensea.io/collection/cryptochefs-io",
    },
    {
      title: "Twitter",
      ref: "https://twitter.com/cryptochefs_io/",
    },
    {
      title: "Instagram",
      ref: "https://www.instagram.com/cryptochefs.io/",
    },
    {
      title: "Medium",
      ref: "https://cryptochefs.medium.com/",
    },
    {
      title: "Discord",
      ref: "https://discord.com/invite/JufpFYBdKG/",
    },
  ];*/

  const views = [
    {
      title: "Home",
      ref: "/",
      icon: <HomeIcon sx={{ fontSize: "3.8rem" }} />,
    },
    {
      title: "Market",
      ref: "/market",
      icon: <MarketIcon sx={{ fontSize: "3.8rem" }} />,
    },
    {
      title: "My Chefs",
      ref: "/my-chefs",
      icon: <MyChefsIcon sx={{ fontSize: "4rem" }} />,
    },
    {
      title: "Kitchen",
      ref: "/kitchen",
      icon: <KitchenIcon sx={{ fontSize: "3.8rem" }} />,
    },
    {
      title: "Buffet",
      ref: "/buffet",
      icon: <BuffetIcon sx={{ fontSize: "3.8rem" }} />,
    },
  ];

  return (
    <>
      <Tooltip disableFocusListener title="Menu" aria-label="Menu">
        <NavigationButton
          icon={<MenuIcon />}
          variant="contained"
          onClick={handleClick}
        />
      </Tooltip>
      <Popover
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        onClose={handleClose}
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
              onClick={handleClose}
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
                    fontWeight={500}
                  >
                    {item.title}
                  </Link>
                </Grid>
              </Grid>
            ))}
          </Grid>
          {/*<Grid
              container
              item
              mt={10}
              xs={12}
              md={6}
              flexDirection="column"
              rowSpacing={4}
            >
              {externalLinks.map((item) => (
                <Grid
                  item
                  textAlign={["left", "left", "right"]}
                  key={item.title}
                >
                  <Link
                    variant="h4"
                    underline="hover"
                    href={item.ref}
                    target="_blank"
                    rel="nofollow noindex"
                    color="grey.500"
                  >
                    {item.title}
                  </Link>
                </Grid>
              ))}
              </Grid>*/}
        </Grid>
      </Popover>
    </>
  );
}

export default NavigationMainMenuButton;
