// material-ui
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
// custom
import RecipeOnPlateIcon from "../icons/RecipeOnPlateIcon";
import { bindDialogClick } from "../../utils/binders";
import { useRecipeCreator } from "../../contexts/recipeCreatorContext";

/**
 * Define the Recipe Creator Step of the Component
 *
 * @type {number}
 */
const RECIPE_CREATOR_STEP = 0;

/**
 * @param tokenSelectorDialogState
 * @returns {JSX.Element|null}
 * @constructor
 */
function RecipeCreateSelectTokensStep({ tokenSelectorDialogState }) {
  const [{ activeStep }] = useRecipeCreator();

  if (activeStep !== RECIPE_CREATOR_STEP) return null;

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
