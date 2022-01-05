import React, { Suspense, lazy } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { withTranslation } from 'react-i18next'
import { SnackbarProvider } from 'notistack'
// fonts
import '@fontsource/balsamiq-sans/400.css'
import '@fontsource/balsamiq-sans/700.css'
// material-ui
import { green, blue, red } from '@mui/material/colors'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { theme } from './utils/theme'
// shell
import TopBar from './components/layout/TopBar'
import LoadingSpinner from './components/common/LoadingSpinner'
import ServiceWorkerWrapper from './components/ServiceWorkerWrapper'
import { Container, Box } from '@mui/material'
import AnnouncementBar from './components/layout/AnnouncementBar'
import Collection from './views/Collection/Collection'
import { Helmet } from 'react-helmet'
import Version from './components/layout/Version'
// pages (lazy loading)
const Market = lazy(() => import('./views/Market/Market'))
const Kitchen = lazy(() => import('./views/Kitchen/Kitchen'))
const Buffet = lazy(() => import('./views/Buffet/Buffet'))
const Internal = lazy(() => import('./views/Internal/Internal'))

function App () {
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        maxSnack={3}
        autoHideDuration={6000}
        classes={{
          variantSuccess: {
            backgroundImage: 'linear-gradient(90deg,' + green[700] + ',' +
              green[500] + ')',
          },
          variantError: {
            backgroundImage: 'linear-gradient(90deg,' + red[700] + ',' +
              red[400] + ')',
          },
          variantWarning: {
            backgroundImage: 'linear-gradient(90deg,' + blue[700] + ',' +
              blue[500] + ')',
          },
          variantInfo: {
            backgroundImage: 'linear-gradient(90deg,' + blue[700] + ',' +
              blue[500] + ')',
          },
        }}>
        <Helmet titleTemplate="CryptoChefs | %s">
          <title>Create Crypto Recipes and Start Earning!</title>
        </Helmet>
        <CssBaseline/>
        <Container maxWidth="xl" disableGutters={true} >
          <Box sx={{ backgroundColor: 'background.default', boxShadow: 4 }}>
            <AnnouncementBar/>
            <TopBar/>
            <ServiceWorkerWrapper/>
            <Suspense fallback={<LoadingSpinner/>}>
              <Routes>
                <Route path="/" element={<Navigate replace to="/market" />}/>
                <Route path="/buffet" element={<Buffet/>}/>
                <Route path="/market" element={<Market/>}/>
                <Route path="/kitchen" element={<Kitchen/>}/>
                <Route path="/internal" element={<Internal/>}/>
                <Route path="/collection" element={<Collection/>}/>
              </Routes>
            </Suspense>
            <Version />
          </Box>
        </Container>
      </SnackbarProvider>
    </ThemeProvider>
  )
}

export default withTranslation()(App)