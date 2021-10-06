import React, { Component } from "react";
import { withTranslation } from "react-i18next";
//import { Link } from "react-router-dom";
//material-ui
//import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
//import Card from "@mui/material/Card";
//import CardActionArea from "@mui/material/CardActionArea";
//import CardContent from "@mui/material/CardContent";
import OpeningSoon from "../../components/common/OpeningSoon";

class Kitchen extends Component {
  componentDidMount() {
    document.body.className = "kitchen";
  }
  render() {
    return (
      <Grid item xs={12} md={9} xl={6}>
        <OpeningSoon />
        {/* 
        <Grid container spacing={2}>
          <Grid item sm={12} md={6}>
            <Card>
              <CardActionArea component={Link} to="/store">
                <CardContent>
                  <Typography gutterBottom variant="h5">
                    Become a chef
                  </Typography>
                  <Typography variant="body2">It looks like that you are not yet a chef. In order to create a recipe, you must acquire a chef NFT.</Typography>
                  <Typography variant="body2">Click here to go the store and get a chef NFT.</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item sm={12} md={6}>
            <Card>
              <CardActionArea component={Link} to="/buffet">
                <CardContent>
                  <Typography gutterBottom variant="h5">
                    Go to the buffet
                  </Typography>
                  <Typography variant="body2">You don't want to be a chef yourself? Go directly to the buffet and check out the recipes out there.</Typography>
                  <Typography variant="body2">Click here to go the buffet and spend some AROMA tokens.</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
        */}
      </Grid>
    );
  }
}

export default withTranslation()(Kitchen);
