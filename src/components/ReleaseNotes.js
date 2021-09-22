import React, { Component } from "react";
import { withTranslation } from "react-i18next";
//material-ui
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import releases from "../ReleaseNotes.json";

class ReleaseNotes extends Component {
  render() {
    const { t } = this.props;

    return (
      <Grid item xs={12} md={9} xl={6} className="defaultpadding">
        <Typography variant="h1" gutterBottom>
          {t("releasenotes.title")}
        </Typography>
        <Box my={4}>
          <List>
            {releases.map((item, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={item.release}
                  secondary={item.notes.reduce(
                    (p, c) =>
                      p ? (
                        <>
                          {p}
                          <br />
                          {c}
                        </>
                      ) : (
                        c
                      ),
                    null
                  )}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Grid>
    );
  }
}

export default withTranslation()(ReleaseNotes);
