import { withTranslation } from "react-i18next";
import { Button, Step, StepLabel, Stepper } from '@mui/material'
import { useState } from 'react'
// material-ui

const steps = ['Choose ingredients', 'Review', 'Cook recipe'];

/**
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
function RecipeCreateStepper (props) {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => (prevActiveStep <= 0) ? prevActiveStep : prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <>
      <Stepper activeStep={activeStep}>
        {steps.map((label) => {
          const stepProps = {};
          const labelProps = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <Button onClick={handleNext}>Next</Button>
      <Button onClick={handleBack}>Back</Button>
      <Button onClick={handleReset}>Reset</Button>
    </>
  )
}

export default withTranslation()(RecipeCreateStepper)