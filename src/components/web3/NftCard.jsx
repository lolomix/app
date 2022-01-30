import React from "react";
import PropTypes from "prop-types";
// material-ui
import {
  Box,
  Card,
  CardContent,
  Typography,
  Stack,
  Button,
} from "@mui/material";
// custom
import { useNftWithMetadata } from "../../hooks/useNftWithMetadata";
import { theme } from "../../utils/theme";
import placeholder from "../../assets/components/web3/nft-card/placeholder.png";
import BuyChef from "../../assets/Buy_CHEF.svg";
import CurrencyAromaCartoonIcon from "../../components/icons/CurrencyAromaCartoonIcon";

/**
 * @param tokenAbi
 * @param tokenAddress
 * @param tokenID
 * @param lazyLoad
 * @returns {JSX.Element}
 * @constructor
 */
function NftCard({
  tokenAbi,
  tokenAddress,
  tokenID,
  lazyLoad = false,
  firstCard = false,
  remainingFormatted,
  handleBuyDialog,
  transactionInProgress,
  priceFormatted,
}) {
  const nft = useNftWithMetadata(tokenAbi, tokenAddress, tokenID);
  const lore =
    nft?.metadata?.attributes?.find((attr) => attr.trait_type === "Lore")
      ?.value ?? "Unrevealed";
  const image = nft?.metadata?.image ?? placeholder;

  return (
    <Card sx={{ boxShadow: theme.blurredShadows }}>
      <CardContent>
        <Stack textAlign="center" spacing={1}>
          <Typography variant="h3" color="secondary" fontWeight={500}>
            {firstCard ? "Buy a CHEF" : lore}
          </Typography>
          <Typography variant="h5">Season 1</Typography>

          <Box
            sx={{
              background: "rgba(237,246,255, 0.33) 0% 0% no-repeat padding-box",
              boxShadow: "inset 0px 6px 8px rgba(237,246,255, 1)",
              padding: 1.5,
            }}
          >
            {firstCard ? (
              <>
                <picture>
                  <source srcSet={BuyChef} />
                  <img
                    style={{ width: "87%", padding: 20 }}
                    src={BuyChef}
                    alt={"Buy CHEF"}
                  />
                </picture>
                <Button
                  variant="yellowContained"
                  fullWidth
                  size="xlarge"
                  startIcon={<CurrencyAromaCartoonIcon />}
                  disabled={!remainingFormatted}
                  onClick={handleBuyDialog}
                  loading={transactionInProgress}
                >
                  <Typography variant="h4">{priceFormatted}</Typography>
                </Button>
              </>
            ) : (
              <>
                <picture>
                  <source srcSet={image} />
                  <img
                    style={{ maxWidth: "100%" }}
                    src={image}
                    alt={"CHEF #" + tokenID + " image"}
                    {...(lazyLoad && { loading: "lazy" })}
                  />
                </picture>
                <Box backgroundColor="grey.200" borderRadius={1}>
                  <Typography variant="h4" p={2} fontWeight="bold">
                    CHEF #{tokenID}
                  </Typography>
                </Box>
              </>
            )}
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}

/**
 * @type {{tokenAddress: Validator<NonNullable<string>>, tokenID: Validator<NonNullable<NonNullable<InferType<Requireable<string>|Requireable<number>>>>>, tokenAbi: Validator<NonNullable<any[]>>, lazyLoad: Requireable<boolean>}}
 */
NftCard.propTypes = {
  tokenAbi: PropTypes.array.isRequired,
  tokenAddress: PropTypes.string.isRequired,
  tokenID: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  lazyLoad: PropTypes.bool,
};

export default NftCard;
