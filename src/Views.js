import { Route, Routes } from "react-router-dom";
import { withTranslation } from "react-i18next";
import { lazy } from "react";
import Home from "./views/Home/Home";
import { useChainWatcher } from "./contexts/chainWatcher/chainWatcherContext";

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
const UnsupportedChain = lazy(() =>
  import("./views/UnsupportedChain/UnsupportedChain")
);

function Views() {
  const { unsupportedChain } = useChainWatcher();

  if (unsupportedChain) {
    return <UnsupportedChain />;
  }

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/tutorial" element={<Tutorial />} />
      <Route path="/buffet" element={<Buffet />} />
      <Route path="/market" element={<Market />} />
      <Route path="/market/aroma/offers" element={<MarketAromaOffers />} />
      <Route path="/market/aroma/buy" element={<MarketAromaBuy />} />
      <Route path="/market/chef/buy" element={<MarketChefBuy />} />
      <Route path="/kitchen" element={<Kitchen />} />
      <Route path="/kitchen/recipe/create" element={<KitchenRecipeCreate />} />
      <Route path="/internal" element={<Internal />} />
      <Route path="/my-chefs" element={<MyChefs />} />
      <Route path="/my-chefs/chef/:tokenId" element={<ChefSingle />} />
      <Route path="/buffet/recipe/:recipeId" element={<RecipeSingle />} />
    </Routes>
  );
}

export default withTranslation()(Views);
