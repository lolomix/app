import { useReducer } from 'react'
import { recipeCreatorReducer } from './recipeCreatorReducer'
import { RecipeCreatorContext } from './recipeCreatorContext'

/**
 * @param children
 * @returns {JSX.Element}
 * @constructor
 *
 * @todo refactor and organize initialState better, maybe default values don't belong to the state
 */
export function RecipeCreatorProvider({ children }) {
  let initialState = {
    totalPercentage: 100,
    maxSelection: 20,
    minSelection: 3,
    adjustmentPercentage: 5,
    steps: ["Choose Ingredients", "Review & Adjust", "Cook Recipe", "Tasting"],
    startStep: 0,
    tokens: [],
    error: {},
  };

  initialState = {
    ...initialState,
    minTokenPercentage:
      initialState.totalPercentage / initialState.maxSelection,
    activeStep: initialState.startStep,
    totalSteps: initialState.steps.length,
    lastStep: initialState.steps.length - 1,
  };

  initialState = {
    ...initialState,
    maxTokenPercentage:
      initialState.totalPercentage -
      initialState.minTokenPercentage * initialState.minSelection +
      initialState.minTokenPercentage,
  };

  const [state, dispatch] = useReducer(recipeCreatorReducer, initialState);

  return (
    <RecipeCreatorContext.Provider value={[state, dispatch]}>
      {children}
    </RecipeCreatorContext.Provider>
  );
}