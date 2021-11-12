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

/**
 * @param t
 * @param faqKeys
 * @param color
 * @returns {JSX.Element}
 * @constructor
 */
function FAQ ({ t, faqKeys, color}) {

  /**
   * Holds the list of "question and answer" objects
   *
   * @type {*[]}
   */
  let faqs = []

  // iterates over `faqKeys` and pushes to `faqs` array
  // `forEach` skips empty arrays automatically
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
          <Accordion key={`panel${index}`} sx={{color: color}}>
            <AccordionSummary
              id={`panel${index}bh-header`}
              expandIcon={<AddIcon sx={{color: color}}/>}
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

/**
 * @type {{faqKeys: *[]}}
 */
FAQ.defaultProps = {
  faqKeys: [],
  color: undefined
}

/**
 * @type {{color: Requireable<string>, faqKeys: Requireable<any[]>}}
 */
FAQ.propTypes = {
  faqKeys: PropTypes.array,
  color: PropTypes.string
}

export default withTranslation()(FAQ)