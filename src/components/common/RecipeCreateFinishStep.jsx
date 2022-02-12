import { Card, CardContent, CardHeader, Grid, Typography } from "@mui/material";
import Button from "@mui/material/Button";

/**
 * @returns {JSX.Element|null}
 * @constructor
 */
function RecipeCreateFinishStep() {
  return (
    <Grid container justifyContent="center" alignItems="center">
      <Grid item xs sm={10} md={8} textAlign="center">
        <Card>
          <CardHeader
            title={
              <Typography color="secondary" variant="h5">
                You have successfully created your recipe!
              </Typography>
            }
          />
          <CardContent>
            <Button
              fullWidth
              variant="yellowContained"
              size="massive"
              href="/kitchen/recipe/create"
            >
              Create Another
            </Button>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default RecipeCreateFinishStep;
