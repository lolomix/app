import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import { Link } from "react-router-dom";
//material-ui
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import ListItemIcon from "@mui/material/ListItemIcon";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
//icons
import Share from "@mui/icons-material/Share";
import OpenInNew from "@mui/icons-material/OpenInNew";
import Info from "@mui/icons-material/Info";
import QuestionAnswer from "@mui/icons-material/QuestionAnswer";
import AddCircleOutline from "@mui/icons-material/AddCircleOutline";
//custom
import pkg from "../../package.json";

class MainStart extends Component {
  render() {
    const { t } = this.props;

    return (
      <Box p={2}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Typography variant="h2" gutterBottom>
              {t("main.aboutToolTitle")}
            </Typography>
            <Typography variant="body2" gutterBottom>
              {t("main.aboutDescription")}
            </Typography>
            <Box my={3}>
              <Typography variant="h2" gutterBottom>
                {t("main.startTitle")}
              </Typography>
              <Button margin="normal" color="primary" variant="contained" component={Link} to="/new" startIcon={<AddCircleOutline />}>
                {t("main.startCreateButton")}
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h2" gutterBottom>
              {t("main.learnmoreTitle")}
            </Typography>
            <List dense>
              {navigator.share && (
                <ListItem button onClick={this.webShare}>
                  <ListItemIcon color="primary">
                    <Share />
                  </ListItemIcon>
                  <ListItemText primary={t("main.sharePrimary")} secondary={t("main.shareSecondary")} />
                </ListItem>
              )}
              <ListItem button component={Link} to="/howitworks">
                <ListItemIcon color="primary">
                  <QuestionAnswer />
                </ListItemIcon>
                <ListItemText primary={t("main.qaPrimary")} secondary={t("main.qaSecondary")} />
              </ListItem>
              <ListItem button component={Link} to="/releasenotes">
                <ListItemIcon color="primary">
                  <Info />
                </ListItemIcon>
                <ListItemText primary={t("base.currentVersionIs") + " " + pkg.version} secondary={t("main.seeReleaseNotes")} />
              </ListItem>
              <ListItem button component="a" href="https://github.com/" target="_blank" rel="noreferrer">
                <ListItemIcon color="primary">
                  <OpenInNew />
                </ListItemIcon>
                <ListItemText primary={t("main.smartcontractsPrimary")} secondary={t("main.smartcontractsSecondary")} />
              </ListItem>
              <ListItem button component="a" href="https://cryptochefs.io" target="_blank" rel="noreferrer">
                <ListItemIcon color="primary">
                  <OpenInNew />
                </ListItemIcon>
                <ListItemText primary="cryptochefs.io" secondary={t("main.voveoSecondary")} />
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </Box>
    );
  }
}

export default withTranslation()(MainStart);
