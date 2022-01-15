import React from "react";
// material-ui
import { alpha, IconButton, styled, Typography } from "@mui/material";

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.common.white,
  backgroundColor: alpha(theme.palette.common.black, 0.5),
  border: `1px solid ${alpha(theme.palette.common.black, 0.25)}`,
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.black, 0.75),
  },
}));

/**
 * @type {React.ForwardRefExoticComponent<React.PropsWithoutRef<{}> & React.RefAttributes<unknown>>}
 */
const NavigationButton = React.forwardRef((props, ref) => {
  const { icon, title, ...rest } = props;

  return (
    <StyledIconButton shape="inherit" {...rest} ref={ref}>
      {icon}
      {title && (
        <Typography pl={icon ? 0.5 : 0} variant="button">
          {title}
        </Typography>
      )}
    </StyledIconButton>
  );
});

export default NavigationButton;
