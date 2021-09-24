import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import { Link } from "react-router-dom";
//material-ui
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ListItemIcon from "@mui/material/ListItemIcon";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
//icons
import Share from "@mui/icons-material/Share";
import OpenInNew from "@mui/icons-material/OpenInNew";
import QuestionAnswer from "@mui/icons-material/QuestionAnswer";

class Main extends Component {
  webShare = () => {
    navigator
      .share({
        title: "cryptochefs.io",
        text: "Check out cryptochefs.io",
        url: "https://cryptochefs.io",
      })
      .then(() => console.log("Successful share"))
      .catch((error) => console.log("Error sharing", error));
  };

  render() {
    const { t } = this.props;

    return (
      <Grid item xs={12} md={9} xl={6} className="defaultpadding">
        <Typography variant="h1" gutterBottom>
          {t("main.title")}
        </Typography>
        <Grid container spacing={2}>
          <Grid item sm={12} md={6}>
            <Card>
              <CardContent>
                <Typography gutterBottom variant="h5">
                  {t("main.startTitle")}
                </Typography>
                <Typography variant="body2">CryptoChefs quick description.</Typography>
                <Typography variant="body2">...</Typography>
              </CardContent>
            </Card>
            <Box mt={2}>
              <Card>
                <CardContent>
                  <Typography gutterBottom variant="h5">
                    Go to the Store
                  </Typography>
                  <Typography gutterBottom variant="body2">
                    Go to the store to get some AROMA.
                  </Typography>
                  <Button component={Link} to="/store" variant="contained">
                    Go to Store
                  </Button>
                </CardContent>
              </Card>
            </Box>
            <Box mt={2}>
              <Card>
                <CardContent>
                  <Typography gutterBottom variant="h5">
                    NFT sale
                  </Typography>
                  <Typography gutterBottom variant="body2">
                    In the current NFT sale round, 46 out of 100 CryptoChefs NFTs have been minted.{" "}
                  </Typography>
                  <Button component={Link} to="/store" variant="contained">
                    Get NFT now
                  </Button>
                </CardContent>
              </Card>
            </Box>
          </Grid>
          <Grid item sm={12} md={6}>
            <Card>
              <CardContent>
                <Typography gutterBottom variant="h5">
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
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Box my={6}>
          <Typography variant="body2" gutterBottom color="textSecondary">
            © Copyright {new Date().getFullYear()} CryptoChefs
          </Typography>
        </Box>
      </Grid>
    );
  }
}

export default withTranslation()(Main);
