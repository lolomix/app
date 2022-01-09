import { withTranslation } from 'react-i18next'
// material-ui
import MenuIcon from '@mui/icons-material/Menu'
import { Tooltip } from '@mui/material'
// custom
import NavigationButton from './NavigationButton'

/**
 * @param t
 * @returns {JSX.Element}
 * @constructor
 */
function NavigationMenuButton ({t}) {
  return (
    <Tooltip disableFocusListener title="Menu" aria-label="Menu">
      <NavigationButton icon={<MenuIcon/>}/>
    </Tooltip>
  )
}

export default  withTranslation()(NavigationMenuButton)