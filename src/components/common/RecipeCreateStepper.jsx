// material-ui
import { Step, StepLabel, Stepper } from "@mui/material";
import { useRecipeCreator } from "../../contexts/recipeCreatorContext";

/**
 * @returns {JSX.Element}
 * @constructor
 */
function RecipeCreateStepper() {
  const [{ steps, activeStep }] = useRecipeCreator();

  return (
    <Stepper activeStep={activeStep}>
      {steps.map((label) => {
        return (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        );
      })}
    </Stepper>
  );
}

export default RecipeCreateStepper;
