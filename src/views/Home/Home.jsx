import { withTranslation } from "react-i18next";
import { Grid } from '@mui/material'

function Home() {

  return (
    <Grid item xs={12} md={9} xl={6}>
      Home
    </Grid>
  )
}

export default withTranslation()(Home);
