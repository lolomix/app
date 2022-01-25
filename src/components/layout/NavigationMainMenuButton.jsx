import { useState } from "react";
// material-ui
import { Dialog, Tooltip, Typography, Grid, Link } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
// custom
import NavigationButton from "./NavigationButton";
import HomeIcon from "../icons/HomeIcon";
import MarketIcon from "../icons/MarketIcon";
import KitchenIcon from "../icons/KitchenIcon";
import MyChefsIcon from "../icons/MyChefsIcon";
import BuffetIcon from "../icons/BuffetIcon";

function NavigationMainMenuButton() {
  const [open, setOpen] = useState(false);

  const externalLinks = [
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
  ];

  const views = [
    {
      title: "Home",
      ref: "/",
      icon: <HomeIcon sx={{ fontSize: "2.5rem" }} />,
    },
    {
      title: "Market",
      ref: "/market",
      icon: <MarketIcon sx={{ fontSize: "2.5rem" }} />,
    },
    {
      title: "My Chefs",
      ref: "/collection",
      icon: <MyChefsIcon sx={{ fontSize: "2.5rem" }} />,
    },
    {
      title: "Kitchen",
      ref: "/kitchen",
      icon: <KitchenIcon sx={{ fontSize: "2.5rem" }} />,
    },
    {
      title: "Buffet",
      ref: "/buffet",
      icon: <BuffetIcon sx={{ fontSize: "2.5rem" }} />,
    },
  ];

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Tooltip disableFocusListener title="Menu" aria-label="Menu">
        <NavigationButton icon={<MenuIcon />} onClick={handleClickOpen} />
      </Tooltip>
      <Dialog fullScreen open={open}>
        <Grid
          container
          height="100%"
          justifyContent="center"
          p={1.2}
          sx={{ backgroundColor: "common.black" }}
        >
          <Grid item xs={12} maxWidth="xl" textAlign="right" px={6}>
            <NavigationButton icon={<MenuIcon />} onClick={handleClose} />
          </Grid>
          <Grid container item height="90%" maxWidth="xl">
            <Grid container item xs={12} md={6} flexDirection="column" px={3}>
              {views.map((item) => (
                <Grid
                  container
                  item
                  alignItems="center"
                  spacing={2}
                  px={3}
                  py={2}
                >
                  <Grid item> {item.icon}</Grid>
                  <Grid item>
                    <Link
                      underline="hover"
                      href={item.ref}
                      color="common.white"
                    >
                      <Typography variant="h3">{item.title}</Typography>
                    </Link>
                  </Grid>
                </Grid>
              ))}
            </Grid>
            <Grid
              container
              item
              flexDirection="column"
              textAlign={["left", "left", "right"]}
              xs={12}
              md={6}
              px={3}
            >
              {externalLinks.map((item) => (
                <Grid item px={3} py={1.5}>
                  <Link
                    underline="hover"
                    target="_blank"
                    href={item.ref}
                    color="grey.500"
                    variant="h4"
                  >
                    {item.title}
                  </Link>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Dialog>
    </>
  );
}

export default NavigationMainMenuButton;
