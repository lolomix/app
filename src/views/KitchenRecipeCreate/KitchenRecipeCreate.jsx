import Grid from "@mui/material/Grid";
import { Box, Card, Container } from "@mui/material";
import RecipeCreateStepper from "../../components/common/RecipeCreateStepper";
import TokenSelectorDialog from "../../components/dialogs/TokenSelectorDialog";
import { useDialogState } from "../../hooks/useDialogState";
import { bindDialog } from "../../utils/binders";
import RecipeCreateSelectTokensStep from "../../components/common/RecipeCreateSelectTokensStep";
import {
  RecipeCreatorProvider,
  useRecipeCreator,
} from "../../contexts/recipeCreatorContext";
import Layout from "../../components/layout/Layout";
import RecipeCreateReviewStep from "../../components/common/RecipeCreateReviewStep";
import RecipeCreateFinishStep from "../../components/common/RecipeCreateFinishStep";
import RecipeCreateCookStep from "../../components/common/RecipeCreateCookStep";

/**
 * @returns {JSX.Element}
 * @constructor
 */
function RecipeCreatorContainer() {
  const tokenSelectorDialogState = useDialogState({
    dialogId: "tokenSelectorDialog",
  });

  const [{ activeStep }] = useRecipeCreator();

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
      <Grid mb={4} container justifyContent="center" alignItems="center">
        <Grid item xs sm={8} md={6} textAlign="center">
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
