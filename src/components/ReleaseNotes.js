import React, { Component } from "react";
import { withTranslation } from "react-i18next";
//material-ui
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
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
