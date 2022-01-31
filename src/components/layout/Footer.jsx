import React from "react";
import { Box, Divider, Grid, Link } from "@mui/material";
import Logo from "../icons/Logo";

const Footer = () => {
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
    },
    {
      title: "Market",
      ref: "/market",
    },
    {
      title: "My Chefs",
      ref: "/collection",
    },
    {
      title: "Kitchen",
      ref: "/kitchen",
    },
    {
      title: "Buffet",
      ref: "/buffet",
    },
  ];
  const privacyPolicyAndCookies = [
    {
      title: "Privacy Policy",
      ref: "https://docs.google.com/document/d/1TzDtME8EREJiSk1k7B5nnuzrM3idY2NwKuyaNswfkwM/edit#heading=h.cfu9h9kq6nr9",
    },
    {
      title: "Cookies",
      ref: "https://docs.google.com/document/d/1TzDtME8EREJiSk1k7B5nnuzrM3idY2NwKuyaNswfkwM/edit#heading=h.umdnvduvwjzi",
    },
  ];

  return (
    <Box
      sx={{
        backgroundColor: "common.black",
      }}
    >
      <Grid container justifyContent="space-around" xs={12} pt={4.5} pb={1}>
        <Grid
          container
          item
          xs={11}
          alignItems="center"
          justifyContent="space-between"
        >
          <Grid item xs={12} lg={3} xl={2} order={{ xs: 1 }} textAlign="center">
            <Logo sx={{ fontSize: "18rem", height: "fit-content" }} />
          </Grid>
          <Grid
            container
            item
            xs={12}
            lg={4.5}
            xl={3.5}
            order={{ xs: 3, lg: 2 }}
            justifyContent="space-around"
          >
            {externalLinks.map((item) => (
              <Grid item lg={2.4} py={1} textAlign="center">
                <Link
                  underline="hover"
                  target="_blank"
                  href={item.ref}
                  color="common.white"
                >
                  {item.title}
                </Link>
              </Grid>
            ))}
          </Grid>
          <Grid container item lg={4} xl={3.5} order={{ xs: 2, lg: 3 }} py={3}>
            {views.map((item) => (
              <Grid item xs={12} lg={2.4} py={1} textAlign="center">
                <Link underline="hover" href={item.ref} color="common.white">
                  {item.title}
                </Link>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Divider
          style={{
            width: "91%",
            backgroundColor: "#E9E9E947",
            marginTop: 15,
            marginBottom: 5,
          }}
        />
        <Grid
          container
          item
          xs={11}
          alignItems="center"
          justifyContent="space-between"
          texAlign="center"
        >
          <Grid
            item
            xs={12}
            lg={2.6}
            xl={2}
            color="grey.500"
            order={{ xs: 2, lg: 1 }}
            textAlign="center"
          >
            {new Date().getFullYear()}, All Rights Reserved
          </Grid>
          <Grid
            container
            item
            xs={12}
            lg={3}
            xl={2}
            order={{ xs: 1, lg: 2 }}
            py={3}
            justifyContent="center"
          >
            {privacyPolicyAndCookies.map((item) => (
              <Grid item px={2}>
                <Link
                  underline="hover"
                  target="_blank"
                  href={item.ref}
                  color="grey.500"
                  rel="nofollow noindex"
                >
                  {item.title}
                </Link>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Footer;
