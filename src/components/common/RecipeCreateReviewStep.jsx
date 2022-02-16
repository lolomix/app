import {
  Alert,
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import { useRecipeCreator } from "../../contexts/recipeCreator/recipeCreatorContext";
import { bindDialogClick } from "../../utils/binders";
import RecipeCreateCoinPairController from "./RecipeCreateCoinPairController";
import RecipePerformanceChart from "../charts/RecipePerformanceChart";
import RecipeCreateCoinPairPresenter from "./RecipeCreateCoinPairPresenter";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { theme } from "../../utils/theme";
import { useRecipeCalculateId } from "../../hooks/recipe/useRecipeCalculateId";

/**
 * @returns {JSX.Element|null}
 * @constructor
 */
function RecipeCreateReviewStep({ tokenSelectorDialogState }) {
  const [{ tokens, maxSelection }, { nextStep, removeToken }] =
    useRecipeCreator();

  const [recipeCalculateId, recipeCalculateIdError] =
    useRecipeCalculateId(tokens);

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
            <RecipePerformanceChart tokens={tokens} />
            <Typography mt={4} variant="h6" textAlign="left" gutterBottom>
              Selected Tokens
            </Typography>
            <Grid container spacing={3}>
              {tokens.map((coinPair) => (
                <Grid
                  key={coinPair.id}
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
                      <RecipeCreateCoinPairPresenter coinPair={coinPair} />
                      <Tooltip title="Remove Token">
                        <IconButton
                          onClick={() => removeToken(coinPair)}
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
                      </Tooltip>
                    </Box>
                  </Grid>
                  <Grid item xs={5} sm={8.5} md={10} lg={8}>
                    <RecipeCreateCoinPairController token={coinPair} />
                  </Grid>
                </Grid>
              ))}
            </Grid>
          </CardContent>
          {recipeCalculateIdError && (
            <CardContent>
              <Alert
                severity="error"
                sx={{
                  justifyContent: "center",
                }}
              >
                {recipeCalculateIdError}
              </Alert>
            </CardContent>
          )}
          <CardActions sx={{ justifyContent: "center" }}>
            <Button
              disabled={tokens.length === maxSelection}
              elongatedwidth="30"
              bg="yellowContainedSmall"
              size="large"
              {...bindDialogClick(tokenSelectorDialogState)}
            >
              Add Tokens
            </Button>
            <Button
              disabled={!recipeCalculateId}
              elongatedwidth="30"
              bg="yellowContainedSmall"
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
