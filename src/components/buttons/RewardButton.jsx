import { useEffect } from "react";
import { Grid, Typography } from "@mui/material";
import SquareButton from "../buttons/SquareButton";
import ChestOpen from "../../assets/chest-open.png";
import ChestClose from "../../assets/chest-close.png";
import useRewardAccumulated from "../../hooks/backend/reward/useRewardAccumulated";
import { useEthers } from "@usedapp/core";
import useRewardCollectAccumulated from "../../hooks/backend/reward/useRewardCollectAccumulated";
import { TRANSACTION_IN_PROGRESS_KEY } from "../../hooks/snackbar/usePromiseTransactionSnackbarManager";
import SnackbarAction from "../snackbars/SnackbarAction";
import { useSnackbar } from "notistack";

function RewardButton() {
  const { account } = useEthers();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const {
    reward,
    hasReward,
    refetch: refetchReward,
  } = useRewardAccumulated(account);
  const { mutate: sendRewardCollection, isLoading: rewardCollectionIsLoading } =
    useRewardCollectAccumulated();

  useEffect(() => {
    if (rewardCollectionIsLoading) {
      enqueueSnackbar("Transaction in progress", {
        key: TRANSACTION_IN_PROGRESS_KEY,
        variant: "warning",
        persist: true,
        action: <SnackbarAction />,
      });
    } else {
      closeSnackbar(TRANSACTION_IN_PROGRESS_KEY);
      refetchReward();
    }
  }, [
    rewardCollectionIsLoading,
    enqueueSnackbar,
    closeSnackbar,
    refetchReward,
  ]);

  const handleClick = () => {
    if (!hasReward()) return;
    sendRewardCollection(account);
  };

  return (
    <Grid container item xs={12} mt={3} justifyContent="flex-end">
      {window.location.pathname === "/" && account && (
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
                  src={hasReward() ? ChestOpen : ChestClose}
                  width="fit-content"
                  height="fit-content"
                  alt="reward-chest"
                />
              }
              title={hasReward() ? "Collect" : ""}
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
            <Typography variant="h6" pt={1}>
              {hasReward() ? "Reward" : "No Reward"}
            </Typography>
            {hasReward() && (
              <Typography variant="h5">{reward?.toFixed(2)} AROMA</Typography>
            )}
          </Grid>
        </Grid>
      )}
    </Grid>
  );
}

export default RewardButton;
