// material-ui
import { Chip, Grid, IconButton, Skeleton, styled } from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { theme } from "../../utils/theme";

/**
 * @param list
 * @param onRemoveIconButtonClick
 * @returns {JSX.Element}
 * @constructor
 */
function HorizontalChipList({ list, onRemoveIconButtonClick }) {
  return (
    <>
      {list.length > 0 ? (
        <Grid container flexWrap="wrap" columnSpacing={1} my={1.1}>
          {list.map((item) => (
            <Grid item key={item.id} position="relative">
              <Chip
                label={item.symbol}
                variant="outlined"
                shape="squarish"
                icon={item.icon ?? <HelpOutlineIcon />}
              />
              <IconButton
                onClick={() =>
                  onRemoveIconButtonClick && onRemoveIconButtonClick(item)
                }
                size="xsmall"
                variant="contained"
                color="error"
                inverseColor
                sx={{
                  position: "absolute",
                  right: theme.spacing(-0.7),
                  top: theme.spacing(-0.7),
                }}
              >
                <RemoveCircleIcon fontSize="small" />
              </IconButton>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Skeleton width="100%" height={50} />
      )}
    </>
  );
}

export default HorizontalChipList;
