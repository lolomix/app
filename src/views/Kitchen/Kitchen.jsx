import React from "react";
import { withTranslation } from "react-i18next";
// material-ui
import { Button, Typography, Stack, Card, CardContent } from "@mui/material";
// custom
import Layout from "../../components/layout/Layout";
import KitchenIcon from "../../components/icons/KitchenIcon";
import KitchenMainImage from "../../components/icons/KitchenMainImage";
import { theme } from "../../utils/theme";
import { Link as RouterLink } from "react-router-dom";

/**
 * @returns {JSX.Element}
 * @constructor
 */
function Kitchen() {
  return (
    <Layout
      helmetTitle="Kitchen"
      title="Kitchen"
      subTitle="Where all the magic starts"
      icon={<KitchenIcon sx={{ fontSize: 48, marginTop: 0.5 }} />}
      buttonType="home"
    >
      <Card>
        <CardContent>
          <Stack justifyContent="center" alignItems="center" spacing={1} pt={1}>
            <Typography variant="h4" color="secondary">
              Create and Compete
            </Typography>
            <KitchenMainImage sx={{ fontSize: 250 }} />
            <Stack spacing={1.5}>
              <Typography
                variant="h5"
                textAlign="center"
                color={theme.palette.text.disabled}
              >
                Make sure you have Minimum 200 AROMA
              </Typography>
              <Button
                fullWidth
                size="massive"
                variant="yellowContained"
                to="/kitchen/recipe/create"
                component={RouterLink}
              >
                Cook A Recipe
              </Button>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </Layout>
  );
}

export default withTranslation()(Kitchen);
