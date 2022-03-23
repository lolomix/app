import { useParams } from "react-router-dom";
import { useConfig, useEthers } from "@usedapp/core";
import NftCard from "../../components/web3/NftCard";
import ConnectionErrorCard from "../../components/common/ConnectionErrorCard";
import tokenAbi from "../../web3/abi/CryptoChefsERC721Facet.json";
import {
  Button,
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  Divider,
  Link,
} from "@mui/material";
import WhiteFlameIcon from "../../components/icons/WhiteFlameIcon";
import { theme } from "../../utils/theme";
import { useChefMetadata } from "../../hooks/chef/useChefMetadata";
import Layout from "../../components/layout/Layout";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { Link as RouterLink } from "react-router-dom";
import Classic_Flavor from "../../assets/Classic/classic_flavor.svg";
import Classic_Gear from "../../assets/Classic/classic_gear.svg";
import Classic_Toque from "../../assets/Classic/classic_toque.svg";
import Classic_Hairstyle from "../../assets/Classic/classic_hairstyle.svg";
import Classic_Uniform from "../../assets/Classic/classic_uniform.svg";
import Classic_Utensil from "../../assets/Classic/classic_utensil.svg";
import Epic_Flavor from "../../assets/Epic/epic_flavor.svg";
import Epic_Gear from "../../assets/Epic/epic_gear.svg";
import Epic_Toque from "../../assets/Epic/epic_toque.svg";
import Epic_Hairstyle from "../../assets/Epic/epic_hairstyle.svg";
import Epic_Uniform from "../../assets/Epic/epic_uniform.svg";
import Epic_Utensil from "../../assets/Epic/epic_utensil.svg";
import Legendary_Flavor from "../../assets/Legendary/legendary_flavor.svg";
import Legendary_Gear from "../../assets/Legendary/legendary_gear.svg";
import Legendary_Toque from "../../assets/Legendary/legendary_toque.svg";
import Legendary_Hairstyle from "../../assets/Legendary/legendary_hairstyle.svg";
import Legendary_Uniform from "../../assets/Legendary/legendary_uniform.svg";
import Legendary_Utensil from "../../assets/Legendary/legendary_utensil.svg";

function createRarityObject(classic, epic, legendary) {
  return {
    Classic: classic,
    Epic: epic,
    Legendary: legendary,
  };
}

const traitImages = {
  Toque: createRarityObject(Classic_Toque, Epic_Toque, Legendary_Toque),
  Hairstyle: createRarityObject(
    Classic_Hairstyle,
    Epic_Hairstyle,
    Legendary_Hairstyle
  ),
  Uniform: createRarityObject(Classic_Uniform, Epic_Uniform, Legendary_Uniform),
  Utensil: createRarityObject(Classic_Utensil, Epic_Utensil, Legendary_Utensil),
  Gear: createRarityObject(Classic_Gear, Epic_Gear, Legendary_Gear),
  Flavor: createRarityObject(Classic_Flavor, Epic_Flavor, Legendary_Flavor),
};

function ChefSingle() {
  const { tokenId } = useParams();
  const {
    readOnlyChainSettings: { masterContractAddress: tokenAddress },
  } = useConfig();
  const { active, error } = useEthers();
  const nft = useChefMetadata(tokenId);
  const attributes = nft?.metadata?.attributes;
  const lore = attributes?.find((attr) => attr.trait_type === "Lore")?.value;

  console.log(attributes);

  return (
    <Layout buttonType="back">
      <Grid container mt={6} justifyContent="center">
        {active ? (
          <Grid
            container
            item
            mt={{ xs: 0, sm: -11 }}
            xs={12}
            sm={8}
            md={9.5}
            spacing={3}
          >
            <Grid item xs={12} md={4.5} lg={4}>
              <NftCard
                tokenAbi={tokenAbi}
                tokenAddress={tokenAddress}
                tokenID={tokenId}
              />
            </Grid>
            <Grid item xs={12} md={4.5} lg={4} order={{ xs: 2, md: 3 }}>
              <Button
                fullWidth
                size="massive"
                bg="yellowContained"
                to="/kitchen/recipe/create/"
                component={RouterLink}
                startIcon={<WhiteFlameIcon />}
              >
                Cook A Recipe
              </Button>
            </Grid>
            <Grid
              container
              item
              xs={12}
              md={7.5}
              lg={8}
              order={{ xs: 3, md: 2 }}
            >
              <Card
                sx={{
                  boxShadow: theme.blurredShadows,
                  padding: 2,
                  width: "100%",
                }}
              >
                <CardContent>
                  <Grid
                    container
                    item
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Grid item sm={6}>
                      <Typography
                        variant="h3"
                        color="secondary"
                        fontWeight={500}
                      >
                        Rarity Level
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} textAlign="right" mt={2}>
                      <Link
                        color="grey.600"
                        underline="hover"
                        fontWeight="300"
                        href={`https://opensea.io/assets/matic/${tokenAddress}/${tokenId}`}
                        target="_blank"
                        rel="nofollow noindex"
                      >
                        Show it on Opensea{" "}
                        <OpenInNewIcon
                          sx={{ fontSize: 20, marginBottom: -0.6 }}
                        />
                      </Link>
                    </Grid>
                  </Grid>
                  <Divider sx={{ marginY: 3.5 }} light />
                  <Grid container item rowSpacing={3}>
                    {lore ? (
                      attributes?.map(
                        (attr, index) =>
                          index > 0 &&
                          index < 7 && (
                            <Grid
                              container
                              item
                              md={6}
                              justifyContent="flex-start"
                              alignItems="center"
                              spacing={2}
                              key={`attr:${attr.value}${lore}`}
                            >
                              <Grid item>
                                <Box
                                  sx={{
                                    minWidth: "75px",
                                    width: "5.5vw",
                                    minHeight: "75px",
                                    height: "5.5vw",
                                    border: "transparent",
                                    borderRadius: "12px",
                                  }}
                                >
                                  <img
                                    src={
                                      traitImages[attr.trait_type][attr.rarity]
                                    }
                                    width="100%"
                                    height="100%"
                                    alt={attr.trait_type}
                                  />
                                </Box>
                              </Grid>
                              <Grid
                                container
                                item
                                flexDirection="column"
                                xs={7}
                              >
                                <Grid item>
                                  <Typography variant="h5" color="grey.700">
                                    {attr.value}
                                  </Typography>
                                </Grid>
                                <Grid item>
                                  <Typography variant="h5" color="grey.500">
                                    {attr.rarity}
                                  </Typography>
                                </Grid>
                              </Grid>
                            </Grid>
                          )
                      )
                    ) : (
                      <Typography variant="h5" textAlign="center" mt={5}>
                        Find out about treats after the reveal
                      </Typography>
                    )}
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        ) : (
          <Grid item xs={10} sm={7} md={5} lg={4} mb={21}>
            <ConnectionErrorCard error={error} elevation={3} />
          </Grid>
        )}
      </Grid>
    </Layout>
  );
}

export default ChefSingle;
