import { Grid, ToggleButton } from "@mui/material";
import GradualStepperInputField from "../form/GradualStepperInputField";
import { theme } from "../../utils/theme";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { useRecipeCreator } from "../../contexts/recipeCreator/recipeCreatorContext";

/**
 * @returns {JSX.Element|null}
 * @constructor
 */
function RecipeCreateCoinPairController({ token }) {
  const [
    { maxTokenPercentage, minTokenPercentage, adjustmentPercentage },
    { replaceToken, switchTokenLock },
  ] = useRecipeCreator();

  return (
    <Grid container spacing={1} alignItems="center">
      <Grid item xs>
        <GradualStepperInputField
          setValue={(percentage) => {
            replaceToken(
              {
                ...token,
                percentage: percentage,
              },
              token
            );
          }}
          value={token.percentage}
          valueSuffix="%"
          adjustment={adjustmentPercentage}
          minValue={minTokenPercentage}
          maxValue={maxTokenPercentage}
        />
      </Grid>
      <Grid item xs="auto">
        <ToggleButton
          size="xsmall"
          shape="squarish"
          value=""
          selected={token.locked}
          onChange={() => {
            switchTokenLock(token);
          }}
          sx={{
            border: `${theme.spacing(0.25)} solid ${theme.palette.grey.A200}`,
            backgroundColor: theme.palette.grey.A100,
          }}
        >
          {token.locked ? (
            <LockIcon fontSize="xsmall" />
          ) : (
            <LockOpenIcon fontSize="xsmall" />
          )}
        </ToggleButton>
      </Grid>
    </Grid>
  );
}

export default RecipeCreateCoinPairController;
