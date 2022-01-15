import React from "react";
import { withTranslation } from "react-i18next";
// material-ui
import Grid from "@mui/material/Grid";
import { Helmet } from "react-helmet";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
// custom
import Headline from "../../components/layout/Headline";
import RecipeCreateStepper from "../../components/common/RecipeCreateStepper";
import RecipeOnPlaceIcon from "../../components/icons/RecipeOnPlaceIcon";

/**
 * @returns {JSX.Element}
 * @constructor
 */
function KitchenRecipeCreate() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Helmet>
        <title>Kitchen - Create Recipe</title>
      </Helmet>
      <Box pb={10} pt={1}>
        <Container as="section">
          {/* @todo maybe we could leave some headline? However, we need a back button for sure.  */}
          <Headline>Kitchen</Headline>
          <Grid mb={4} container justifyContent="center" alignItems="center">
            <Grid item xs sm={8} md={6} textAlign="center">
              <Card>
                {/* Box used as CardContent adds an annoying padding */}
                <Box p={2}>
                  <RecipeCreateStepper />
                </Box>
              </Card>
            </Grid>
          </Grid>
          <Grid container justifyContent="center" alignItems="center">
            <Grid item xs sm={6} md={4} textAlign="center">
              <Card>
                <CardHeader
                  title={
                    <Typography color="secondary" variant="h4">
                      Please add tokens to your recipe
                    </Typography>
                  }
                />
                <CardContent>
                  <RecipeOnPlaceIcon sx={{ fontSize: "12rem" }} />
                </CardContent>
                <CardActions>
                  <Button
                    fullWidth
                    shape="squarish"
                    variant="contained"
                    onClick={handleClickOpen}
                  >
                    Add Tokens
                  </Button>
                  {/* @todo abstraction of this Dialog Component */}
                  <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="customized-dialog-title"
                  >
                    <DialogTitle>Select a token</DialogTitle>
                    <DialogContent>Content</DialogContent>
                    <DialogActions>
                      {/* @todo proper styling of button */}
                      <Button onClick={handleClose}>Save changes</Button>
                    </DialogActions>
                  </Dialog>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}

export default withTranslation()(KitchenRecipeCreate);
