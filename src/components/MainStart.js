import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import { Link } from "react-router-dom";
//material-ui
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
//icons
import Share from "@material-ui/icons/Share";
import OpenInNew from "@material-ui/icons/OpenInNew";
import Info from "@material-ui/icons/Info";
import QuestionAnswer from "@material-ui/icons/QuestionAnswer";
import AddCircleOutline from "@material-ui/icons/AddCircleOutline";
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
