import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Blockies from "react-blockies";
//material-ui
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
//icons
import Settings from "@material-ui/icons/Settings";
import AddCircleOutline from "@material-ui/icons/AddCircleOutline";
//custom
import CopyButton from "./common/CopyButton";

class MainHistory extends Component {
  state = {
    assemblies: [],
  };

  componentDidMount() {
    const assemblies = JSON.parse(window.localStorage.getItem("assemblies"));
    if (assemblies) {
      this.setState({ assemblies });
    }
  }

  render() {
    const { t } = this.props;
    const { assemblies } = this.state;

    return assemblies.length > 0 ? (
      <Box p={2}>
        <Typography variant="h2"> {t("main.recentAssemblies")}</Typography>
        <List>
          {assemblies.map((item) => (
            <ListItem button component={Link} to={"/" + item.chain + "/assembly/" + item.address} key={item.address}>
              <Tooltip disableFocusListener title={item.address}>
                <ListItemAvatar>
                  <Avatar>
                    <Blockies seed={item.address} size={10} scale={4} className="blockies" />
                  </Avatar>
                </ListItemAvatar>
              </Tooltip>
              <ListItemText
                primary={
                  <Typography variant="body2" noWrap>
                    {item.identifier ? item.identifier : item.address}
                  </Typography>
                }
                secondary={
                  <Typography variant="body2" color="textSecondary" noWrap>
                    Type: {item.type} | Blockchain: {item.chain} | Date: {item.datetime ? t("base.dateTime", { date: new Date(item.datetime) }) : ""}
                  </Typography>
                }
              />
              <ListItemSecondaryAction>
                <Tooltip title="Admin">
                  <IconButton component={Link} to={"/" + item.chain + "/assembly/" + item.address + "/admin"}>
                    <Settings />
                  </IconButton>
                </Tooltip>
                <CopyButton text={item.address} />
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Box>
    ) : (
      <Box p={2}>
        <Typography variant="h2" gutterBottom>
          History
        </Typography>
        <Typography variant="body2" gutterBottom>
          It seems that you do not have created or joined any assembly so far.
        </Typography>
        <Typography variant="body2" gutterBottom>
          Why not start now and create one?
        </Typography>
        <Button margin="normal" color="primary" variant="outlined" component={Link} to="/new" startIcon={<AddCircleOutline />}>
          {t("main.startCreateButton")}
        </Button>
      </Box>
    );
  }
}

export default withTranslation()(MainHistory);
