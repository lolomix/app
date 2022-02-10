import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  styled,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import { useRecipeCreator } from "../../contexts/recipeCreatorContext";
import { bindDialogClick } from "../../utils/binders";
import { useRecipeCreate } from "../../hooks/useRecipeCreate";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import SnackbarAction from "../snackbars/SnackbarAction";
import { useSnackbar } from "notistack";
import { parseUnits } from "@ethersproject/units";
import { AROMA_DECIMALS_DIGIT } from "../../web3/constants";
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
  const { send, state, events } = useRecipeCreate();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  let transactionInProgressSnackBarKey = "transactionInProgress";
  let walletInteractionSnackBarKey = "walletInteraction";

  useEffect(() => {
    console.log(state);
    console.log(events);
  }, [state, events]);

  useEffect(() => {
    if (state.status === "None") {
      setTransactionInProgress(false);
    }

    if (state.status === "Exception") {
      setTransactionInProgress(false);

      let message;
      switch (state.errorMessage) {
        case "execution reverted: total coin percentage is not 100":
          message = "Total coin percentage must be 100%.";
          break;
        case "execution reverted: this recipe is taken":
          message = "This recipe is taken. Please try another combination.";
          break;
        default:
          message = "Something must have gone wrong";
          break;
      }

      enqueueSnackbar(message, {
        variant: "error",
      });
    }

    if (state.status === "Mining") {
      setTransactionInProgress(true);
    }

    if (state.status === "Success") {
      setTransactionInProgress(false);
      enqueueSnackbar("Success", {
        variant: "success",
      });
      nextStep();
    }
  }, [state, closeSnackbar, enqueueSnackbar, nextStep]);

  /**
   * Definition of the transaction in progress state
   */
  const [transactionInProgress, setTransactionInProgress] = useState(false);

  useEffect(() => {
    if (transactionInProgress === false) {
      closeSnackbar(transactionInProgressSnackBarKey);
      return;
    }
    closeSnackbar(walletInteractionSnackBarKey);
    enqueueSnackbar("Transaction in progress", {
      key: transactionInProgressSnackBarKey,
      variant: "warning",
      persist: true,
      action: <SnackbarAction />,
    });
  }, [
    transactionInProgress,
    enqueueSnackbar,
    closeSnackbar,
    transactionInProgressSnackBarKey,
    walletInteractionSnackBarKey,
  ]);

  const handleCreate = async () => {
    enqueueSnackbar("Waiting for interaction in Wallet", {
      key: walletInteractionSnackBarKey,
      variant: "warning",
      persist: true,
      action: <SnackbarAction />,
    });

    try {
      const payload = [
        243,
        ethers.utils.formatBytes32String("The Greatness 2"),
        parseUnits("200", AROMA_DECIMALS_DIGIT),
        tokens.map((t) => {
          return { id: t.id, percentage: t.percentage };
        }),
      ];
      await send(...payload);
    } catch (error) {
      enqueueSnackbar("Error", {
        variant: "error",
      });
    }
  };

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
