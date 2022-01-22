// material-ui
import { Chip, Grid, IconButton, Skeleton, styled } from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

/**
 * @type {StyledComponent<PropsOf<((props: ({href: string} & OverrideProps<ExtendButtonBaseTypeMap<ExtendButtonBaseTypeMap<{props: {children?: React.ReactNode, classes?: Partial<IconButtonClasses>, color?: OverridableStringUnion<"inherit" | "default" | "primary" | "secondary" | "error" | "info" | "success" | "warning", IconButtonPropsColorOverrides>, disabled?: boolean, disableFocusRipple?: boolean, edge?: "start" | "end" | false, size?: OverridableStringUnion<"small" | "medium" | "large", IconButtonPropsSizeOverrides>, sx?: SxProps<Theme>}, defaultComponent: "button"}>>, "a">)) => JSX.Element) & OverridableComponent<ExtendButtonBaseTypeMap<ExtendButtonBaseTypeMap<{props: {children?: React.ReactNode, classes?: Partial<IconButtonClasses>, color?: OverridableStringUnion<"inherit" | "default" | "primary" | "secondary" | "error" | "info" | "success" | "warning", IconButtonPropsColorOverrides>, disabled?: boolean, disableFocusRipple?: boolean, edge?: "start" | "end" | false, size?: OverridableStringUnion<"small" | "medium" | "large", IconButtonPropsSizeOverrides>, sx?: SxProps<Theme>}, defaultComponent: "button"}>>>> & MUIStyledCommonProps<Theme>, {}, {}>}
 */
const StyledIconButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  color: theme.palette.error.main,
  right: theme.spacing(-0.7),
  top: theme.spacing(-0.7),
  padding: 0,
  backgroundColor: theme.palette.common.white,
  "&:hover": {
    backgroundColor: theme.palette.common.white,
  },
}));

/**
 * @param list
 * @returns {JSX.Element}
 * @constructor
 */
function HorizontalChipList({ list }) {
  list = list.filter((item) => item.selected);

  return (
    <>
      {list.length > 0 ? (
        <Grid container flexWrap="wrap" columnSpacing={1} my={1.1}>
          {list.map((item) => (
            <Grid item auto key={item.id} position="relative">
              <Chip
                label={item.symbol}
                variant="outlined"
                shape="squarish"
                icon={item.icon ?? <HelpOutlineIcon />}
              />
              <StyledIconButton onClick={item.onRemovalClick} size="small">
                <RemoveCircleIcon fontSize="inherit" />
              </StyledIconButton>
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
