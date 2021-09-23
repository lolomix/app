import React, { Component } from "react";
import { withTranslation } from "react-i18next";
//material-ui
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

class ReleaseNotes extends Component {
  render() {
    const { t } = this.props;

    return (
      <Grid item xs={12} md={9} xl={6} className="defaultpadding">
        <Typography variant="h1" gutterBottom>
          {t("releasenotes.title")}
        </Typography>

      </Grid>
    );
  }
}

export default withTranslation()(ReleaseNotes);
