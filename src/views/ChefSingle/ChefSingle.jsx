import React from "react";
import { useParams } from "react-router-dom";
import { useEthers } from "@usedapp/core";
import NftCard from "../../components/web3/NftCard";
import ConnectionErrorCard from "../../components/common/ConnectionErrorCard";
import tokenAbi from "../../web3/abi/CryptoChefsERC721Facet.json";
import { NETWORKS, TARGET_CHAIN } from "../../web3/constants";
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
import { useNftWithMetadata } from "../../hooks/useNftWithMetadata";
import Layout from "../../components/layout/Layout";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

function ChefSingle() {
  const { tokenId } = useParams();
  const { active, error } = useEthers();
  const tokenAddress = NETWORKS[TARGET_CHAIN].contractMaster;
  const nft = useNftWithMetadata(tokenAbi, tokenAddress, tokenId);
  const attributes = nft?.metadata?.attributes;

  return (
    <Layout>
      <Grid container item mt={4} justifyContent="center">
        {active ? (
          <Grid container item xs={10} md={12} spacing={3}>
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
                variant="yellowContained"
                href="/kitchen/recipe/create/"
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
              <Card sx={{ boxShadow: theme.blurredShadows, padding: 1 }}>
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
                    <Grid item sm={6} textAlign="right" mt={2}>
                      <Link
                        color="grey.600"
                        underline="hover"
                        fontWeight="300"
                        target="_blank"
                        href={`https://opensea.io/assets/matic/${tokenAddress}/${tokenId}`}
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
                    {attributes?.map(
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
                          >
                            <Grid item>
                              <Box
                                sx={{
                                  backgroundColor: "#C6E2F4",
                                  minWidth: "75px",
                                  width: "5.5vw",
                                  minHeight: "75px",
                                  height: "5.5vw",
                                  border: "3px solid #98C6E5",
                                  borderRadius: "12px",
                                }}
                              ></Box>
                            </Grid>
                            <Grid container item flexDirection="column" xs={7}>
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
