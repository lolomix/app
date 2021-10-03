import React from 'react'

import { withTranslation } from 'react-i18next'
import CardContent from '@mui/material/CardContent'
import Card from '@mui/material/Card'
import { Step, StepLabel, Stepper } from '@mui/material'

class StoreSteps extends React.Component {
  render () {
    const { t } = this.props

    const steps = [
      'Exchange',
      'Buy',
      'Wait',
    ]

    return (
      <Card>
        <CardContent>
          <Stepper activeStep={1} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </CardContent>
      </Card>
    )
  }
}

export default withTranslation()(StoreSteps)

