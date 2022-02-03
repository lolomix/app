import { useState } from "react";
// material-ui
import { Dialog, Tooltip, Grid, Link, DialogContent } from "@mui/material";
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
      <Dialog
        fullScreen
        open={open}
        PaperProps={{
          sx: {
            backgroundColor: "common.black",
          },
        }}
      >
        <DialogContent
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
          }}
        >
          <Grid container maxWidth="xl">
            <Grid item xs={12} textAlign="right">
              <NavigationButton icon={<MenuIcon />} onClick={handleClose} />
            </Grid>
            <Grid
              container
              item
              mt={8}
              xs={12}
              md={6}
              flexDirection="column"
              rowSpacing={5}
            >
              {views.map((item) => (
                <Grid container item alignItems="center" columnSpacing={2} key={item.title}>
                  <Grid item>{item.icon}</Grid>
                  <Grid item>
                    <Link
                      variant="h2"
                      underline="hover"
                      href={item.ref}
                      color="common.white"
                      fontWeight={500}
                    >
                      {item.title}
                    </Link>
                  </Grid>
                </Grid>
              ))}
            </Grid>
            <Grid
              container
              item
              mt={10}
              xs={12}
              md={6}
              flexDirection="column"
              rowSpacing={4}
            >
              {externalLinks.map((item) => (
                <Grid item textAlign={["left", "left", "right"]} key={item.title}>
                  <Link
                    variant="h4"
                    underline="hover"
                    target="_blank"
                    href={item.ref}
                    color="grey.500"
                  >
                    {item.title}
                  </Link>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default NavigationMainMenuButton;
