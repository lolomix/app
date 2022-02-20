import { Grid as MuiGrid } from "@mui/material";
import { styled } from "@mui/material/styles";

const Grid = styled(MuiGrid, {
  shouldForwardProp: (prop) => prop !== "fullHeight",
})(({ fullHeight }) => ({
  ...(fullHeight && {
    height: "100%",
  }),
}));

export default Grid;
