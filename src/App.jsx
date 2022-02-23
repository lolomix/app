import "@fontsource/rubik/400.css";
import "@fontsource/rubik/500.css";
import "@fontsource/rubik/600.css";
import "@fontsource/luckiest-guy/400.css";
import { Suspense } from "react";
import { withTranslation } from "react-i18next";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline, Container } from "@mui/material";
import { theme } from "./utils/theme";
import LoadingSpinner from "./components/common/LoadingSpinner";
import ServiceWorkerWrapper from "./components/ServiceWorkerWrapper";
import { Helmet } from "react-helmet";
import Version from "./components/layout/Version";
import SnackbarProvider from "./components/snackbars/SnackbarProvider";
import Views from "./Views";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider>
        <Helmet titleTemplate="CryptoChefs | %s">
          <title>Create Crypto Recipes and Start Earning!</title>
        </Helmet>
        <CssBaseline />
        <Container
          maxWidth="xl"
          disableGutters={true}
          sx={{
            background:
              "transparent radial-gradient(closest-side at 50% 50%, #C6E2F4 0%, #98C6E5 100%) 0% 0% no-repeat padding-box",
          }}
        >
          <ServiceWorkerWrapper />
          <Suspense fallback={<LoadingSpinner />}>
            <Views />
          </Suspense>
          <Version />
        </Container>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default withTranslation()(App);
