// material-ui
import { alpha, Box, IconButton, Typography } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
// custom
import AromaBalance from "../web3/AromaBalance";
import CurrencyAromaCartoonIcon from "../icons/CurrencyAromaCartoonIcon";
import { theme } from "../../utils/theme";

/**
 * @returns {JSX.Element}
 * @constructor
 */
function NavigationAromaBalance() {
  return (
    <Box position="relative">
      <CurrencyAromaCartoonIcon
        sx={{
          fontSize: "3rem",
          position: "absolute",
          zIndex: 100,
          left: 0,
          top: 0,
        }}
      />
      <Box position="relative" py={0.5}>
        <Box
          pl={8}
          pr={3}
          py={0.75}
          borderRadius={3}
          borderTop={`4px solid ${alpha(theme.palette.common.black, 0.5)}`}
          backgroundColor={alpha(theme.palette.common.black, 0.5)}
        >
          <Typography color="white" variant="button" as="span">
            <AromaBalance />
          </Typography>
          {/* @todo href should not be hard-coded */}
          <IconButton
            href="/market/aroma/buy"
            sx={{
              padding: 0,
              backgroundColor: "common.white",
              color: "success.main",
              position: "absolute",
              right: "-0.75rem",
              "&:hover": {
                backgroundColor: "common.white",
              },
            }}
          >
            <AddCircleIcon />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}

export default NavigationAromaBalance;
