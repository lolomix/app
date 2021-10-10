import React from 'react'
import { withTranslation } from 'react-i18next'
// material-ui
import {
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
} from '@mui/material'
import CurrencyMaticIcon from '../icons/CurrencyMaticIcon'
import CurrencyAromaIcon from '../icons/CurrencyAromaIcon'

function CurrencyInputField({ id, label, currency, onUserInput, value, disabled}) {
  const currencyIconComponents = {
    'MATIC': CurrencyMaticIcon,
    'AROMA': CurrencyAromaIcon
  }

  // dynamically reference the icon component
  const CurrencyIcon = currencyIconComponents[currency];

  return (
    <FormControl fullWidth>
      <InputLabel htmlFor={id} shrink={true}>{label}</InputLabel>
      <OutlinedInput id={id}
                     value={value}
                     onChange={onUserInput}
                     placeholder={0}
                     sx={{
                        backgroundColor: '#fff'
                     }}
                     inputProps={{
                       inputMode: 'numeric',
                       pattern: '[0-9]*'
                     }}
                     endAdornment={
                       <InputAdornment position="end">
                         <Typography pr={1} fontWeight={500}>
                           {currency}
                         </Typography>
                         <CurrencyIcon fontSize="large" sx={{
                           border: "2px solid #f1f1f1",
                           borderRadius: "100%"
                         }}/>
                       </InputAdornment>
                     }
                     disabled={disabled}
      />
    </FormControl>
  )
}

export default withTranslation()(CurrencyInputField)

