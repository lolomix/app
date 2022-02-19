import { useReducer } from "react";
import { recipeCreatorReducer } from "./recipeCreatorReducer";
import { RecipeCreatorContext } from "./recipeCreatorContext";

/**
 * @param children
 * @returns {JSX.Element}
 * @constructor
 *
 * @todo refactor and organize initialState better, maybe default values don't belong to the state
 */
export function RecipeCreatorProvider({ children }) {
  let initialState = {
    maxNameLength: 16,
    recipePerChef: 3,
    totalPercentage: 100,
    maxSelection: 20,
    minSelection: 3,
    adjustmentPercentage: 5,
    minimumStake: 200,
    steps: ["Choose Ingredients", "Review & Adjust", "Cook Recipe", "Tasting"],
    startStep: 0,
    errors: [],
  };

  /**
   * Calculate Min Token Percentage, ActiveStep, TotalSteps and LastStep
   */
  initialState = {
    ...initialState,
    minTokenPercentage:
      initialState.totalPercentage / initialState.maxSelection,
    activeStep: initialState.startStep,
    totalSteps: initialState.steps.length,
    lastStep: initialState.steps.length - 1,
  };

  /**
   * Calculate Max Token Percentage
   */
  initialState = {
    ...initialState,
    maxTokenPercentage:
      initialState.totalPercentage -
      initialState.minTokenPercentage * initialState.minSelection +
      initialState.minTokenPercentage,
  };

  /**
   * Add Recipe Data
   */
  initialState = {
    ...initialState,
    name: "",
    stake: 0,
    chefId: 0,
    tokens: [],
  };

  const [state, dispatch] = useReducer(recipeCreatorReducer, initialState);

  return (
    <RecipeCreatorContext.Provider value={[state, dispatch]}>
      {children}
    </RecipeCreatorContext.Provider>
  );
}