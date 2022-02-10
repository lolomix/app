import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Typography,
} from "@mui/material";
import { useRecipeCreator } from "../../contexts/recipeCreatorContext";

/**
 * Define the Recipe Creator Step of the Component
 *
 * @type {number}
 */
const RECIPE_CREATOR_STEP = 3;

/**
 * @returns {JSX.Element|null}
 * @constructor
 */
function RecipeCreateFinishStep() {
  const [{ activeStep }] = useRecipeCreator();

  if (activeStep !== RECIPE_CREATOR_STEP) return null;

  return (
    <Grid container justifyContent="center" alignItems="center">
      <Grid item xs sm={10} md={8} textAlign="center">
        <Card>
          <CardHeader
            title={
              <Typography color="secondary" variant="h5">
                Thank You
              </Typography>
            }
          />
          <CardContent>
            <Box>You are a great cook!</Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default RecipeCreateFinishStep;
