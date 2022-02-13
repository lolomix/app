import { Alert, darken, Link } from "@mui/material";
import { TARGET_CHAIN, NETWORKS } from "../../web3/constants";
import ChefSilhouetteIcon from "../icons/ChefSilhouetteIcon";
import { theme } from "../../utils/theme";
import { useChefSeasonRemaining } from "../../hooks/chef/useChefSeasonRemaining";

/**
 * @returns {JSX.Element|null}
 * @constructor
 *
 * @todo refactor this to be more sophisticated and remove constant dependency
 */
function AnnouncementBar() {
  const testnet = NETWORKS[TARGET_CHAIN].testnet === true;
  const chefSeasonRemaining = useChefSeasonRemaining();

  // only show warning on testnet
  if (testnet) {
    return (
      <Alert
        variant="filled"
        severity="error"
        sx={{ borderRadius: 0, justifyContent: "center" }}
      >
        TESTNET ALERT - Connected to {NETWORKS[TARGET_CHAIN].name}
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
