import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import { useRecipeCreator } from "../../contexts/recipeCreatorContext";
import { bindDialogClick } from "../../utils/binders";
import { useSnackbar } from "notistack";
import RecipeCreateTokenController from "./RecipeCreateTokenController";
import RecipePerformanceChart from "../charts/RecipePerformanceChart";
import RecipeCreateTokenPresenter from "./RecipeCreateTokenPresenter";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { theme } from "../../utils/theme";

/**
 * Define the Recipe Creator Step of the Component
 *
 * @type {number}
 */
const RECIPE_CREATOR_STEP = 1;

/**
 * @returns {JSX.Element|null}
 * @constructor
 */
function RecipeCreateReviewStep({ tokenSelectorDialogState }) {
  const [{ activeStep, tokens, maxSelection }, { nextStep, removeToken }] =
    useRecipeCreator();

  const { enqueueSnackbar } = useSnackbar();

  if (activeStep !== RECIPE_CREATOR_STEP) return null;

  return (
    <Grid container justifyContent="center" alignItems="center">
      <Grid item xs sm={10} md={8}>
        <Card>
          <CardHeader
            title={
              <Typography color="secondary" variant="h5" textAlign="center">
                Review
              </Typography>
            }
          />
          <CardContent>
            <Typography variant="h6" textAlign="left" gutterBottom>
              The past month's performance of this recipe
            </Typography>
            <RecipePerformanceChart />
            <Typography mt={4} variant="h6" textAlign="left" gutterBottom>
              Selected Tokens
            </Typography>
            <Grid container spacing={3}>
              {tokens.map((token) => (
                <Grid
                  key={token.id}
                  item
                  container
                  xs={12}
                  sm={6}
                  md={4}
                  spacing={2}
                  justifyContent="center"
                  alignItems="center"
                >
                  <Grid item xs={7} sm={12}>
                    <Box position="relative">
                      <RecipeCreateTokenPresenter token={token} />
                      <IconButton
                        onClick={() => {
                          try {
                            removeToken(token);
                          } catch (error) {
                            enqueueSnackbar(error.message, {
                              variant: "error",
                            });
                          }
                        }}
                        size="xsmall"
                        variant="contained"
                        color="error"
                        inverseColor
                        sx={{
                          position: "absolute",
                          right: theme.spacing(-0.7),
                          top: theme.spacing(-0.7),
                        }}
                      >
                        <RemoveCircleIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </Grid>
                  <Grid item xs={5} sm={8.5} md={10} lg={8}>
                    <RecipeCreateTokenController token={token} />
                  </Grid>
                </Grid>
              ))}
            </Grid>
          </CardContent>
          <CardActions sx={{ justifyContent: "center" }}>
            <Button
              elongatedWidth
              disabled={tokens.length === maxSelection}
              variant="yellowContainedSmall"
              size="large"
              {...bindDialogClick(tokenSelectorDialogState)}
            >
              Add Tokens
            </Button>
            <Button
              elongatedWidth
              variant="yellowContainedSmall"
              size="large"
              onClick={nextStep}
            >
              Next Step
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
}

export default RecipeCreateReviewStep;
