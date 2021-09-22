import React, { Component } from "react";
import { withTranslation } from "react-i18next";
//material-ui
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
//icons
import ExpandMore from "@material-ui/icons/ExpandMore";

class Explainer extends Component {

  render() {
    const { t } = this.props;
    const questions = [
      {
        question: t("explainer.q1"),
        answer: t("explainer.a1"),
      },
      {
        question: t("explainer.q2"),
        answer: t("explainer.a2"),
      },
      {
        question: t("explainer.q3"),
        answer: t("explainer.a3"),
      },
      {
        question: t("explainer.q4"),
        answer: t("explainer.a4"),
      },
      {
        question: t("explainer.q5"),
        answer: t("explainer.a5"),
      },
      {
        question: t("explainer.q6"),
        answer: t("explainer.a6"),
      },
      {
        question: t("explainer.q7"),
        answer: t("explainer.a7"),
      },
      {
        question: t("explainer.q8"),
        answer: t("explainer.a8"),
      }
    ];

    return (
      <Grid item xs={12} md={9} xl={6} className="defaultpadding">
        <Typography variant="h1" gutterBottom>
          {t("explainer.qaTitle")}
        </Typography>
        <Box my={4}>
          {questions.map((item, index) => (
            <Accordion key={index}>
              <AccordionSummary
                expandIcon={<ExpandMore />}
              >
                <Typography>{item.question}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box>
                  <Typography variant="body2" gutterBottom>{item.answer}</Typography>
                  {item.link && (
                  <Typography variant="body2" gutterBottom>
                    <Button variant="contained" color="primary" href={item.link}>{item.linkTitle}</Button>
                  </Typography>
                  )}
                </Box>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Grid>     
    );
  }
}

export default withTranslation()(Explainer);
