import React from 'react'

import { withTranslation } from 'react-i18next'
import TextField from '@mui/material/TextField'

class CurrencyInputField extends React.Component {
  handleChange(e) {
    this.props.onUserInput(e.target.value);
  }

  render () {
    const { t, id, label, currency, type, amount, onUserInput} = this.props

    return (
      <TextField
        variant="outlined"
        id={id}
        label={t(label)}
        helperText={t(`components.CurrencyInputField.helperText`, { currency, type })}
        type="number"
        fullWidth
        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
        value={amount}
        onChange={onUserInput}
      />
    )
  }
}

export default withTranslation()(CurrencyInputField)

