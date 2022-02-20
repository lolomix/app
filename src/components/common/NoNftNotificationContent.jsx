import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import silhouettes from "../../assets/components/common/no-nft-notification-card/chefs@2x.png";
import Grid from "../styled/Grid";

/**
 * @param {boolean|undefined} fullHeight
 * @returns {JSX.Element}
 * @constructor
 */
function NoNftNotificationContent({ fullHeight }) {
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      fullHeight={fullHeight}
    >
      <Grid container item maxWidth="sm">
        <Grid item xs textAlign="center">
          <img
            src={silhouettes}
            alt="Chef Silhouettes"
            style={{ maxWidth: "182px" }}
          />
          <Typography mt={2}>
            It seems like you do not own any CHEFs. You can quickly buy a CHEF
            in the <Link to="/market">Market</Link> to start cooking up recipes!
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default NoNftNotificationContent;
