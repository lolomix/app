import React from "react";

import { withTranslation } from 'react-i18next'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CurrencyInputField from './form/CurrencyInputField'
import { SwapCalls } from '@mui/icons-material'
import { Stack } from '@mui/material'

class CurrencyExchange extends React.Component {

  state = {
    currencyFrom: 'MATIC',
    currencyTo: 'AROMA'
  }

  switchCurrencies = () => {
    this.setState({
      currencyFrom: this.state.currencyTo,
      currencyTo: this.state.currencyFrom
    })
  }

  handleUserInput = () => {
      console.log('Handle User Input')
  }

  handleExchange = () => {
    console.log('Handle Exchange')
  }

  render() {
    const { t, fullHeight } = this.props;

    let sx = {};

    if (fullHeight) {
      sx = { height: "100%" }
    }

    return (
      <Card sx={sx}>
        <CardContent>
          <Typography gutterBottom variant="h5">
            {t('store.exchangeTitle')}
          </Typography>
          <Typography variant="body2">
            It looks like that you are not yet a chef. In order to create a recipe, you must acquire a chef NFT.
          </Typography>
          <Stack my={4} spacing={1} alignItems="center">
            <CurrencyInputField
              id="token-exchange-from"
              currency={this.state.currencyFrom}
              label={this.state.currencyFrom}
              type="buy"
              onUserInput={this.handleUserInput}
            />
            <SwapCalls onClick={this.switchCurrencies}/>
            <CurrencyInputField
              id="token-exchange-to"
              currency={this.state.currencyTo}
              label={this.state.currencyTo}
              type="sell"
              onUserInput={this.handleUserInput}
            />
          </Stack>
          <Button variant="contained" fullWidth onClick={this.handleExchange}>
            Exchange
          </Button>
        </CardContent>
      </Card>
    );
  }
}

export default withTranslation()(CurrencyExchange);

