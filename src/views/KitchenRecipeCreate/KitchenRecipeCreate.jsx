import Grid from "@mui/material/Grid";
import { Box, Card, Container } from "@mui/material";
import RecipeCreateStepper from "../../components/common/RecipeCreateStepper";
import TokenSelectorDialog from "../../components/dialogs/TokenSelectorDialog";
import { useDialogState } from "../../hooks/useDialogState";
import { bindDialog } from "../../utils/binders";
import RecipeCreateSelectTokensStep from "../../components/common/RecipeCreateSelectTokensStep";
import { RecipeCreatorProvider } from "../../contexts/recipeCreatorContext";
import Layout from "../../components/layout/Layout";
import RecipeCreateReviewStep from "../../components/common/RecipeCreateReviewStep";
import RecipeCreateFinishStep from "../../components/common/RecipeCreateFinishStep";
import RecipeCreateCookStep from '../../components/common/RecipeCreateCookStep'

/**
 * @returns {JSX.Element}
 * @constructor
 */
function KitchenRecipeCreate() {
  const tokenSelectorDialogState = useDialogState({
    dialogId: "tokenSelectorDialog",
  });

  return (
    <Layout helmetTitle="Kitchen - Create Recipe">
      <Container as="section">
        <RecipeCreatorProvider>
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
          {/* @todo: add the rest of the steps */}
          <RecipeCreateSelectTokensStep
            tokenSelectorDialogState={tokenSelectorDialogState}
          />
          <RecipeCreateReviewStep
            tokenSelectorDialogState={tokenSelectorDialogState}
          />
          <RecipeCreateCookStep />
          <RecipeCreateFinishStep />
          <TokenSelectorDialog
            fullWidth
            maxWidth="xs"
            handleClose={tokenSelectorDialogState.handleClose}
            {...bindDialog(tokenSelectorDialogState)}
          />
        </RecipeCreatorProvider>
      </Container>
    </Layout>
  );
}

export default KitchenRecipeCreate;
