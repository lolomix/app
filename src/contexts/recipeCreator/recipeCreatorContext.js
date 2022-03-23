import { createContext, useContext } from "react";

export const SWITCH_TOKEN_LOCK = "recipe/SWITCH_TOKEN_LOCK";
export const ADD_TOKEN = "recipe/ADD_TOKEN";
export const REMOVE_TOKEN = "recipe/REMOVE_TOKEN";
export const REPLACE_TOKEN = "recipe/REPLACE_TOKEN";
export const NEXT_STEP = "recipe/NEXT_STEP";
export const PREV_STEP = "recipe/PREV_STEP";
export const RESET = "recipe/RESET";
export const SET_CHEFID = "recipe/SET_CHEFID";
export const SET_STAKE = "recipe/SET_STAKE";
export const SET_NAME = "recipe/SET_NAME";
export const REPORT_ERRORS = "errors/REPORT_ERRORS";

/**
 * @type {React.Context<unknown>}
 */
export const RecipeCreatorContext = createContext();

/**
 * @returns {[*, {addToken: (function(t): *), removeToken: (function(t): *), prevStep: (function(): *), nextStep: (function(): *), reset: (function(): *), replaceToken: (function(t,r): *), switchTokenLock: (function(t): *), confirmTokenSelection: (function(): *), confirmRecipeCorrectness: (function(): *), setName: (function(): *), setStake: (function(): *), setChefId: (function(int): *)}]}
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
      `A recipe cannot contain more than ${state.maxSelection} tokens.`,
    ],
    ifLessThanOrEqualMaxTokensSelected: [
      () => state.tokens.length <= state.maxSelection,
      `A recipe cannot contain more than ${state.maxSelection} tokens.`,
    ],
    ifMinTokensSelected: [
      () => state.tokens.length >= state.minSelection,
      `A recipe must contain at least ${state.minSelection} tokens.`,
    ],
    ifMoreThanMinTokensSelected: [
      () => state.tokens.length > state.minSelection,
      `A recipe must contain at least ${state.minSelection} tokens.`,
    ],
    ifChefIdSetAndValid: [
      () =>
        state.chefId !== undefined &&
        state.chefId > 0 &&
        Number.isInteger(state.chefId),
      `A recipe must be created by a CHEF with at least one empty poach.`,
    ],
    ifNameLessOrEqualToMaxNameLength: [
      () => state.name.length <= state.maxNameLength,
      `The name of a recipe cannot be more than ${state.maxNameLength} characters.`,
    ],
    ifNameSet: [
      () => state.name && state.name !== "",
      `A recipe must have a unique name.`,
    ],
    ifStakeMoreOrEqualMinimumStake: [
      () => state.stake >= state.minimumStake,
      `A recipe must have at least ${state.minimumStake} AROMAs staked.`,
    ],
  };

  /**
   * @param {array} conditions
   * @param {*|undefined} value
   */
  const validateConditions = (conditions, value = undefined) => {
    let errors = [];

    conditions.forEach((condition) => {
      const [validate, message] = validationConditions[condition];

      if (!validate(value)) {
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
    if (!validateConditions(["ifLessThanMaxTokensSelected"])) return;

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
      !validateConditions(["ifMoreThanMinTokensSelected"])
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
    return validateConditions(["ifMinTokensSelected"]);
  };

  /**
   * @todo is it a good practice returning anything from here
   *
   * @returns {boolean}
   */
  const confirmRecipeCorrectness = () => {
    return validateConditions([
      "ifMinTokensSelected",
      "ifLessThanOrEqualMaxTokensSelected",
      "ifChefIdSetAndValid",
      "ifNameSet",
      "ifNameLessOrEqualToMaxNameLength",
      "ifStakeMoreOrEqualMinimumStake",
    ]);
  };

  /**
   * @todo we should check for recipeId availability
   */
  const nextStep = () => {
    if (!validateConditions(["ifMinTokensSelected"])) return;

    dispatch([NEXT_STEP]);
  };

  const prevStep = () => {
    dispatch([PREV_STEP]);
  };

  const reset = () => {
    dispatch([RESET]);
  };

  const setStake = (stake) => {
    const parsedStake = isNaN(parseInt(stake)) ? "" : parseInt(stake);

    dispatch([SET_STAKE, { stake: parsedStake }]);
  };

  const setChefId = (chefId) => {
    dispatch([SET_CHEFID, { chefId }]);
  };

  const setName = (name) => {
    dispatch([SET_NAME, { name }]);
  };

  return [
    state,
    {
      addToken,
      removeToken,
      replaceToken,
      switchTokenLock,
      confirmTokenSelection,
      confirmRecipeCorrectness,
      nextStep,
      prevStep,
      reset,
      setStake,
      setChefId,
      setName,
    },
  ];
}

export { useRecipeCreator };
