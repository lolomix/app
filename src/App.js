import React, { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import { withTranslation } from 'react-i18next'
import { SnackbarProvider } from 'notistack'
import { Web3ReactProvider } from '@web3-react/core'
import Web3 from 'web3'
// fonts
import '@fontsource/lexend/300.css'
import '@fontsource/lexend/400.css'
import '@fontsource/lexend/500.css'
import '@fontsource/lexend/700.css'
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
// pages (lazy loading)
const Main = lazy(() => import('./views/Main/Main'))
// const Web3Test = lazy(() => import("./views/Web3/Web3Test"));
const Store = lazy(() => import('./views/Store/Store'))
const Kitchen = lazy(() => import('./views/Kitchen/Kitchen'))
const Buffet = lazy(() => import('./views/Buffet/Buffet'))
const Internal = lazy(() => import('./views/Internal/Internal'))

/**
 * Instantiating a web3 convenience library object from a low-level provider.
 * e.g. ethers or web3.js
 *
 * @param provider
 * @returns {Web3}
 */
function getLibrary (provider) {
  return new Web3(provider)
}

function App () {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
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
          <CssBaseline/>
          <Container maxWidth="xl" disableGutters={true} >
            <Box sx={{ backgroundColor: 'background.default', boxShadow: 4 }}>
              {process.env.REACT_APP_CHAIN !== 'matic' && <AnnouncementBar/>}
              <TopBar/>
              <ServiceWorkerWrapper/>
              <Suspense fallback={<LoadingSpinner/>}>
                <Routes>
                  <Route path="/" element={<Store/>}/>
                  <Route path="/start" element={<Main/>}/>
                  <Route path="/buffet" element={<Buffet/>}/>
                  <Route path="/store" element={<Store/>}/>
                  <Route path="/kitchen" element={<Kitchen/>}/>
                  <Route path="/internal" element={<Internal/>}/>
                  <Route path="/collection" element={<Collection/>}/>
                </Routes>
              </Suspense>
            </Box>
          </Container>
        </SnackbarProvider>
      </ThemeProvider>
    </Web3ReactProvider>
  )
}

export default withTranslation()(App)