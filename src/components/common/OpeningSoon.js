import React from "react";
import { withTranslation } from 'react-i18next'
import { Box, Typography } from '@mui/material'

function OpeningSoon({ t }) {
  return (
    <Box>
      <Typography variant="h1" textAlign="center">
        {t('base.openingSoon')}
      </Typography>
    </Box>
  );
}

export default withTranslation()(OpeningSoon);