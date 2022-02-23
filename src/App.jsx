import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { withTranslation } from "react-i18next";
// fonts
import "@fontsource/rubik/400.css";
import "@fontsource/rubik/500.css";
import "@fontsource/rubik/600.css";
import "@fontsource/luckiest-guy/400.css";
// material-ui
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline, Container } from "@mui/material";
import { theme } from "./utils/theme";
import LoadingSpinner from "./components/common/LoadingSpinner";
import ServiceWorkerWrapper from "./components/ServiceWorkerWrapper";
import AnnouncementBar from "./components/layout/AnnouncementBar";
import { Helmet } from "react-helmet";
import Version from "./components/layout/Version";
import SnackbarProvider from "./components/snackbars/SnackbarProvider";
// pages
import Home from "./views/Home/Home";
// (lazy loading)
const Tutorial = lazy(() => import("./views/Tutorial/Tutorial"));
const Market = lazy(() => import("./views/Market/Market"));
const MarketAromaOffers = lazy(() =>
  import("./views/MarketAromaOffers/MarketAromaOffers")
);
const MarketAromaBuy = lazy(() =>
  import("./views/MarketAromaBuy/MarketAromaBuy")
);
const MarketChefBuy = lazy(() => import("./views/MarketChefBuy/MarketChefBuy"));
const Kitchen = lazy(() => import("./views/Kitchen/Kitchen"));
const KitchenRecipeCreate = lazy(() =>
  import("./views/KitchenRecipeCreate/KitchenRecipeCreate")
);
const Buffet = lazy(() => import("./views/Buffet/Buffet"));
const Internal = lazy(() => import("./views/Internal/Internal"));
const MyChefs = lazy(() => import("./views/MyChefs/MyChefs"));
const ChefSingle = lazy(() => import("./views/ChefSingle/ChefSingle"));
const RecipeSingle = lazy(() => import("./views/RecipeSingle/RecipeSingle"));

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
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/tutorial" element={<Tutorial />} />
              <Route path="/buffet" element={<Buffet />} />
              <Route path="/market" element={<Market />} />
              <Route
                path="/market/aroma/offers"
                element={<MarketAromaOffers />}
              />
              <Route path="/market/aroma/buy" element={<MarketAromaBuy />} />
              <Route path="/market/chef/buy" element={<MarketChefBuy />} />
              <Route path="/kitchen" element={<Kitchen />} />
              <Route
                path="/kitchen/recipe/create"
                element={<KitchenRecipeCreate />}
              />
              <Route path="/internal" element={<Internal />} />
              <Route path="/my-chefs" element={<MyChefs />} />
              <Route path="/my-chefs/chef/:tokenId" element={<ChefSingle />} />
              <Route
                path="/buffet/recipe/:recipeId"
                element={<RecipeSingle />}
              />
            </Routes>
          </Suspense>
          <Version />
        </Container>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default withTranslation()(App);
