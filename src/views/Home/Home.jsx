import { withTranslation } from "react-i18next";
import { Card, Grid } from "@mui/material";

function Home() {
  return (
    <Grid mt={5} container alignItems="center" justifyContent="center">
      <Grid item xs={12} md={9} xl={6}>
        <Card>HOME VIEW</Card>
      </Grid>
    </Grid>
  );
}

export default withTranslation()(Home);
