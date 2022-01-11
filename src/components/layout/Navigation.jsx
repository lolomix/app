import { withTranslation } from 'react-i18next'
// material-ui
import {
  Toolbar,
  AppBar,
  Grid,
  Stack,
} from '@mui/material'
import NotificationsIcon from '@mui/icons-material/Notifications'
// custom
import NavigationWalletButton from './NavigationWalletButton'
import LanguageSelector from './LanguageSelector'
import NavigationButton from './NavigationButton'
import NavigationMenuButton from './NavigationMainMenuButton'
import NavigationAromaBalance from './NavigationAromaBalance'

/**
 * @param t
 * @returns {JSX.Element}
 * @constructor
 */
function Navigation ({ t }) {

  /**
   * @type {*[]}
   *
   * @todo create a hook that gathers all related notifications
   */
  const notifications = []

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
            <NavigationAromaBalance/>
          </Grid>
          <Grid item
                container
                xs={6}
                md={8}
                justifyContent="right"
                alignItems="center"
          >
            <Grid item>
              <Stack spacing={1} direction="row" mr={4}>
                {notifications.length > 0 &&
                  <NavigationButton icon={<NotificationsIcon/>}/>
                }
                <NavigationWalletButton/>
                <NavigationMenuButton/>
              </Stack>
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
