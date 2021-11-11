import React, { useState } from 'react'
import { withTranslation } from 'react-i18next'
// material-ui
import {
  Avatar,
  Box,
  Card,
  CardContent, Chip,
  Container, Divider,
  Grid, Stack, Typography,
} from '@mui/material'

import Headline from '../../components/layout/Headline'
import DripDivider from '../../components/layout/DripDivider'
import Blockies from 'react-blockies'
import NFT from '../../components/web3/NFT'

function Collection () {
  const [filterData] = useState(
    [
      { key: 0, label: 'All' },
      { key: 1, label: 'Owned' },
      { key: 2, label: 'Classic' },
      { key: 3, label: 'Epic' },
      { key: 4, label: 'Legendary' },
    ],
  )
  // todo: remove hard-coded ids
  const nfts = [1, 2, 3, 4, 5, 6, 9999]

  return (
    <>
      <Box pb={10} sx={{ backgroundColor: 'background.default' }}>
        <DripDivider variant={1} color="sunGlow.main"/>
        <Container as="section">
          <Grid container spacing={4}>
            <Grid item md={3}>
              <Card
                elevation={2}
                sx={{
                  // maxWidth: "280px",
                  paddingTop: '16px',
                  paddingBottom: '16px',
                  backgroundColor: 'white',
                }}>
                <CardContent>
                  <Stack spacing={2}>
                    <Avatar sx={{ width: 200, height: 200 }}>
                      <Blockies seed="0xFc65cC3C76c232d23d23d2d3d23d23d2d"
                                size={30} scale={7} className="blockies"/>
                    </Avatar>
                    <Typography variant="h2">
                      User Name
                    </Typography>
                    <Typography mb={4}>
                      0xFc6c232d23d23...
                    </Typography>
                    <Divider/>
                    <Typography mt={4}>
                      Lorem ipsum dolor sam...
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
            <Grid item md={9}>
              <Grid container mb={4} spacing={1}>
                {filterData.map((data) => {
                  return (
                    <Grid key={data.key} item>
                      <Chip
                        label={data.label}
                        clickable
                        variant="outlined"
                        component="a"
                        href="#basic-chip"
                        onDelete={data.label === 'React'
                          ? undefined
                          : undefined}
                      />
                    </Grid>
                  )
                })}
              </Grid>
              <Grid container spacing={4}>
                {nfts.map((value) => (
                  <Grid key={value} item sm={4}>
                    <NFT tokenID={value}/>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>

        </Container>
      </Box>

      <Box id="faq" pb={10} sx={{ backgroundColor: 'darkSkyBlue.main' }}>
        <DripDivider variant={2} color="cafeNoir.main"/>
        <Container as="section">
          <Headline variant="h2" title="FAQ"/>
          <Grid container justifyContent="center" alignItems="center"
                spacing={2}>
            <Grid item xs={12} sm={10} md={8}>
              {/* <FAQ faqKeys={faqKeys} /> */}
              test
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  )
}

export default withTranslation()(Collection)
