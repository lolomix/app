import { Grid, ToggleButton, Tooltip } from "@mui/material";
import GradualStepperInputField from "../form/GradualStepperInputField";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { useRecipeCreator } from "../../contexts/recipeCreator/recipeCreatorContext";

/**
 *
 * @param token
 * @returns {JSX.Element}
 * @constructor
 */
function RecipeCreateCoinPairController({ token }) {
  const [
    { maxTokenPercentage, minTokenPercentage, adjustmentPercentage },
    { replaceToken, switchTokenLock },
  ] = useRecipeCreator();

  return (
    <Grid container spacing={1} alignItems="center">
      <Grid item xs minWidth="85px">
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
          variant="outlined"
          size="xsmall"
          shape="squarish"
          color="info"
          value=""
          selected={token.locked}
          onChange={() => {
            switchTokenLock(token);
          }}
        >
          <Tooltip
            title={`${token.locked ? "Unlock" : "Lock"} token percentage`}
          >
            {token.locked ? (
              <LockIcon fontSize="xsmall" />
            ) : (
              <LockOpenIcon fontSize="xsmall" />
            )}
          </Tooltip>
        </ToggleButton>
      </Grid>
    </Grid>
  );
}

export default RecipeCreateCoinPairController;
