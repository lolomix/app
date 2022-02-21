// material-ui
import { InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

function SearchInputField(props) {
  return (
    <TextField
      fullWidth
      variant="outlined"
      inputProps={{ inputMode: "search" }}
      InputLabelProps={{ sx: { paddingRight: 4.5 } }}
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
