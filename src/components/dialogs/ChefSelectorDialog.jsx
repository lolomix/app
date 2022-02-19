import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import DialogTitleWithCloseButton from "./DialogTitleWithCloseButton";
import { useChefIdsOfOwner } from "../../hooks/chef/useChefIdsOfOwner";
import { Link as RouterLink } from "react-router-dom";
import { theme } from "../../utils/theme";
import ChefSilhouetteIcon from "../icons/ChefSilhouetteIcon";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useRecipeIdsOfChefs } from "../../hooks/recipe/useRecipeIdsOfChefs";
import { useRecipeCreator } from "../../contexts/recipeCreator/recipeCreatorContext";

/**
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
function ChefSelectorDialog(props) {
  const { handleClose, handleSelect, ...rest } = props;

  const chefs = useChefIdsOfOwner();
  const recipeIdsOfChefs = useRecipeIdsOfChefs(chefs);
  const [{ recipePerChef }] = useRecipeCreator();

  return (
    <Dialog {...rest}>
      <DialogTitleWithCloseButton variant="h5" handleClose={handleClose}>
        Select a CHEF
      </DialogTitleWithCloseButton>
      <DialogContent>
        {chefs ? (
          <>
            <Typography textAlign="center" variant="body2">
              Every CHEF comes equipped with three pouches that each can hold a
              recipe. This is indicated below the image.
            </Typography>
            <Grid container spacing={2} mt={0.1} justifyContent="center">
              {chefs?.map((tokenID, index) => (
                <Grid key={tokenID.toString()} item xs={6} sm={5}>
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
                      disabled={
                        recipeIdsOfChefs?.[index]?.length >= recipePerChef
                      }
                      onClick={() => handleSelect(tokenID.toNumber())}
                    >
                      <AddCircleIcon fontSize="small" />
                    </IconButton>
                  </Box>
                  <Typography variant="subtitle2">
                    <Grid
                      container
                      justifyContent="space-between"
                      spacing={1}
                      px={0.5}
                    >
                      <Grid item>CHEF #{tokenID.toString()}</Grid>
                      <Grid item>
                        {recipeIdsOfChefs?.[index]?.length}/{recipePerChef}
                      </Grid>
                    </Grid>
                  </Typography>
                </Grid>
              ))}
            </Grid>
          </>
        ) : (
          <Typography textAlign="center">
            It seems like you do not own any CHEFs. Please head over to the
            Market to buy one!
          </Typography>
        )}
      </DialogContent>
      {!chefs && (
        <DialogActions>
          <Button
            disableElevation
            elongatedwidth="30"
            bg="yellowContained"
            component={RouterLink}
            to="/market/chef/buy"
          >
            Buy a CHEF
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
}

export default ChefSelectorDialog;
