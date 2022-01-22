// material-ui
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
} from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

/**
 * @type {StyledComponent<PropsOf<OverridableComponent<BoxTypeMap>> & MUIStyledCommonProps<Theme>, {}, {}>}
 */
const BlurBottom = styled(Box)({
  content: "''",
  position: "absolute",
  left: "0px",
  right: "0px",
  height: "50%",
  bottom: "0px",
  background:
    "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(255,255,255,1) 100%)",
  pointerEvents: "none",
});

/**
 * @param list
 * @param primaryText
 * @param secondaryText
 * @param height
 * @param blurBottom
 * @returns {JSX.Element}
 * @constructor
 */
function SearchResultList({
  list,
  primaryText,
  secondaryText,
  height,
  blurBottom = true,
}) {
  return (
    <Box position="relative">
      <List
        dense
        sx={
          height && {
            overflow: "auto",
            height: height,
          }
        }
      >
        {list.map((item) => (
          <ListItem key={`item-${item.symbol}`} disablePadding>
            <ListItemButton selected={item.selected} onClick={item.onAddClick}>
              <ListItemIcon>
                {item.icon ?? <HelpOutlineIcon fontSize="large" />}
              </ListItemIcon>
              <ListItemText
                sx={{ my: 0.4 }}
                primary={item[primaryText]}
                secondary={item[secondaryText]}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      {blurBottom && <BlurBottom />}
    </Box>
  );
}

export default SearchResultList;
