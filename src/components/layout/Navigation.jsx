import { withTranslation } from 'react-i18next'
// material-ui
import {
  Toolbar,
  AppBar,
  Grid,
  Hidden,
  Stack,
} from '@mui/material'
import NotificationsIcon from '@mui/icons-material/Notifications'
// custom
import NavigationWalletButton from './NavigationWalletButton'
import LanguageSelector from './LanguageSelector'
import NavigationButton from './NavigationButton'
import NavigationMenuButton from './NavigationMenuButton'

/**
 * @param t
 * @returns {JSX.Element}
 * @constructor
 */
function Navigation ({ t }) {
  return (
    <AppBar elevation={0} position="static">
      <Toolbar variant="large">
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item container
                xs={6}
                md={4}
                justifyContent="left"
                alignItems="center"
          >
            {/* @todo: aroma balance component */}
          </Grid>
          <Grid item
                container
                xs={6}
                md={8}
                justifyContent="right"
                alignItems="center"
          >
            <Grid item>
              <Hidden mdDown>
                <Stack spacing={1} direction="row" mr={4}>
                  <NavigationButton icon={<NotificationsIcon/>}/>
                  <NavigationWalletButton/>
                  <NavigationMenuButton/>
                </Stack>
              </Hidden>
            </Grid>
            <Grid item>
              {/* @todo: remove this but keep the language selected */}
              <LanguageSelector/>
            </Grid>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  )
}

export default withTranslation()(Navigation)
