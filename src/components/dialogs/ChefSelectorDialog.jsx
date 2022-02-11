import {
  Box,
  Dialog,
  DialogContent,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import DialogTitleWithCloseButton from "./DialogTitleWithCloseButton";
import { useChefIdsOfOwner } from "../../hooks/useChefIdsOfOwner";
import React from "react";
import { theme } from "../../utils/theme";
import ChefSilhouetteIcon from "../icons/ChefSilhouetteIcon";
import AddCircleIcon from "@mui/icons-material/AddCircle";

/**
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
function ChefSelectorDialog(props) {
  const { handleClose, handleSelect, ...rest } = props;

  const nfts = useChefIdsOfOwner();

  return (
    <Dialog {...rest}>
      <DialogTitleWithCloseButton variant="h5" handleClose={handleClose}>
        Select a CHEF
      </DialogTitleWithCloseButton>
      <DialogContent>
        <Grid container spacing={2} mt={0.1}>
          {nfts ? (
            nfts.map((tokenID) => (
              <Grid key={tokenID.toString()} item xs={12} sm={6}>
                <Box
                  position="relative"
                  bgcolor="grey.A100"
                  borderRadius={`${theme.shape.borderRadius}px`}
                  textAlign="center"
                  px={2}
                  py={3}
                >
                  <ChefSilhouetteIcon sx={{ fontSize: "6rem" }} />
                  <IconButton
                    size="xsmall"
                    variant="contained"
                    color="success"
                    inverseColor
                    sx={{
                      position: "absolute",
                      right: theme.spacing(-0.7),
                      top: theme.spacing(-0.7),
                    }}
                    onClick={() => handleSelect(tokenID.toNumber())}
                  >
                    <AddCircleIcon fontSize="small" />
                  </IconButton>
                </Box>
                <Typography variant="subtitle2" textAlign="center">
                  CHEF #{tokenID.toString()}
                </Typography>
              </Grid>
            ))
          ) : (
            <Typography>TODO: Buy CHEF</Typography>
          )}
        </Grid>
      </DialogContent>
    </Dialog>
  );
}

export default ChefSelectorDialog;
