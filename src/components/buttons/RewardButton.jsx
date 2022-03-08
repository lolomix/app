import { useState } from "react";
import { Grid, Typography } from "@mui/material";
import SquareButton from "../buttons/SquareButton";
import ChestOpen from "../../assets/chest-open.png";
import ChestClose from "../../assets/chest-close.png";

const RewardButton = () => {
  /*hard coded info - to be replaced */

  const [reward, setReward] = useState(200);
  const [hoursLeft, setHoursLeft] = useState(0);
  const [minutesLeft, setMinutesLeft] = useState(0);

  const handleClick = () => {
    setReward(0);
    setHoursLeft(23);
    setMinutesLeft(59);
  };

  return (
    <Grid container item xs={12} mt={3} justifyContent="flex-end">
      {window.location.pathname === "/" && (
        <Grid
          container
          item
          justifyContent="space-between"
          alignItems="center"
          width={{ xs: "100%", md: "130px" }}
          sx={{
            backgroundColor: "rgba(0, 0, 0, 0.11)",
            padding: "10px",
            borderRadius: 2,
          }}
        >
          <Grid item order={{ xs: 2, md: 1 }} md={12} textAlign="center">
            <SquareButton
              size="medium"
              color="dark"
              image={
                <img
                  src={
                    reward > 0 && hoursLeft === 0 && minutesLeft === 0
                      ? ChestOpen
                      : ChestClose
                  }
                  width="fit-content"
                  height="fit-content"
                  alt="reward-chest"
                />
              }
              title={
                reward > 0 && hoursLeft === 0 && minutesLeft === 0
                  ? "Collect"
                  : "Collected"
              }
              href=""
              onClick={handleClick}
            />
          </Grid>
          <Grid
            item
            order={{ xs: 1, md: 2 }}
            md={12}
            textAlign={{ xs: "left", md: "center" }}
          >
            {hoursLeft === 0 && minutesLeft === 0 ? (
              <>
                <Typography variant="h6" pt={1}>
                  Total Reward
                </Typography>
                <Typography variant="h5">{reward} AROMA</Typography>
              </>
            ) : (
              <>
                <Typography variant="h6" pt={1}>
                  Next Reward
                </Typography>
                <Typography variant="h5">
                  {hoursLeft}H {minutesLeft}Min
                </Typography>
              </>
            )}
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};
export default RewardButton;
