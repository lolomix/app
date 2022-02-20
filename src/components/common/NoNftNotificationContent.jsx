import { Link } from "react-router-dom";
import { Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import silhouettes from "../../assets/components/common/no-nft-notification-card/chefs@2x.png";

/**
 * @returns {JSX.Element}
 * @constructor
 */
function NoNftNotificationContent() {
  return (
    <Grid container justifyContent="center">
      <Grid item xs sm={6} textAlign="center">
        <img
          src={silhouettes}
          alt="Chef Silhouettes"
          style={{ maxWidth: "182px" }}
        />
        <Typography mt={2}>
          It seems like you do not own any CHEFs. You can quickly buy a CHEF in
          the <Link to="/market">Market</Link> to start cooking up recipes!
        </Typography>
      </Grid>
    </Grid>
  );
}

export default NoNftNotificationContent;
