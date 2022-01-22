import { useState } from "react";

/**
 * @param options
 * @returns {{handleReset: handleReset, handleBack: handleBack, activeStep: (*|number), id: string, steps: *, handleNext: handleNext}}
 */
export function useStepperState(options) {
  const startStep = options.startStep ?? 0;
  const totalSteps = options.steps.length;
  const lastStep = totalSteps - 1;

  const [activeStep, setActiveStep] = useState(startStep);

  const handleNext = () => {
    setActiveStep((prevActiveStep) =>
      prevActiveStep >= lastStep ? lastStep : prevActiveStep + 1
    );
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) =>
      prevActiveStep <= 0 ? prevActiveStep : prevActiveStep - 1
    );
  };

  const handleReset = () => {
    setActiveStep(startStep);
  };

  return {
    id: options?.stepperId,
    steps: options?.steps,
    activeStep,
    handleNext,
    handleBack,
    handleReset,
  };
}
