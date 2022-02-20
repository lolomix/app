import Grid from "@mui/material/Grid";
import { Box, Card, Container } from "@mui/material";
import RecipeCreateStepper from "../../components/common/RecipeCreateStepper";
import TokenSelectorDialog from "../../components/dialogs/TokenSelectorDialog";
import { useDialogState } from "../../hooks/state/useDialogState";
import { bindDialog } from "../../utils/binders";
import RecipeCreateSelectTokensStep from "../../components/common/RecipeCreateSelectTokensStep";
import { useRecipeCreator } from "../../contexts/recipeCreator/recipeCreatorContext";
import Layout from "../../components/layout/Layout";
import RecipeCreateReviewStep from "../../components/common/RecipeCreateReviewStep";
import RecipeCreateFinishStep from "../../components/common/RecipeCreateFinishStep";
import RecipeCreateCookStep from "../../components/common/RecipeCreateCookStep";
import { RecipeCreatorProvider } from "../../contexts/recipeCreator/recipeCreatorProvider";
import { useEffect } from "react";
import { useSnackbar } from "notistack";

/**
 * @returns {JSX.Element}
 * @constructor
 */
function RecipeCreatorContainer() {
  const tokenSelectorDialogState = useDialogState({
    dialogId: "tokenSelectorDialog",
  });

  const { enqueueSnackbar } = useSnackbar();
  const [{ activeStep, errors }] = useRecipeCreator();

  useEffect(() => {
    errors?.forEach((error) => {
      enqueueSnackbar(error, {
        variant: "error",
      });
    });
  }, [errors, enqueueSnackbar]);

  let recipeStepContainer;

  switch (activeStep) {
    case 0:
    default:
      recipeStepContainer = (
        <RecipeCreateSelectTokensStep
          tokenSelectorDialogState={tokenSelectorDialogState}
        />
      );
      break;
    case 1:
      recipeStepContainer = (
        <RecipeCreateReviewStep
          tokenSelectorDialogState={tokenSelectorDialogState}
        />
      );
      break;
    case 2:
      recipeStepContainer = <RecipeCreateCookStep />;
      break;
    case 3:
      recipeStepContainer = <RecipeCreateFinishStep />;
      break;
  }

  return (
    <>
      <Grid mb={4} mt={{xs: 6, sm: 0}} container justifyContent="center" alignItems="center">
        <Grid item xs sm={10} md={8} textAlign="center">
          <Card>
            {/* Box used as CardContent adds an annoying padding  */}
            <Box p={2}>
              <RecipeCreateStepper />
            </Box>
          </Card>
        </Grid>
      </Grid>
      {recipeStepContainer}
      <TokenSelectorDialog
        fullWidth
        maxWidth="xs"
        handleClose={tokenSelectorDialogState.handleClose}
        {...bindDialog(tokenSelectorDialogState)}
      />
    </>
  );
}

/**
 * @returns {JSX.Element}
 * @constructor
 */
function KitchenRecipeCreate() {
  return (
    <Layout helmetTitle="Kitchen - Create Recipe" buttonType="back">
      <Container as="section">
        <RecipeCreatorProvider>
          <RecipeCreatorContainer />
        </RecipeCreatorProvider>
      </Container>
    </Layout>
  );
}

export default KitchenRecipeCreate;
