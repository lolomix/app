import { createContext, useContext } from "react";

export const SWITCH_TOKEN_LOCK = "recipe/SWITCH_TOKEN_LOCK";
export const ADD_TOKEN = "recipe/ADD_TOKEN";
export const REMOVE_TOKEN = "recipe/REMOVE_TOKEN";
export const REPLACE_TOKEN = "recipe/REPLACE_TOKEN";
export const NEXT_STEP = "recipe/NEXT_STEP";
export const PREV_STEP = "recipe/PREV_STEP";
export const RESET = "recipe/RESET";
export const SET_CHEF = "recipe/SET_CHEF";
export const SET_STAKE = "recipe/SET_STAKE";
export const SET_NAME = "recipe/SET_NAME";
export const REPORT_ERRORS = "errors/REPORT_ERRORS";

/**
 * @type {React.Context<unknown>}
 */
export const RecipeCreatorContext = createContext();

/**
 * @returns {[*, {addToken: (function(t): *), removeToken: (function(t): *), prevStep: (function(): *), nextStep: (function(): *), reset: (function(): *), replaceToken: (function(t,r): *), switchTokenLock: (function(t): *), confirmTokenSelection: (function(): *)}]}
 */
function useRecipeCreator() {
  const context = useContext(RecipeCreatorContext);

  if (context === undefined) {
    throw new Error(
      "useRecipeCreator must be used within a RecipeCreatorProvider"
    );
  }

  const [state, dispatch] = context;

  const tokenDefaults = {
    percentage: state.minTokenPercentage,
  };

  const validationConditions = {
    ifLessThanMaxTokensSelected: [
      () => state.tokens.length < state.maxSelection,
      `You cannot select more than ${state.maxSelection} tokens.`,
    ],
    ifMinTokensSelected: [
      () => state.tokens.length >= state.minSelection,
      `You must select at least ${state.minSelection} tokens.`,
    ],
    ifMoreThanMinTokensSelected: [
      () => state.tokens.length > state.minSelection,
      `You must have at least ${state.minSelection} tokens in the selection.`,
    ],
  };

  /**
   * @param conditions
   */
  const validateConditions = (...conditions) => {
    let errors = [];

    conditions.forEach((condition) => {
      const [validate, message] = validationConditions[condition];

      if (!validate()) {
        errors.push(message);
      }
    });

    dispatch([REPORT_ERRORS, { errors: errors }]);

    return !errors.length;
  };

  /**
   * @param token
   */
  const addToken = (token) => {
    if (!validateConditions("ifLessThanMaxTokensSelected")) return;

    dispatch([ADD_TOKEN, { token: { ...tokenDefaults, ...token } }]);
  };

  /**
   * @param token
   *
   * @todo remove hard-coded activeStep id
   */
  const removeToken = (token) => {
    if (
      state.activeStep !== 0 &&
      !validateConditions("ifMoreThanMinTokensSelected")
    )
      return;

    dispatch([REMOVE_TOKEN, { token }]);
  };

  /**
   * @param token
   * @param replace
   */
  const replaceToken = (token, replace) => {
    dispatch([REPLACE_TOKEN, { token, replace }]);
  };

  /**
   * @param token
   */
  const switchTokenLock = (token) => {
    dispatch([SWITCH_TOKEN_LOCK, { token }]);
  };

  /**
   * @todo is it a good practice returning anything from here
   *
   * @returns {boolean}
   */
  const confirmTokenSelection = () => {
    return validateConditions("ifMinTokensSelected");
  };

  /**
   * @todo we should check for recipeId availability
   */
  const nextStep = () => {
    if (!validateConditions("ifMinTokensSelected")) return;

    dispatch([NEXT_STEP]);
  };

  const prevStep = () => {
    dispatch([PREV_STEP]);
  };

  const reset = () => {
    dispatch([RESET]);
  };

  return [
    state,
    {
      addToken,
      removeToken,
      replaceToken,
      switchTokenLock,
      confirmTokenSelection,
      nextStep,
      prevStep,
      reset,
    },
  ];
}

export { useRecipeCreator };
