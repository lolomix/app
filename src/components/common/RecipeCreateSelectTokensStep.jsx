import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import RecipeOnPlateIcon from "../icons/RecipeOnPlateIcon";
import { bindDialogClick } from "../../utils/binders";

/**
 * @param tokenSelectorDialogState
 * @returns {JSX.Element|null}
 * @constructor
 */
function RecipeCreateSelectTokensStep({ tokenSelectorDialogState }) {
  return (
    <Grid container justifyContent="center" alignItems="center">
      <Grid item xs sm={6} md={4} textAlign="center">
        <Card>
          <CardHeader
            title={
              <Typography color="secondary" variant="h4">
                Please add tokens to your recipe
              </Typography>
            }
          />
          <CardContent>
            <RecipeOnPlateIcon sx={{ fontSize: "12rem" }} />
          </CardContent>
          <CardActions>
            <Button
              fullWidth
              variant="yellowContained"
              size="massive"
              {...bindDialogClick(tokenSelectorDialogState)}
            >
              Add Tokens
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
}

export default RecipeCreateSelectTokensStep;
