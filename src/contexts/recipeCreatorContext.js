import { createContext, useContext, useReducer } from "react";

const SWITCH_TOKEN_LOCK = "recipe/SWITCH_TOKEN_LOCK";
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
 *
 * @todo REFACTOR AND ADD TESTS AS THIS IS HORRIBLE
 */
function recipeCreatorReducer(state, [type, payload]) {
  const recalculateTokenPercentage = (suppliedTokens) => {
    let minNumberOfTokens = state.minSelection;
    let maxNumberOfTokens = state.maxSelection;
    let numberOfTokens = suppliedTokens.length;

    if (
      numberOfTokens < minNumberOfTokens ||
      numberOfTokens > maxNumberOfTokens
    ) {
      return suppliedTokens;
    }

    let percentageToAimFor = state.totalPercentage;
    let minimalCorrectionPerToken = state.adjustmentPercentage;

    let minPercentageAmountPerToken = state.minTokenPercentage
    let maxPercentageAmountPerToken =
      percentageToAimFor -
      (numberOfTokens * minPercentageAmountPerToken -
        minPercentageAmountPerToken);

    console.log("maxPercentageAmountPerToken: " + maxPercentageAmountPerToken);
    console.log("minPercentageAmountPerToken: " + minPercentageAmountPerToken);

    console.log(
      "before correction of min/max percentages: ",
      JSON.parse(JSON.stringify(suppliedTokens))
    );
    let tokens = suppliedTokens.map((suppliedToken) => {
      console.log(
        "percentage less than " + minPercentageAmountPerToken,
        suppliedToken.percentage < minPercentageAmountPerToken
      );
      if (suppliedToken.percentage < minPercentageAmountPerToken) {
        return { ...suppliedToken, percentage: minPercentageAmountPerToken };
      }

      if (suppliedToken.percentage > maxPercentageAmountPerToken) {
        return { ...suppliedToken, percentage: maxPercentageAmountPerToken };
      }

      return suppliedToken;
    });
    console.log(
      "after correction of min/max percentages: ",
      JSON.parse(JSON.stringify(tokens))
    );

    let summedPercentages = tokens.reduce((prev, token) => {
      return prev + token.percentage;
    }, 0);
    console.log("summedPercentages: ", summedPercentages);

    if (summedPercentages === 100) {
      return tokens;
    }

    let percentageToCorrect = 100 - summedPercentages;
    console.log("percentageToCorrect: ", percentageToCorrect);

    let isSubtraction = percentageToCorrect < 0;
    console.log("isSubtraction: ", isSubtraction);

    let correctableTokens = tokens.filter(
      (token) => !token.locked && !token.current
    );

    console.log(
      "before main correction: ",
      JSON.parse(JSON.stringify(correctableTokens))
    );
    let correctedTokens = [];
    let index = 0;
    let iteration = 0;
    while (percentageToCorrect !== 0 && correctableTokens.length) {
      if (index > correctableTokens.length - 1) {
        index = 0;
      }

      if (
        isSubtraction &&
        correctableTokens[index].percentage > minPercentageAmountPerToken
      ) {
        correctableTokens[index].percentage -= minimalCorrectionPerToken;
        percentageToCorrect += minimalCorrectionPerToken;
      } else if (
        !isSubtraction &&
        correctableTokens[index].percentage < maxPercentageAmountPerToken
      ) {
        correctableTokens[index].percentage += minimalCorrectionPerToken;
        percentageToCorrect -= minimalCorrectionPerToken;
      } else {
        correctedTokens[index] = correctableTokens[index];
        correctableTokens.splice(index, 1);
      }

      index++;
      iteration++;

      console.log(
        "during main correction: ",
        JSON.parse(JSON.stringify(correctableTokens))
      );

      console.log("percentage left to correct: ", percentageToCorrect);
      if (iteration > numberOfTokens * minimalCorrectionPerToken) {
        throw Error("Careful with this");
      }
    }

    console.log(
      "after main correction: ",
      JSON.parse(JSON.stringify(correctableTokens))
    );

    if (percentageToCorrect !== 0) {
      console.log("current token must be corrected to have 100");
      let currentToken = tokens.find((token) => token.current);
      console.log(currentToken);
      currentToken &&
        correctedTokens.push({
          ...currentToken,
          percentage:
            percentageToCorrect > 0
              ? currentToken.percentage + Math.abs(percentageToCorrect)
              : currentToken.percentage - Math.abs(percentageToCorrect),
        });
    }

    return tokens.map((token) => {
      let tokenToCorrect = correctedTokens.find(
        (findToken) => findToken.id === token.id
      );
      if (!tokenToCorrect) {
        return token;
      }

      return { ...token, percentage: tokenToCorrect.percentage };
    });
  };

  switch (type) {
    case ADD_TOKEN:
      if (
        state.tokens.findIndex((token) => token.id === payload.token.id) !== -1
      ) {
        return state;
      }

      return {
        ...state,
        tokens: recalculateTokenPercentage([...state.tokens, payload.token]),
      };
    case REMOVE_TOKEN:
      // recalculate percentage
      return {
        ...state,
        tokens: recalculateTokenPercentage(
          state.tokens.filter(
            (currentToken) => currentToken.id !== payload.token.id
          )
        ),
      };
    case REPLACE_TOKEN:
      // recalculate percentage
      return {
        ...state,
        tokens: recalculateTokenPercentage(
          state.tokens.map((currentToken) => {
            if (currentToken.id === payload.replace.id) {
              return { ...payload.token, current: true };
            }
            return currentToken;
          })
        ).map((currentToken) => ({ ...currentToken, current: false })),
      };
    case SWITCH_TOKEN_LOCK:
      return {
        ...state,
        tokens: state.tokens.map((currentToken) => {
          if (currentToken.id === payload.token.id) {
            return { ...payload.token, locked: !currentToken.locked };
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
 *
 * @todo refactor and organize initialState better, maybe default values don't belong to the state
 */
function RecipeCreatorProvider({ children }) {
  let initialState = {
    totalPercentage: 100,
    maxSelection: 20,
    minSelection: 3,
    adjustmentPercentage: 5,
    steps: ["Choose ingredients", "Review", "Cook recipe"],
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
   * @throws Error
   */
  const validateConditions = (...conditions) => {
    conditions.forEach((condition) => {
      const [validate, message] = validationConditions[condition];

      if (!validate()) {
        throw new Error(message);
      }
    });
  };

  /**
   * @param token
   * @throws Error
   */
  const addToken = (token) => {
    validateConditions("ifLessThanMaxTokensSelected");

    dispatch([ADD_TOKEN, { token }]);
  };

  /**
   * @param token
   * @throws Error
   *
   * @todo remove hard-coded activeStep id
   */
  const removeToken = (token) => {
    if (state.activeStep !== 0) {
      validateConditions("ifMoreThanMinTokensSelected");
    }

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
   * @throws Error
   */
  const confirmTokenSelection = () => {
    validateConditions("ifMinTokensSelected");
  };

  /**
   * @throws Error
   */
  const nextStep = () => {
    validateConditions("ifMinTokensSelected");

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

export { RecipeCreatorProvider, useRecipeCreator };
