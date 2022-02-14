import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import { Link as RouterLink } from "react-router-dom";

/**
 * @returns {JSX.Element|null}
 * @constructor
 */
function RecipeCreateFinishStep() {
  return (
    <Grid container justifyContent="center" alignItems="center">
      <Grid item xs sm={8} md={6} textAlign="center">
        <Card>
          <CardHeader
            title={
              <Typography color="secondary" variant="h5">
                Congratulations! You have successfully cooked a recipe!
              </Typography>
            }
          />
          <CardContent>
            <Typography>
              You can find out more about your recipe in the{" "}
              <Link color="secondary" to="/buffet" component={RouterLink}>
                Buffet
              </Link>
              . Head over there to see all of your recipes.
            </Typography>
          </CardContent>
          <CardActions sx={{ justifyContent: "center" }}>
            <Button
              elongatedWidth
              variant="yellowContainedSmall"
              size="large"
              to="/kitchen/recipe/create"
              component={RouterLink}
            >
              Create Another
            </Button>
            <Button
              elongatedWidth
              variant="yellowContainedSmall"
              size="large"
              to="/buffet"
              component={RouterLink}
            >
              View Recipe
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
}

export default RecipeCreateFinishStep;
