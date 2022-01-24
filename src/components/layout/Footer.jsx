import React from "react";
import { Container, Divider, Grid, Link, Typography } from "@mui/material";
import Logo from "../common/Logo";

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
    <Container
      maxWidth={false}
      sx={{
        backgroundColor: "common.black",
        height: "25vh",
        position: "absolute",
        bottom: 0,
        left: 0,
      }}
    >
      <Grid container justifyContent="center" mt={6}>
        <Grid
          container
          item
          xs={12}
          alignItems="center"
          justifyContent="space-around"
        >
          <Grid item xs={3}>
            <Logo />
          </Grid>
          <Grid container item xs={3} justifyContent="space-around">
            {externalLinks.map((item) => (
              <Grid item px={1}>
                <Link underline="hover" target="blank" href={item.ref}>
                  <Typography variant="h5" color="common.white">
                    {item.title}
                  </Typography>
                </Link>
              </Grid>
            ))}
          </Grid>
          <Grid container item xs={3} justifyContent="space-around">
            {views.map((item) => (
              <Grid item px={1}>
                <Link underline="hover" href={item.ref}>
                  <Typography variant="h5" color="common.white">
                    {item.title}
                  </Typography>
                </Link>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Divider
          light
          style={{
            width: "91%",
            backgroundColor: "#E9E9E947",
            marginTop: 15,
            marginBottom: 5,
          }}
        />
        <Grid container item xs={11} justifyContent="space-between">
          <Grid item xs={6} p={2}>
            <Typography variant="h6" color="grey.500">
              {new Date().getFullYear()}, All Rights Reserved
            </Typography>
          </Grid>
          <Grid container item xs={2} p={2} justifyContent="space-between">
            {privacyPolicyAndCookies.map((item) => (
              <Grid item>
                <Link
                  underline="hover"
                  target="blank"
                  href={item.ref}
                  style={{ opacity: "0.66" }}
                >
                  <Typography variant="h5" color="grey.500">
                    {item.title}
                  </Typography>
                </Link>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Footer;
