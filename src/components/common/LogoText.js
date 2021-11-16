import React from 'react'
import { Link } from 'react-router-dom'
import { withTranslation } from 'react-i18next'
// material-ui
import Tooltip from '@mui/material/Tooltip'
import Button from '@mui/material/Button'
// assets
import { Typography } from '@mui/material'

/**
 * @param t
 * @returns {JSX.Element}
 * @constructor
 */
function LogoText ({ t }) {
  return (
    <Tooltip disableFocusListener
             title={t('base.titleTooltip')}
             aria-label={t('base.titleTooltip')}
    >
      <Button disableRipple
              sx={{ maxWidth: '170px', paddingTop: '8px' }}
              component={Link}
              to="/"
      >
        <Typography color="tertiary.main" variant="h4" component="span">
          CryptoChefs
        </Typography>
      </Button>
    </Tooltip>
  )
}

export default withTranslation()(LogoText)
