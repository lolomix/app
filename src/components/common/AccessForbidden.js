import React, { Component } from "react";
import { withTranslation } from "react-i18next";
//material-ui
import Box from "@material-ui/core/Box";
import Typography from '@material-ui/core/Typography';

class AccessForbidden extends Component {
  
  render() {

    const { t } = this.props;

    return (
      <Box my={2}>
        <Typography variant="h2" gutterBottom>
          {t("base.noAccess")}
        </Typography>
        <Typography variant="body2" gutterBottom>
          {t("admin.adminOnly")}
        </Typography>
      </Box>
    );
  }
}

export default withTranslation()(AccessForbidden);
