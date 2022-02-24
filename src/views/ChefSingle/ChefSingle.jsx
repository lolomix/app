import React from "react";
import { useParams } from "react-router-dom";
import { useConfig, useEthers } from '@usedapp/core'
import NftCard from "../../components/web3/NftCard";
import ConnectionErrorCard from "../../components/common/ConnectionErrorCard";
import tokenAbi from "../../web3/abi/CryptoChefsERC721Facet.json";
import { NETWORKS } from "../../web3/constants";
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

function ChefSingle() {
  const { tokenId } = useParams();
  const { readOnlyChainId } = useConfig();
  const { active, error } = useEthers();
  const tokenAddress = NETWORKS[readOnlyChainId].contractMaster;
  const nft = useChefMetadata(tokenId);
  const attributes = nft?.metadata?.attributes;
  const lore = attributes?.find((attr) => attr.trait_type === "Lore")?.value;

  return (
    <Layout buttonType="back">
      <Grid container mt={6} justifyContent="center">
        {active ? (
          <Grid container item mt={{xs: 0, sm: -11}} xs={12} sm={8} md={9.5} spacing={3}>
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
                  <Grid container item rowSpacing={5}>
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
                                    backgroundColor:
                                      "#" +
                                      Math.floor(
                                        Math.random() * 16777215
                                      ).toString(16),
                                    minWidth: "75px",
                                    width: "5.5vw",
                                    minHeight: "75px",
                                    height: "5.5vw",
                                    border: "3px solid #98C6E5",
                                    borderRadius: "12px",
                                    opacity: "0.5",
                                  }}
                                />
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
                                    {attr.trait_type}
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
