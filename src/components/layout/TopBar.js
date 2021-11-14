import React, { useState } from 'react'
import { withTranslation } from 'react-i18next'
import { Link, NavLink } from 'react-router-dom'
import { useWeb3React } from '@web3-react/core'
// material-ui
import {
  Toolbar,
  AppBar,
  Grid,
  Button,
  List,
  ListItem,
  ListItemText,
  DialogActions,
  Dialog,
  DialogTitle,
  DialogContent,
  ListItemIcon,
  Tooltip,
  Typography,
  Hidden,
  IconButton,
  Stack
} from '@mui/material'
// icons
import Settings from '@mui/icons-material/Settings'
// custom
import Web3connect from './Web3connect'
import LanguageSelector from './LanguageSelector'
import Logo from '../common/Logo'
import LogoText from '../common/LogoText'

const links = [
  {
    name: 'Store',
    visible: true,
    disabled: false,
    path: '/store',
    description: 'Buy Aroma and CHEF',
  },
  {
    name: 'Kitchen',
    visible: true,
    disabled: true,
    path: '/kitchen',
    description: 'Create your own recipe',
  },
  {
    name: 'Buffet',
    visible: true,
    disabled: true,
    path: '/buffet',
    description: 'Order and enjoy your meal',
  },
  {
    name: 'Collection',
    visible: active => active,
    disabled: false,
    path: '/collection',
    description: 'See the collection of CHEFs',
  },
]

const NavLinkRef = React.forwardRef((props, ref) => (
    <NavLink {...props} ref={ref} className={({ isActive }) => (
      props.className + (isActive ? ' MuiButton-active' : '')
    )}/>
  ),
)

function TopBar ({ t }) {
  const [popover, setPopover] = useState(false)
  const { active } = useWeb3React()

  const handleConnectionIconClick = () => {
    setPopover(true)
  }
  const handleConnectionMenuClose = () => {
    setPopover(false)
  }

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
            <Grid item xs="auto">
              <Logo/>
            </Grid>
            <Grid item xs>
              <LogoText/>
            </Grid>
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
                  {links.filter(item => {
                    if (typeof item.visible === 'function') {
                      return item.visible(active)
                    }
                    return item.visible
                  }).map((item, index) => (
                    <Tooltip key={index} title={item.description}>
                        <span>
                          <Button
                            elongatedwidth={item.disabled ? 'false' : 'true'}
                            color="tertiary"
                            variant="contained"
                            disabled={item.disabled}
                            component={NavLinkRef}
                            to={item.path}>
                            {item.name}
                            {item.disabled && (
                              <Typography pl={0.5} variant="caption"
                                          sx={{ opacity: 0.7 }}
                              >
                                SOON
                              </Typography>
                            )}
                          </Button>
                        </span>
                    </Tooltip>
                  ))}
                </Stack>
              </Hidden>
              <Hidden mdUp>
                <Tooltip title={t('base.navigation')}>
                  <IconButton color="tertiary"
                              onClick={handleConnectionIconClick}
                  >
                    <Settings/>
                  </IconButton>
                </Tooltip>
                <Dialog onClose={handleConnectionMenuClose}
                        aria-labelledby="navigation"
                        open={popover}
                >
                  <DialogTitle id="navigation">{t(
                    'base.navigation')}</DialogTitle>
                  <DialogContent>
                    <List dense>
                      {links.map((item, index) => (
                        <ListItem key={index}
                                  button
                                  component={Link}
                                  disabled={item.disabled}
                                  to={item.path}
                                  onClick={handleConnectionMenuClose}
                        >
                          <ListItemIcon color="primary">
                            {item.disabled ? 'soon' : item.icon}
                          </ListItemIcon>
                          <ListItemText primary={item.name}
                                        secondary={item.description}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </DialogContent>
                  <DialogActions>
                    <Button disableElevation
                            color="primary"
                            variant="contained"
                            onClick={handleConnectionMenuClose}
                    >
                      {t('base.close')}
                    </Button>
                  </DialogActions>
                </Dialog>
              </Hidden>
            </Grid>
            <Grid item>
              <Web3connect/>
              <LanguageSelector/>
            </Grid>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  )

}

export default withTranslation()(TopBar)
