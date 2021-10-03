import React from "react";

import { withTranslation } from 'react-i18next'
import Typography from '@mui/material/Typography'

class Headline extends React.Component {
  render() {
    const { t } = this.props;

    return (
      <Typography variant="h1" align="center" gutterBottom mt={3} mb={6}>
        {t(this.props.title)}
      </Typography>
    );
  }
}

export default withTranslation()(Headline);

