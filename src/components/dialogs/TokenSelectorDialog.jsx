import { useEffect, useState } from "react";
// material-ui
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  Typography,
} from "@mui/material";
// custom
import SearchInputField from "../form/SearchInputField";
import { useRecipeCreator } from "../../contexts/recipeCreatorContext";
import { useSnackbar } from "notistack";
import DialogTitleWithCloseButton from "./DialogTitleWithCloseButton";
import SearchResultList from "../form/SearchResultList";
import HorizontalChipList from "../form/HorizontalChipList";

// @todo replace this with blockchain call
const supportedTokens = [
  { id: 1, symbol: "REEF", name: "Reef" },
  { id: 2, symbol: "SHIB", name: "ShibaInu" },
  { id: 3, symbol: "CVC", name: "Civic" },
  { id: 4, symbol: "ETH", name: "Ethereum" },
  { id: 5, symbol: "BNB", name: "Binance Coin" },
  { id: 6, symbol: "MATIC", name: "Matic" },
  { id: 7, symbol: "BTC", name: "Bitcoin" },
  { id: 8, symbol: "LUNA", name: "Terra" },
  { id: 9, symbol: "QBIT", name: "Quantum Works" },
  { id: 10, symbol: "MINA", name: "Mina Protocol" },
];

/**
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
function TokenSelectorDialog(props) {
  const { handleClose, ...rest } = props;

  const { enqueueSnackbar } = useSnackbar();
  const [recipeCreatorState, addToken, removeToken] = useRecipeCreator();

  /**
   * Contains the list of prepared tokens (tokens with additional props/functions)
   */
  const [preparedTokens, setPreparedTokens] = useState([]);

  /**
   * Prepare supported tokens with additional props/functions
   * @todo this should be refactored and supported tokens should be provided with these additional props/functions
   */
  useEffect(() => {
    let tokens = supportedTokens.map((token) => {
      return {
        ...token,
        selected: recipeCreatorState.tokens.some(
          (currentToken) => currentToken.id === token.id
        ),
        onAddClick: () => {
          try {
            addToken(token);
          } catch (error) {
            enqueueSnackbar(error.message, {
              variant: "error",
            });
          }
        },
        onRemovalClick: () => {
          removeToken(token);
        },
      };
    });

    setPreparedTokens(tokens);
    // @todo fix depth exceed error when addToken is added to dependency list
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recipeCreatorState, enqueueSnackbar]);

  /**
   * Contains the search input value
   */
  const [tokenSearchFieldValue, setTokenSearchFieldValue] = useState("");

  /**
   * Set our controlled search input value
   *
   * @param event
   */
  const handleSearchUserInput = (event) => {
    setTokenSearchFieldValue(event.target.value);
  };

  /**
   * Contains then list of tokens filtered by the search input value
   */
  const [filteredTokens, setFilteredTokens] = useState();

  /**
   * Filter the prepared tokens width the search input value
   */
  useEffect(() => {
    let tokens = preparedTokens;

    if (tokenSearchFieldValue) {
      tokens = preparedTokens.filter((currentToken) => {
        return (
          currentToken.symbol
            .toLowerCase()
            .includes(tokenSearchFieldValue?.toLowerCase()) ||
          currentToken.name
            .toLowerCase()
            .includes(tokenSearchFieldValue?.toLowerCase())
        );
      });
    }
    setFilteredTokens(tokens);
  }, [tokenSearchFieldValue, preparedTokens]);

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
          height={200}
        />
        <Typography variant="h5">Selected Tokens*</Typography>
        <HorizontalChipList list={preparedTokens} />
        <Typography variant="caption">
          * The minimum number of tokens to select is 3
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button
          fullWidth
          variant="yellowContained"
          size="massive"
          onClick={handleClose}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default TokenSelectorDialog;
