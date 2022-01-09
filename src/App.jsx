import React, { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import { withTranslation } from 'react-i18next'
// fonts
import "@fontsource/rubik"
import "@fontsource/luckiest-guy"
// material-ui
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { theme } from './utils/theme'
// shell
import Navigation from './components/layout/Navigation'
import LoadingSpinner from './components/common/LoadingSpinner'
import ServiceWorkerWrapper from './components/ServiceWorkerWrapper'
import { Container } from '@mui/material'
import AnnouncementBar from './components/layout/AnnouncementBar'
import Collection from './views/Collection/Collection'
import { Helmet } from 'react-helmet'
import Version from './components/layout/Version'
import SnackbarProvider from './components/snackbars/SnackbarProvider'
// pages (lazy loading)
const Home = lazy(() => import('./views/Home/Home'))
const Market = lazy(() => import('./views/Market/Market'))
const Kitchen = lazy(() => import('./views/Kitchen/Kitchen'))
const Buffet = lazy(() => import('./views/Buffet/Buffet'))
const Internal = lazy(() => import('./views/Internal/Internal'))

function App () {
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider>
        <Helmet titleTemplate="CryptoChefs | %s">
          <title>Create Crypto Recipes and Start Earning!</title>
        </Helmet>
        <CssBaseline/>
        <Container maxWidth="xl" disableGutters={true} >
          <AnnouncementBar/>
          <Navigation/>
          <ServiceWorkerWrapper/>
          <Suspense fallback={<LoadingSpinner/>}>
            <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/buffet" element={<Buffet/>}/>
              <Route path="/market" element={<Market/>}/>
              <Route path="/kitchen" element={<Kitchen/>}/>
              <Route path="/internal" element={<Internal/>}/>
              <Route path="/collection" element={<Collection/>}/>
            </Routes>
          </Suspense>
          <Version />
        </Container>
      </SnackbarProvider>
    </ThemeProvider>
  )
}

export default withTranslation()(App)