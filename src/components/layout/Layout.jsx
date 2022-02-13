import React from "react";
import { Helmet } from "react-helmet";
import ViewHeading from "./ViewHeading";
import { Stack, Container, Box } from "@mui/material";
import Footer from "./Footer";
import Navigation from "./Navigation";

const Layout = ({
  helmetTitle,
  children,
  title,
  subTitle,
  icon,
  buttonType,
}) => {
  return (
    <>
      <Stack justifyContent="space-between" sx={{ minHeight: "100vh" }}>
        <Helmet>
          <title>{helmetTitle}</title>
        </Helmet>
        <Container maxWidth={"xl"} disableGutters mt={2}>
          <Navigation />
          <Stack mx={1} pt={6} pb={3} alignItems="center" spacing={5}>
            <ViewHeading
              title={title}
              subTitle={subTitle}
              icon={icon}
              buttonType={buttonType}
            />
            {children}
          </Stack>
        </Container>
      </Stack>
      <Footer />
    </>
  );
};
export default Layout;
