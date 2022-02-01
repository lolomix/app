import React from "react";
import { useParams } from "react-router-dom";
import { useEthers } from "@usedapp/core";
import NftCard from "../../components/web3/NftCard";
import ConnectionErrorCard from "../../components/common/ConnectionErrorCard";
import tokenAbi from "../../web3/abi/CryptoChefsERC721Facet.json";
import { NETWORKS, TARGET_CHAIN } from "../../web3/constants";
import Grid from "@mui/material/Grid";
import {
  Button,
  Card,
  CardContent,
  Container,
  Typography,
} from "@mui/material";
import WhiteFlameIcon from "../../components/icons/WhiteFlameIcon";
import { theme } from "../../utils/theme";

/**
 * @returns {JSX.Element}
 * @constructor
 *
 * @todo fix error handling
 */
function ChefSingle() {
  const { tokenId } = useParams();
  const { active, error } = useEthers();
  const tokenAddress = NETWORKS[TARGET_CHAIN].contractMaster;

  return (
    <Container>
      <Grid container item mt={5} spacing={2} justifyContent="center">
        {active ? (
          <>
            <Grid item xs={12} md={4}>
              <NftCard
                tokenAbi={tokenAbi}
                tokenAddress={tokenAddress}
                tokenID={tokenId}
              />
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
            <Grid item xs={12} md={8}>
              <Card sx={{ boxShadow: theme.blurredShadows }}>
                <CardContent>
                  <Typography variant="h3" color="secondary" fontWeight={500}>
                    Rarity Level
                  </Typography>
                  etc..
                </CardContent>
              </Card>
            </Grid>
          </>
        ) : (
          <Grid item xs={10} sm={7} md={5} lg={4} mb={21}>
            <ConnectionErrorCard error={error} elevation={3} />
          </Grid>
        )}
      </Grid>
    </Container>
  );
}

export default ChefSingle;
