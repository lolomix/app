import React from "react";
import { Helmet } from "react-helmet";
import ViewHeading from "./ViewHeading";
import { Stack, Container } from "@mui/material";
import Footer from "./Footer";
import Navigation from "./Navigation";

const Layout = ({ helmetTitle, children, title, subTitle, icon }) => {
  return (
    <Stack justifyContent="space-between" sx={{ minHeight: "100vh" }}>
      <Helmet>
        <title>{helmetTitle}</title>
      </Helmet>
      <Container maxWidth={"xl"} disableGutters mt={2}>
        <Navigation />
        <Stack mx={3} pt={6} pb={3} alignItems="center" spacing={2}>
          {title && (
            <ViewHeading title={title} subTitle={subTitle} icon={icon} />
          )}
          {children}
        </Stack>
      </Container>
      <Footer />
    </Stack>
  );
};
export default Layout;
