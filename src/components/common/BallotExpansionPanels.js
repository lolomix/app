import React, { Component } from "react";
import { withTranslation } from "react-i18next";
//material-ui
import Grid from "@mui/material/Grid";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionActions from "@mui/material/AccordionActions";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import LinearProgress from "@mui/material/LinearProgress";
import Tooltip from "@mui/material/Tooltip";
//icons & images
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import HowToVoteIcon from "@mui/icons-material/HowToVote";
import Check from "@mui/icons-material/Check";
import Schedule from "@mui/icons-material/Schedule";
import LaunchIcon from "@mui/icons-material/Launch";
// custom
import CopyButtonWithText from "./CopyButtonWithText";

class BallotExpansionPanels extends Component {
  state = {
    countdown: {},
  };

  /*
  componentDidMount = () => {

    this.myInterval = setInterval(() => {
      var now = new Date(0).getTime();
      var countdown = {};
      Object.keys(this.props.votings).map((address) => {
        if (this.props.votings[address].endtime) {
          var distance = this.props.votings[address].endtime - now;
          var days = Math.floor(distance / (1000 * 60 * 60 * 24));
          var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
          var seconds = Math.floor((distance % (1000 * 60)) / 1000);
          countdown[address] = days + "d " + hours + "h "  + minutes + "m " + seconds + "s ";
        }
      });
      this.setState({ countdown });
    }, 1000)
  };
*/

  render() {
    const { votings, loading, expertmode, t, localAuditTrail, expanded, totalShares, networkName } = this.props;

    return (
      <React.Fragment>
        {votings && Object.keys(votings).length > 0 ? (
          Object.keys(votings).map((address) => (
            <Accordion expanded={expanded === address} onChange={this.props.handleChange(address)} key={address} TransitionProps={{ unmountOnExit: true }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={address + "-body"} id={address + "header"}>
                {votings[address].closed && (
                  <Tooltip disableFocusListener title={t("base.votingStatusClosed")}>
                    <Check className="iconMarginRight" />
                  </Tooltip>
                )}
                {votings[address].running && (
                  <Tooltip disableFocusListener title={t("base.votingStatusActive")}>
                    <HowToVoteIcon className="iconMarginRight" />
                  </Tooltip>
                )}
                {!votings[address].running && !votings[address].closed && (
                  <Tooltip disableFocusListener title={t("base.votingStatusWaiting")}>
                    <Schedule className="iconMarginRight" />
                  </Tooltip>
                )}
                <Typography variant="body1">{votings[address].title}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box width="100%">
                  {votings[address] && (
                    <>
                      <Typography variant="body2" gutterBottom>
                        {t("base.status")}
                        {": "}
                        {votings[address].running
                          ? t("base.voteOpen")
                          : votings[address].closed
                          ? t("base.voteClosed")
                          : votings[address].starttime > 0
                          ? t("base.voteWaiting")
                          : t("base.voteUndefined")}
                      </Typography>
                      {votings[address].starttime > 0 ? (
                        <Typography variant="body2" gutterBottom>
                          {t("base.runtime", {
                            starttime: votings[address].starttime,
                            endtime: votings[address].endtime,
                          })}
                        </Typography>
                      ) : (
                        <></>
                      )}
                      <Typography variant="body2" gutterBottom>
                        {votings[address].purpose}
                      </Typography>
                      {expertmode && (
                        <Box my={3}>
                          <Typography variant="body2" gutterBottom>
                            Ballot address: {address}
                          </Typography>
                          <Button
                            disabled={loading}
                            color="primary"
                            variant="outlined"
                            component="a"
                            href={"https://" + networkName + ".etherscan.io/address/" + address}
                            target="_blank"
                            rel="noreferrer"
                            startIcon={<LaunchIcon />}
                          >
                            {t("base.viewEtherscan")}
                          </Button>
                          &nbsp;
                          <CopyButtonWithText text={address} buttonText={t("base.copyAddressToClipboard")} />
                        </Box>
                      )}
                    </>
                  )}
                  {votings[address].results && (
                    <Grid container spacing={1}>
                      <Grid item xs={12} sm={4} md={3}>
                        <Typography variant="body2" align="right">
                          {t("base.yes")} : {votings[address].results.aye} ({this.props.getVotingShare(votings[address].results.aye)} %)
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={8} md={9}>
                        <LinearProgress variant="determinate" value={this.props.getVotingShare(votings[address].results.aye)} className="greenProgress" />
                      </Grid>
                      <Grid item xs={12} sm={4} md={3}>
                        <Typography variant="body2" align="right">
                          {t("base.no")}: {votings[address].results.nay} ({this.props.getVotingShare(votings[address].results.nay)} %)
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={8} md={9}>
                        <LinearProgress variant="determinate" value={this.props.getVotingShare(votings[address].results.nay)} className="redProgress" />
                      </Grid>
                      <Grid item xs={12} sm={4} md={3}>
                        <Typography variant="body2" align="right">
                          {t("base.abstain")}: {votings[address].results.abstain} ({this.props.getVotingShare(votings[address].results.abstain)} %)
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={8} md={9}>
                        <LinearProgress variant="determinate" value={this.props.getVotingShare(votings[address].results.abstain)} />
                      </Grid>
                      <Grid item xs={12} sm={4} md={3}>
                        <Typography variant="body2" align="right">
                          {t("base.standdown")}: {votings[address].results.standDown} ({this.props.getVotingShare(votings[address].results.standDown)} %)
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={8} md={9}>
                        <LinearProgress variant="determinate" value={this.props.getVotingShare(votings[address].results.standDown)} />
                      </Grid>
                      <Grid item xs={12} sm={4} md={3}>
                        <Typography variant="body2" align="right">
                          {t("base.notvoted")}:{" "}
                          {totalShares -
                            votings[address].results.standDown -
                            votings[address].results.abstain -
                            votings[address].results.nay -
                            votings[address].results.aye}{" "}
                          (
                          {this.props.getVotingShare(
                            totalShares -
                              votings[address].results.standDown -
                              votings[address].results.abstain -
                              votings[address].results.nay -
                              votings[address].results.aye
                          )}{" "}
                          %)
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={8} md={9}>
                        <LinearProgress
                          variant="determinate"
                          value={this.props.getVotingShare(
                            totalShares -
                              votings[address].results.standDown -
                              votings[address].results.abstain -
                              votings[address].results.nay -
                              votings[address].results.aye
                          )}
                        />
                      </Grid>
                    </Grid>
                  )}
                </Box>
              </AccordionDetails>
              <AccordionActions>
                <ButtonGroup color="primary" disabled={!votings[address].running || votings[address].voters || loading}>
                  <Button
                    variant={
                      votings[address].voters &&
                      localAuditTrail.find((i) => i.address === address) &&
                      localAuditTrail.find((i) => i.address === address).vote === "base.yes" &&
                      "contained"
                    }
                    onClick={() => this.props.handleModalOpen(address, votings[address].title, "base.yes")}
                  >
                    {t("base.yes")}
                  </Button>
                  <Button
                    variant={
                      votings[address].voters &&
                      localAuditTrail.find((i) => i.address === address) &&
                      localAuditTrail.find((i) => i.address === address).vote === "base.no" &&
                      "contained"
                    }
                    onClick={() => this.props.handleModalOpen(address, votings[address].title, "base.no")}
                  >
                    {t("base.no")}
                  </Button>
                  <Button
                    variant={
                      votings[address].voters &&
                      localAuditTrail.find((i) => i.address === address) &&
                      localAuditTrail.find((i) => i.address === address).vote === "base.abstain" &&
                      "contained"
                    }
                    onClick={() => this.props.handleModalOpen(address, votings[address].title, "base.abstain")}
                  >
                    {t("base.abstain")}
                  </Button>
                  <Button
                    variant={
                      votings[address].voters &&
                      localAuditTrail.find((i) => i.address === address) &&
                      localAuditTrail.find((i) => i.address === address).vote === "base.standdown" &&
                      "contained"
                    }
                    onClick={() => this.props.handleModalOpen(address, votings[address].title, "base.standdown")}
                  >
                    {t("base.standdown")}
                  </Button>
                </ButtonGroup>
              </AccordionActions>
            </Accordion>
          ))
        ) : (
          <Typography variant="body2" gutterBottom>
            There are currently no ballots.
          </Typography>
        )}
      </React.Fragment>
    );
  }
}

export default withTranslation()(BallotExpansionPanels);
