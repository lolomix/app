import React from "react";
// material-ui
import Typography from '@mui/material/Typography'

/**
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
function Headline(props) {
  const {t, children, ...rest} = props

  return (
    <Typography {...rest}>
      {children}
    </Typography>
  );
}

/**
 * @type {{mb: number, mt: number, variant: string, align: string}}
 */
Headline.defaultProps = {
  variant: "h1",
  align: "center",
  mt: 3,
  mb: 6
};

export default Headline;