import { Card as MuiCard } from "@mui/material";
import { styled } from "@mui/material/styles";

const Card = styled(MuiCard, {
  shouldForwardProp: (prop) => prop !== "fullHeight",
})(({ fullHeight }) => ({
  ...(fullHeight && {
    height: "100%",
  }),
}));

export default Card;
