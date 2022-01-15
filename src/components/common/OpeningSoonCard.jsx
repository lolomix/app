import React from "react";
import { withTranslation } from "react-i18next";
// material-ui
import { Card, CardContent, Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import logo from "../../assets/logo.png";

/**
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
function OpeningSoonCard(props) {
  const { t, rest } = props;

  return (
    <Card {...rest}>
      <CardContent>
        <Grid container justifyContent="center" alignItems="center">
          <Grid item textAlign="center">
            <img
              src={logo}
              alt="Chef Silhouettes"
              style={{ maxWidth: "182px" }}
            />
            <Typography mt={3}>{t("base.openingSoon")}</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default withTranslation()(OpeningSoonCard);
