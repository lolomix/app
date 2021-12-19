import * as React from 'react';
import PropTypes from 'prop-types'
// material-ui
import { Box } from '@mui/material'
// svgs
import { ReactComponent as SVGVariant1 } from "../../assets/components/layout/drip-divider/variant-1.svg";
import { ReactComponent as SVGVariant2 } from "../../assets/components/layout/drip-divider/variant-2.svg";

const variantMapping = {
  1: SVGVariant1,
  2: SVGVariant2
};

function DripDivider(props) {
  const SVG = variantMapping[props.variant]

  return (
    <Box sx={{ width: "100%" }} {...props}>
      <SVG color="inherit"/>
    </Box>
  );
}

DripDivider.defaultProps = {
  variant: 1
};

DripDivider.propTypes= {
  variant: PropTypes.oneOfType([
    PropTypes.oneOf([
      1,
      2
    ]),
    PropTypes.string
  ])
};

export default DripDivider