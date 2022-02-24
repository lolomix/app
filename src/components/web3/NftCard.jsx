import {
  Box,
  Card,
  CardContent,
  Typography,
  Stack,
  Button,
} from "@mui/material";
import { theme } from "../../utils/theme";
import CurrencyAromaCartoonIcon from "../../components/icons/CurrencyAromaCartoonIcon";
import { useChefMetadata } from "../../hooks/chef/useChefMetadata";
import ChefImage from "../common/ChefImage";

/**
 * @param tokenAbi
 * @param tokenAddress
 * @param tokenID
 * @param {boolean} lazyLoad
 * @param {boolean} firstCard
 * @param remaining
 * @param {function} handleBuyDialog
 * @param {boolean} transactionInProgress
 * @param price
 * @param {string} variant
 * @returns {JSX.Element}
 * @constructor
 */
function NftCard({
  tokenAbi,
  tokenAddress,
  tokenID,
  lazyLoad = false,
  firstCard = false,
  remaining = true,
  handleBuyDialog,
  transactionInProgress,
  price,
  variant = "elevation",
}) {
  const nft = useChefMetadata(tokenID);
  const lore =
    nft?.metadata?.attributes?.find((attr) => attr.trait_type === "Lore")
      ?.value ?? "Unrevealed";

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
            <ChefImage
              tokenId={tokenID}
              sourceProps={
                nft?.metadata?.image && { srcSet: nft.metadata.image }
              }
            />
            {firstCard ? (
              <Button
                bg="yellowContained"
                fullWidth
                size="xlarge"
                startIcon={<CurrencyAromaCartoonIcon />}
                disabled={!remaining}
                onClick={handleBuyDialog}
                loading={transactionInProgress.toString()}
              >
                <Typography variant="h4">{price}</Typography>
              </Button>
            ) : (
              <Box backgroundColor="grey.200" borderRadius={1}>
                <Typography variant="h4" p={2} fontWeight="bold">
                  CHEF #{tokenID}
                </Typography>
              </Box>
            )}
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default NftCard;
