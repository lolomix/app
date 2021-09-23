import React, { Component } from "react";
import { withTranslation } from "react-i18next";
//material-ui
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Hidden from "@mui/material/Hidden";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

class AccountSecurity extends Component {
  state = {
    isPersisted: false,
  };

  async componentDidMount() {
    // Check if site's storage has been marked as persistent
    if (navigator.storage && navigator.storage.persist) {
      const isPersisted = await navigator.storage.persisted();
      console.log(`Persisted storage granted: ${isPersisted}`);
      this.setState({ isPersisted });
    }
  }

  setPersistentStorage = async () => {
    // Request persistent storage for site
    if (navigator.storage && navigator.storage.persist) {
      const isPersisted = await navigator.storage.persist();
      console.log(`Persisted storage granted: ${isPersisted}`);
      this.setState({ isPersisted });
    }
  };

  render() {
    const { t } = this.props;

    return (
      <Box p={2}>
        <Box mb={4}>
          <Typography variant="h2" gutterBottom>
            Choose account
          </Typography>
          <Chip size="small" color="secondary" label="coming soon" />
          <Hidden xsUp>
            <FormControl>
              <InputLabel id="demo-simple-select-label">Account</InputLabel>
              <Select labelId="demo-simple-select-label" id="demo-simple-select">
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Hidden>
        </Box>
        <Box mb={4}>
          <Typography variant="h2" gutterBottom>
            {t("wallet.setPassword")}
          </Typography>
          <Chip size="small" color="secondary" label="coming soon" />
          <Hidden xsUp>
            <Typography variant="body2" gutterBottom>
              {t("wallet.setPasswordDescription")}
            </Typography>
            <Button color="primary" variant="outlined" onClick={this.setPassword} disabled>
              {t("wallet.setPassword")}
            </Button>
          </Hidden>
        </Box>
        <Box mb={4}>
          <Typography variant="h2" gutterBottom>
            {t("wallet.PersistentStorage")}
          </Typography>
          <Chip size="small" color="secondary" label="coming soon" />
          <Hidden xsUp>
            <Typography variant="body2" gutterBottom>
              {t("wallet.PersistentStorageDescription")}
            </Typography>
            <Button color="primary" variant="outlined" disabled={this.state.isPersisted} onClick={this.setPersistentStorage}>
              {t("wallet.PersistentStorageSwitch")}
            </Button>
            <Typography variant="body2" gutterBottom>
              {this.state.isPersisted && this.props.t("wallet.PersistentStorageStatus")}
            </Typography>
          </Hidden>
        </Box>
      </Box>
    );
  }
}

export default withTranslation()(AccountSecurity);
