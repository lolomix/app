import React from "react";
import { Helmet } from "react-helmet";
import ViewHeading from "./ViewHeading";
import { Stack, Container } from "@mui/material";
import Footer from "./Footer";
import Navigation from "./Navigation";
import { useEthers } from "@usedapp/core";
import LoadingSpinner from "../common/LoadingSpinner";
import AnnouncementBar from "./AnnouncementBar";

const Layout = ({
  helmetTitle,
  children,
  title,
  subTitle,
  icon,
  buttonType,
}) => {
  /**
   * @todo add error handling here or move it somewhere else
   */
  const { active } = useEthers();

  if (!active) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <AnnouncementBar />
      <Stack
        justifyContent="space-between"
        paddingX={{ xs: 0, md: 2 }}
        sx={{ minHeight: "100vh" }}
      >
        <Helmet>
          <title>{helmetTitle}</title>
        </Helmet>
        <Container maxWidth={"xl"} disableGutters mt={2}>
          <Navigation />
          <ViewHeading
            title={title}
            subTitle={subTitle}
            icon={icon}
            buttonType={buttonType}
          />
          <Stack
            mx={1}
            pt={title ? 6 : -6}
            pb={3}
            alignItems="center"
            spacing={5}
          >
            {children}
          </Stack>
        </Container>
      </Stack>
      <Footer />
    </>
  );
};
export default Layout;
