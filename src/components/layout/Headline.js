import React from "react";
import { withTranslation } from 'react-i18next'
// material-ui
import Typography from '@mui/material/Typography'

function Headline({ t, variant, color, title}) {
  return (
    <Typography variant={variant} color={color} align="center" gutterBottom mt={3} mb={6}>
      {t(title)}
    </Typography>
  );
}

Headline.defaultProps = {
  variant: "h1"
};

export default withTranslation()(Headline);