import { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  Typography,
} from "@mui/material";
import SearchInputField from "../form/SearchInputField";
import { useRecipeCreator } from "../../contexts/recipeCreator/recipeCreatorContext";
import DialogTitleWithCloseButton from "./DialogTitleWithCloseButton";
import SearchResultList from "../form/SearchResultList";
import HorizontalChipList from "../form/HorizontalChipList";
import { useRecipeCoinPairs } from "../../hooks/recipe/useRecipeCoinPairs";

/**
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
function TokenSelectorDialog(props) {
  const { handleClose, ...rest } = props;
  const [
    recipeCreatorState,
    { addToken, removeToken, nextStep, confirmTokenSelection },
  ] = useRecipeCreator();
  const supportedTokens = useRecipeCoinPairs();

  const handleConfirm = () => {
    if (!confirmTokenSelection()) return;
    if (recipeCreatorState.activeStep === 0) nextStep();
    handleClose();
  };

  /**
   * @param token
   */
  const handleTokenSelectionClick = (token) => {
    addToken(token);
    if (recipeCreatorState.activeStep !== 0) {
      handleClose();
    }
  };

  /**
   * @param token
   */
  const handleTokenRemovalClick = (token) => removeToken(token);

  /**
   * @param token
   */
  const handleIsTokenSelected = (token) => {
    return recipeCreatorState.tokens.some(
      (currentToken) => currentToken.id === token.id
    );
  };

  const [tokenSearchFieldValue, setTokenSearchFieldValue] = useState("");

  /**
   * @param event
   */
  const handleSearchUserInput = (event) => {
    setTokenSearchFieldValue(event.target.value);
  };

  const [filteredTokens, setFilteredTokens] = useState();

  useEffect(() => {
    setFilteredTokens(
      supportedTokens?.filter((currentToken) => {
        return (
          currentToken.symbol
            ?.toLowerCase()
            .includes(tokenSearchFieldValue?.toLowerCase()) ||
          currentToken.name
            ?.toLowerCase()
            .includes(tokenSearchFieldValue?.toLowerCase())
        );
      })
    );
    // @todo resolve providing an array dependency causing an infinite loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tokenSearchFieldValue, JSON.stringify(supportedTokens)]);

  return (
    <Dialog {...rest}>
      <DialogTitleWithCloseButton variant="h5" handleClose={handleClose}>
        Select tokens
      </DialogTitleWithCloseButton>
      <DialogContent>
        <SearchInputField
          label="Search Name or Paste Address"
          value={tokenSearchFieldValue}
          onChange={handleSearchUserInput}
          sx={{ mt: 1, mb: 2 }}
        />
        <Typography variant="h6" gutterBottom>
          Tokens
        </Typography>
        <Divider />
        <SearchResultList
          list={filteredTokens}
          primaryText="symbol"
          secondaryText="name"
          height={220}
          isItemSelected={handleIsTokenSelected}
          onListItemButtonClick={handleTokenSelectionClick}
        />
        {recipeCreatorState.activeStep === 0 && (
          <>
            <Typography variant="h5">Selected tokens*</Typography>
            <HorizontalChipList
              list={recipeCreatorState.tokens}
              onRemoveIconButtonClick={handleTokenRemovalClick}
            />
            <Typography variant="caption">
              {`* A recipe may contain a minimum of ${recipeCreatorState.minSelection} and a maximum of ${recipeCreatorState.maxSelection} tokens.`}
            </Typography>
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button
          fullWidth
          bg="yellowContained"
          size="massive"
          onClick={handleConfirm}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default TokenSelectorDialog;
