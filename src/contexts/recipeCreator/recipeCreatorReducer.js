import {
  ADD_TOKEN,
  NEXT_STEP,
  PREV_STEP,
  REMOVE_TOKEN,
  REPORT_ERRORS,
  REPLACE_TOKEN,
  RESET,
  SWITCH_TOKEN_LOCK,
  SET_CHEF, SET_STAKE, SET_NAME,
} from './recipeCreatorContext'

/**
 * @param state
 * @param action
 * @returns {(*&{tokens: *[]})|(*&{activeStep: number, tokens: *[]})|(*&{tokens})|(*&{activeStep: (number|number)})|(*&{activeStep: (number|*)})}
 *
 * @todo REFACTOR AND ADD TESTS AS THIS IS HORRIBLE
 */
export function recipeCreatorReducer(state, [type, payload]) {
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

    let minPercentageAmountPerToken = state.minTokenPercentage;
    let maxPercentageAmountPerToken =
      percentageToAimFor -
      (numberOfTokens * minPercentageAmountPerToken -
        minPercentageAmountPerToken);

    console.debug(
      "maxPercentageAmountPerToken: " + maxPercentageAmountPerToken
    );
    console.debug(
      "minPercentageAmountPerToken: " + minPercentageAmountPerToken
    );

    console.debug(
      "before correction of min/max percentages: ",
      JSON.parse(JSON.stringify(suppliedTokens))
    );
    let tokens = suppliedTokens.map((suppliedToken) => {
      console.debug(
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
    console.debug(
      "after correction of min/max percentages: ",
      JSON.parse(JSON.stringify(tokens))
    );

    let summedPercentages = tokens.reduce((prev, token) => {
      return prev + token.percentage;
    }, 0);
    console.debug("summedPercentages: ", summedPercentages);

    if (summedPercentages === 100) {
      return tokens;
    }

    let percentageToCorrect = 100 - summedPercentages;
    console.debug("percentageToCorrect: ", percentageToCorrect);

    let isSubtraction = percentageToCorrect < 0;
    console.debug("isSubtraction: ", isSubtraction);

    let correctableTokens = tokens.filter(
      (token) => !token.locked && !token.current
    );

    console.debug(
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

      console.debug(
        "during main correction: ",
        JSON.parse(JSON.stringify(correctableTokens))
      );

      console.debug("percentage left to correct: ", percentageToCorrect);
      if (iteration > numberOfTokens * (minimalCorrectionPerToken * 2)) {
        throw Error("Careful with this");
      }
    }

    console.debug(
      "after main correction: ",
      JSON.parse(JSON.stringify(correctableTokens))
    );

    if (percentageToCorrect !== 0) {
      console.debug("current token must be corrected to have 100");
      let currentToken = tokens.find((token) => token.current);
      console.debug(currentToken);
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
    case SET_CHEF:
      return {
        ...state,
        chefId: payload.chefId,
      };
    case SET_STAKE:
      return {
        ...state,
        stake: payload.stake,
      };
    case SET_NAME:
      return {
        ...state,
        name: payload.name,
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
    case REPORT_ERRORS:
      // @todo this might cause some errors since once we return the errors persist?
      return {
        ...state,
        errors: payload.errors,
      };
    default: {
      throw new Error(`Unsupported action type: ${type}`);
    }
  }
}
