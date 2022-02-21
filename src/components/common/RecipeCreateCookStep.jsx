import {
  Alert,
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
import { useRecipeCreator } from "../../contexts/recipeCreator/recipeCreatorContext";
import { useCallback } from "react";
import ChefSilhouetteIcon from "../icons/ChefSilhouetteIcon";
import { theme } from "../../utils/theme";
import CurrencyInputField from "../form/CurrencyInputField";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useDialogState } from "../../hooks/state/useDialogState";
import ChefSelectorDialog from "../dialogs/ChefSelectorDialog";
import { bindDialog, bindDialogClick } from "../../utils/binders";
import { useRecipeCreate } from "../../hooks/recipe/useRecipeCreate";
import { ethers } from "ethers";
import { parseUnits } from "@ethersproject/units";
import { NETWORKS, TARGET_CHAIN } from "../../web3/constants";
import { useAromaApprove } from "../../hooks/aroma/useAromaApprove";
import { LoadingButton } from "@mui/lab";
import {
  SUCCESS,
  usePromiseTransactionSnackbarManager,
} from "../../hooks/snackbar/usePromiseTransactionSnackbarManager";
import { useAromaAllowance } from "../../hooks/aroma/useAromaAllowance";

/**
 * @returns {JSX.Element|null}
 * @constructor
 */
function RecipeCreateCookStep() {
  const spenderAddress = NETWORKS[TARGET_CHAIN].contractMaster;
  const [
    { tokens, chefId, name, stake },
    { setChefId, setName, setStake, confirmRecipeCorrectness, nextStep },
  ] = useRecipeCreator();
  const [, bnAllowance] = useAromaAllowance();

  const chefSelectorDialogState = useDialogState({
    dialogId: "chefSelectorDialog",
  });

  const handleChefSelect = (id) => {
    setChefId(id);
    chefSelectorDialogState.handleClose();
  };

  /**
   * Defines Aroma Approval State
   */
  const [sendAromaApproval, aromaApprovalState] = useAromaApprove();
  const [
    [aromaApprovalTransactionInProgress],
    [aromaApprovalPendingSignature],
  ] = usePromiseTransactionSnackbarManager(aromaApprovalState);

  /**
   * Defines Recipe Create State
   */
  const [sendRecipeCreate, recipeCreateState] = useRecipeCreate();
  const [[recipeCreateTransactionInProgress], [recipeCreatePendingSignature]] =
    usePromiseTransactionSnackbarManager(
      recipeCreateState,
      useCallback((status) => {
        if (status === SUCCESS) nextStep();
        // @todo maybe we should have wrap the next functions in useCallback instead?
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [])
    );

  /**
   * Handles AROMA Approval blockchain transaction
   */
  const handleApprove = async () => {
    await sendAromaApproval(spenderAddress, parseUnits(stake.toString()));
  };

  /**
   * Handles Recipe Create blockchain transaction
   */
  const handleCreate = async () => {
    if(! confirmRecipeCorrectness()) {
      return;
    }

    await sendRecipeCreate(
      chefId,
      name && ethers.utils.formatBytes32String(name),
      stake && parseUnits(stake.toString()),
      tokens.map((t) => {
        return { id: t.id, percentage: t.percentage };
      })
    );
  };

  /**
   * @returns {boolean}
   */
  const transactionInProgress = () =>
    aromaApprovalTransactionInProgress ||
    aromaApprovalPendingSignature ||
    recipeCreateTransactionInProgress ||
    recipeCreatePendingSignature;

  /**
   * @returns {boolean|undefined}
   */
  const haveAllowance = () => {
    if (stake === "") return;
    const bnStake = parseUnits(parseFloat(stake).toString());
    return bnStake && bnAllowance?.gte(bnStake);
  };

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
                    inversecolor="inverse"
                    sx={{
                      position: "absolute",
                      right: theme.spacing(-0.7),
                      top: theme.spacing(-0.7),
                    }}
                    {...bindDialogClick(chefSelectorDialogState)}
                    disabled={transactionInProgress()}
                  >
                    <AddCircleIcon fontSize="small" />
                  </IconButton>
                  <ChefSelectorDialog
                    maxWidth="xs"
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
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  disabled={transactionInProgress()}
                />
              </FormControl>
              <CurrencyInputField
                required
                id="stake-aroma"
                currency="AROMA"
                label="Stake amount*"
                onUserInput={(e) => setStake(e.target.value)}
                value={stake}
                disabled={transactionInProgress()}
              />
              <Typography variant="caption">
                *A minimum of 200 AROMA must be staked.
              </Typography>
            </Stack>
          </CardContent>
          {haveAllowance() === false && (
            <CardContent>
              <Alert
                severity="error"
                sx={{
                  justifyContent: "center",
                }}
              >
                Please approve exactly or more than the staked AROMA.
              </Alert>
            </CardContent>
          )}
          <CardActions>
            <LoadingButton
              fullWidth
              bg="yellowContained"
              size="large"
              loading={transactionInProgress()}
              onClick={handleApprove}
              disabled={stake === ""}
            >
              Approve AROMA
            </LoadingButton>
            <LoadingButton
              fullWidth
              bg="yellowContainedSmall"
              size="large"
              loading={transactionInProgress()}
              onClick={handleCreate}
              disabled={!haveAllowance()}
            >
              Cook
            </LoadingButton>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
}

export default RecipeCreateCookStep;
