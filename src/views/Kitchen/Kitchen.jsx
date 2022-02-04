import React from "react";
import { withTranslation } from "react-i18next";
// material-ui
import {Box, Button, Typography, Stack, Card, CardContent } from "@mui/material";
// custom
import ViewHeading from "../../components/layout/ViewHeading";
import OpeningSoon from "../../components/common/OpeningSoonCard";
import Layout from "../../components/layout/Layout";
import KitchenIcon from "../../components/icons/KitchenIcon";

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
    >
      <Card>
        <CardContent>
          <Stack justifyContent="center" alignItems="center" spacing={3} pt={1}>
            <Typography variant="h4" color="secondary">
              Create and Compete
            </Typography>
            <KitchenIcon sx={{ fontSize: 150 }} />
            <Stack spacing={1.5}>
            <Typography variant="h5" textAlign="center" sx={{opacity:"0.6"}}>
              Make sure you have Minimum 200 AROMA
            </Typography>
            <Button
              fullWidth
              size="massive"
              variant="yellowContained"
              href="/kitchen/recipe/create"
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
