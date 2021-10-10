import * as React from 'react'
import { withTranslation } from 'react-i18next'
import PropTypes from 'prop-types'
// material-ui
import AddIcon from '@mui/icons-material/Add'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from '@mui/material'


function FAQ ({ t, faqKeys }) {

  // holds the list of "question and answer" objects
  let faqs = []

  // iterate over `faqKeys` and push to `faqs`
  // this is skipped automatically if `faqKeys` is an empty array
  faqKeys.forEach(el => {
    let faq = t(`faqs.${el}`, {
      returnObjects: true,
    })

    if (faq instanceof Object &&
      faq.hasOwnProperty('question') &&
      faq.hasOwnProperty('answer'))
    {
      faqs.push(faq)
    }
  })

  // if empty, get all from `faqs` section
  if (faqs.length === 0) {
    faqs = Object.values(
      t('faqs', {
        returnObjects: true
      })
    )
  }

  return (
    <div>
      {
        faqs.map(({ answer, question }, index) => (
          <Accordion key={`panel${index}`}>
            <AccordionSummary
              id={`panel${index}bh-header`}
              expandIcon={<AddIcon/>}
              aria-controls={`panel${index}bh-content`}
            >
              <Typography sx={{ textTransform: 'uppercase' }}
                          variant="h5"
                          component="h3"
              >
                {question}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                {answer}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))
      }
    </div>
  )
}

FAQ.defaultProps = {
  faqKeys: []
}

FAQ.propTypes = {
  faqKeys: PropTypes.array
}

export default withTranslation()(FAQ)