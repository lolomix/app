import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  FilledInput,
  FormControl,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { useRecipeCreator } from "../../contexts/recipeCreatorContext";
import Button from "@mui/material/Button";
import React, { useState } from "react";
import ChefSilhouetteIcon from "../icons/ChefSilhouetteIcon";
import { theme } from "../../utils/theme";
import CurrencyInputField from "../form/CurrencyInputField";
import AddCircleIcon from "@mui/icons-material/AddCircle";

/**
 * Define the Recipe Creator Step of the Component
 *
 * @type {number}
 */
const RECIPE_CREATOR_STEP = 2;

/**
 * @returns {JSX.Element|null}
 * @constructor
 */
function RecipeCreateCookStep() {
  const [{ activeStep }] = useRecipeCreator();
  const [stakeAroma, setStakeAroma] = useState(200);
  const [recipeName, setRecipeName] = useState();
  const [chefId, setChefIf] = useState();

  if (activeStep !== RECIPE_CREATOR_STEP) return null;

  const handleRecipeNameUserInput = (e) => {
    setRecipeName(e.target.value)
  }

  const handleStakeAromaUserInput = (e) => {
    setStakeAroma(e.target.value)
  }

  return (
    <Grid container justifyContent="center" alignItems="center">
      <Grid item xs={12} sm={10} md={4}>
        <Card>
          <CardHeader
            title={
              <Typography color="secondary" variant="h5" textAlign="center">
                My Recipe
              </Typography>
            }
          />
          <CardContent>
            <Stack spacing={2} alignItems="center">
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
                >
                  <AddCircleIcon fontSize="small" />
                </IconButton>
              </Box>
              <FormControl variant="outlined" fullWidth required>
                <Typography variant="subtitle2" pb={1}>
                  Recipe name
                </Typography>
                <FilledInput
                  disableUnderline
                  hiddenLabel
                  id="recipe-name"
                  onChange={handleRecipeNameUserInput}
                  value={recipeName}
                />
              </FormControl>
              <CurrencyInputField
                required
                id="stake-aroma"
                currency="AROMA"
                label="Stake amount*"
                onUserInput={handleStakeAromaUserInput}
                value={stakeAroma}
              />
              <Typography variant="caption">
                *A minimum of 200 Aroma must be staked.
              </Typography>
            </Stack>
          </CardContent>
          <CardActions>
            <Button
              fullWidth
              variant="yellowContainedSmall"
              size="large"
              // onClick={handleCreate}
            >
              Cook
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
}

export default RecipeCreateCookStep;
