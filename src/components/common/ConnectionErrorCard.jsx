import { Card, CardContent, Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import bg from "../../assets/components/common/connection-error-card/bg@2x.png";

/**
 * @param errorMessage
 * @param beforeCardContent
 * @param prependCardContent
 * @param appendCardContent
 * @param afterCardContent
 * @param rest
 * @returns {JSX.Element}
 * @constructor
 */
function ConnectionErrorCard({
  errorMessage,
  beforeCardContent,
  prependCardContent,
  appendCardContent,
  afterCardContent,
  ...rest
}) {
  return (
    <Card {...rest}>
      {beforeCardContent}
      <CardContent>
        {prependCardContent}
        <Grid container justifyContent="center" alignItems="center">
          <Grid item textAlign="center">
            <img
              src={bg}
              alt="Crypto Wallet Providers"
              style={{ maxWidth: "182px" }}
            />
            <Typography mt={3}>
              {errorMessage
                ? errorMessage
                : "Something went wrong! Please check your wallet connection."}
            </Typography>
          </Grid>
        </Grid>
        {appendCardContent}
      </CardContent>
      {afterCardContent}
    </Card>
  );
}

export default ConnectionErrorCard;
