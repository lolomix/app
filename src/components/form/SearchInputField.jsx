// material-ui
import { InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

function SearchInputField(props) {
  return (
    <TextField
      fullWidth
      variant="outlined"
      inputProps={{ inputMode: "search" }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <SearchIcon fontSize="large" />
          </InputAdornment>
        ),
      }}
      {...props}
    />
  );
}

export default SearchInputField;
