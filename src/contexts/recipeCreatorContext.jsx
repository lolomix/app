import { createContext, useContext, useReducer } from "react";

const ADD_TOKEN = "recipe/ADD_TOKEN";
const REMOVE_TOKEN = "recipe/REMOVE_TOKEN";
const REPLACE_TOKEN = "recipe/REPLACE_TOKEN";
const NEXT_STEP = "recipe/NEXT_STEP";
const PREV_STEP = "recipe/PREV_STEP";
const RESET = "recipe/RESET";

/**
 * @type {React.Context<unknown>}
 */
const RecipeCreatorContext = createContext();

/**
 * @param state
 * @param action
 * @returns {(*&{tokens: *[]})|(*&{activeStep: number, tokens: *[]})|(*&{tokens})|(*&{activeStep: (number|number)})|(*&{activeStep: (number|*)})}
 */
function recipeCreatorReducer(state, [type, payload]) {
  switch (type) {
    case ADD_TOKEN:
      return {
        ...state,
        tokens: [...state.tokens, payload.token].filter(
          (currentToken, index, arr) =>
            arr.findIndex((findToken) => currentToken.id === findToken.id) ===
            index
        ),
      };
    case REMOVE_TOKEN:
      return {
        ...state,
        tokens: state.tokens.filter(
          (currentToken) => currentToken.id !== payload.token.id
        ),
      };
    case REPLACE_TOKEN:
      return {
        ...state,
        tokens: state.tokens.map((currentToken) => {
          if (currentToken.id === payload.replace.id) {
            return payload.token;
          }
          return currentToken;
        }),
      };
    case NEXT_STEP:
      return {
        ...state,
        activeStep:
          state.activeStep >= state.lastStep
            ? state.lastStep
            : state.activeStep + 1,
      };
    case PREV_STEP:
      return {
        ...state,
        activeStep: state.activeStep <= 0 ? 0 : state.activeStep - 1,
      };
    case RESET:
      return {
        ...state,
        tokens: [],
        activeStep: state.startStep,
      };
    default: {
      throw new Error(`Unsupported action type: ${type}`);
    }
  }
}

/**
 * @param children
 * @returns {JSX.Element}
 * @constructor
 */
function RecipeCreatorProvider({ children }) {
  let initialState = {
    steps: ["Choose ingredients", "Review", "Cook recipe"],
    startStep: 0,
    tokens: [],
    error: {},
  };

  initialState = {
    ...initialState,
    activeStep: initialState.startStep,
    totalSteps: initialState.steps.length,
    lastStep: initialState.steps.length - 1,
  };

  const [state, dispatch] = useReducer(recipeCreatorReducer, initialState);

  return (
    <RecipeCreatorContext.Provider value={[state, dispatch]}>
      {children}
    </RecipeCreatorContext.Provider>
  );
}

/**
 * @param maxSelection
 * @param minSelection
 * @returns {(*|addToken|removeToken|replaceToken|(function(): *))[]}
 *
 * @todo this is a wrong place for maxSelection and minSelection - refactor
 */
function useRecipeCreator(maxSelection = 3, minSelection = 3) {
  const context = useContext(RecipeCreatorContext);
  if (context === undefined) {
    throw new Error(
      "useRecipeCreator must be used within a RecipeCreatorProvider"
    );
  }

  const [state, dispatch] = context;

  const addToken = (token) => {
    if (state.tokens.length >= maxSelection) {
      throw new Error(
        `The maximum allowed tokens to select is ${maxSelection}`
      );
    }

    dispatch([ADD_TOKEN, { token }]);
  };

  const removeToken = (token) => {
    dispatch([REMOVE_TOKEN, { token }]);
  };

  const replaceToken = (token, replace) => {
    dispatch([REPLACE_TOKEN, { token, replace }]);
  };

  const nextStep = () => dispatch([NEXT_STEP]);
  const prevStep = () => dispatch([PREV_STEP]);
  const reset = () => dispatch([RESET]);

  return [
    state,
    addToken,
    removeToken,
    replaceToken,
    nextStep,
    prevStep,
    reset,
  ];
}

export { RecipeCreatorProvider, useRecipeCreator };
