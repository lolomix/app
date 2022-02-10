import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  FilledInput,
  FormControl,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { useRecipeCreator } from "../../contexts/recipeCreatorContext";
import Button from "@mui/material/Button";
import React, { useEffect, useState } from "react";
import ChefSilhouetteIcon from "../icons/ChefSilhouetteIcon";
import { theme } from "../../utils/theme";
import CurrencyInputField from "../form/CurrencyInputField";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useDialogState } from "../../hooks/useDialogState";
import ChefSelectorDialog from "../dialogs/ChefSelectorDialog";
import { bindDialog, bindDialogClick } from "../../utils/binders";
import { useRecipeCreate } from "../../hooks/useRecipeCreate";
import { useSnackbar } from "notistack";
import SnackbarAction from "../snackbars/SnackbarAction";
import { ethers } from "ethers";
import { parseUnits } from "@ethersproject/units";
import { AROMA_DECIMALS_DIGIT } from "../../web3/constants";

/**
 * Define the Recipe Creator Step of the Component
 *
 * @type {number}
 */
const RECIPE_CREATOR_STEP = 2;

/**
 * @returns {JSX.Element|null}
 * @constructor
 */
function RecipeCreateCookStep() {
  const [{ activeStep, tokens }, { nextStep }] = useRecipeCreator();

  const chefSelectorDialogState = useDialogState({
    dialogId: "chefSelectorDialog",
  });

  const [stakeAroma, setStakeAroma] = useState(200);
  const [recipeName, setRecipeName] = useState();
  const [chefId, setChefId] = useState();

  const handleRecipeNameUserInput = (e) => {
    setRecipeName(e.target.value);
  };

  const handleStakeAromaUserInput = (e) => {
    setStakeAroma(e.target.value);
  };

  const handleChefSelect = (id) => {
    setChefId(id);
    chefSelectorDialogState.handleClose();
  };

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
        chefId ?? 0,
        recipeName && ethers.utils.formatBytes32String(recipeName),
        stakeAroma && parseUnits(stakeAroma.toString(), AROMA_DECIMALS_DIGIT),
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
      <Grid item xs={12} sm={10} md={4}>
        <Card>
          <CardHeader
            title={
              <Typography color="secondary" variant="h5" textAlign="center">
                My Recipe
              </Typography>
            }
          />
          <CardContent>
            <Stack spacing={2} alignItems="center">
              <Box>
                <Box
                  position="relative"
                  bgcolor="grey.A100"
                  borderRadius={`${theme.shape.borderRadius}px`}
                  textAlign="center"
                  px={2}
                  py={3}
                >
                  <ChefSilhouetteIcon sx={{ fontSize: "6rem" }} />
                  <IconButton
                    size="xsmall"
                    variant="contained"
                    color="success"
                    inverseColor
                    sx={{
                      position: "absolute",
                      right: theme.spacing(-0.7),
                      top: theme.spacing(-0.7),
                    }}
                    {...bindDialogClick(chefSelectorDialogState)}
                  >
                    <AddCircleIcon fontSize="small" />
                  </IconButton>
                  <ChefSelectorDialog
                    handleClose={chefSelectorDialogState.handleClose}
                    handleSelect={handleChefSelect}
                    {...bindDialog(chefSelectorDialogState)}
                  />
                </Box>
                {chefId && (
                  <Typography variant="subtitle2" textAlign="center">
                    CHEF #{chefId}
                  </Typography>
                )}
              </Box>
              <FormControl variant="outlined" fullWidth required>
                <Typography variant="subtitle2" pb={1}>
                  Recipe name
                </Typography>
                <FilledInput
                  disableUnderline
                  hiddenLabel
                  id="recipe-name"
                  onChange={handleRecipeNameUserInput}
                  value={recipeName}
                />
              </FormControl>
              <CurrencyInputField
                required
                id="stake-aroma"
                currency="AROMA"
                label="Stake amount*"
                onUserInput={handleStakeAromaUserInput}
                value={stakeAroma}
              />
              <Typography variant="caption">
                *A minimum of 200 Aroma must be staked.
              </Typography>
            </Stack>
          </CardContent>
          <CardActions>
            <Button
              fullWidth
              variant="yellowContainedSmall"
              size="large"
              onClick={handleCreate}
            >
              Cook
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
}

export default RecipeCreateCookStep;
