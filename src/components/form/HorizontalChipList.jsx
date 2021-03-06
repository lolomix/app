import { Box, Chip, Grid, IconButton, Skeleton } from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { theme } from "../../utils/theme";
import Icon from "react-crypto-icons";

/**
 * @param {array} list
 * @param {function(object)} onRemoveIconButtonClick
 * @returns {JSX.Element}
 * @constructor
 */
function HorizontalChipList({ list, onRemoveIconButtonClick }) {
  return (
    <>
      {list.length > 0 ? (
        <Grid container flexWrap="wrap" spacing={1} my={1}>
          {list.map((item) => (
            <Grid item key={item.id}>
              <Box position="relative">
                <Chip
                  label={item.symbol}
                  variant="outlined"
                  shape="squarish"
                  icon={
                    item.icon ? (
                      <Icon name={item.icon} size={18} />
                    ) : (
                      <HelpOutlineIcon />
                    )
                  }
                />
                <IconButton
                  onClick={() =>
                    onRemoveIconButtonClick && onRemoveIconButtonClick(item)
                  }
                  size="xsmall"
                  variant="contained"
                  color="error"
                  inversecolor="inverse"
                  sx={{
                    position: "absolute",
                    right: theme.spacing(-0.7),
                    top: theme.spacing(-0.7),
                  }}
                >
                  <RemoveCircleIcon fontSize="small" />
                </IconButton>
              </Box>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Skeleton animation={false} width="100%" height={50} />
      )}
    </>
  );
}

export default HorizontalChipList;
