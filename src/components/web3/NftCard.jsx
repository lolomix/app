import {
  Box,
  Card,
  CardContent,
  Typography,
  Stack,
  Button,
} from "@mui/material";
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
 * @param firstCard
 * @param remainingFormatted
 * @param handleBuyDialog
 * @param transactionInProgress
 * @param priceFormatted
 * @param variant
 * @returns {JSX.Element}
 * @constructor
 */
function NftCard({
  tokenAbi,
  tokenAddress,
  tokenID,
  lazyLoad = false,
  firstCard = false,
  remainingFormatted = true,
  handleBuyDialog,
  transactionInProgress,
  priceFormatted,
  variant = "elevation",
}) {
  const nft = useNftWithMetadata(tokenAbi, tokenAddress, tokenID);
  const lore =
    nft?.metadata?.attributes?.find((attr) => attr.trait_type === "Lore")
      ?.value ?? "Unrevealed";
  const image = nft?.metadata?.image ?? placeholder;

  return (
    <Card
      variant={variant}
      sx={{
        ...(variant === "elevation" && { boxShadow: theme.blurredShadows }),
      }}
    >
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
                    style={{ width: "86.7%", padding: "5.6%" }}
                    src={BuyChef}
                    alt={"Buy CHEF"}
                  />
                </picture>
                <Button
                  variant="yellowContainedSmall"
                  fullWidth
                  size="xlarge"
                  startIcon={<CurrencyAromaCartoonIcon />}
                  disabled={!remainingFormatted}
                  onClick={handleBuyDialog}
                  loading={transactionInProgress.toString()}
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

export default NftCard;
