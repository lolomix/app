import { Alert, darken, Link } from "@mui/material";
import ChefSilhouetteIcon from "../icons/ChefSilhouetteIcon";
import { theme } from "../../utils/theme";
import { useChefSeasonRemaining } from "../../hooks/chef/useChefSeasonRemaining";
import { getChainById, useConfig } from "@usedapp/core";

/**
 * @returns {JSX.Element|null}
 * @constructor
 *
 * @todo refactor this to be more sophisticated and remove constant dependency
 */
function AnnouncementBar() {
  const { readOnlyChainId } = useConfig();
  const { isTestChain, chainName } = getChainById(readOnlyChainId);
  const chefSeasonRemaining = useChefSeasonRemaining();

  // only show warning on testnet
  if (isTestChain) {
    return (
      <Alert
        variant="filled"
        severity="error"
        sx={{ borderRadius: 0, justifyContent: "center" }}
      >
        {chainName} Environment
      </Alert>
    );
  }

  if (chefSeasonRemaining === 0) {
    return (
      <Alert
        icon={<ChefSilhouetteIcon fontSize="inherit" />}
        variant="filled"
        sx={{
          backgroundColor: darken(theme.palette.tertiary.main, 0.06),
          color: "secondary.main",
          borderRadius: 0,
          justifyContent: "center",
        }}
      >
        <strong>WE ARE SOLD OUT!</strong> - Thank you so much for your support.
        Join our{" "}
        <Link color="primary" href="https://discord.com/invite/JufpFYBdKG">
          Discord
        </Link>{" "}
        to stay updated for Season 2!
      </Alert>
    );
  }

  return null;
}

export default AnnouncementBar;
