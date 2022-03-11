import PropTypes from 'prop-types';
import * as React from 'react';
import { Provider } from 'react-redux';
import store from '../store';

import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import theme from '../theme';



import { QueryClient, QueryClientProvider } from 'react-query';

// Create a client
const queryClient = new QueryClient();

import { CacheProvider } from '@emotion/react';
import createEmotionCache from '../src/createEmotionCache';
const clientSideEmotionCache = createEmotionCache();


function MyApp({ Component, pageProps, emotionCache = clientSideEmotionCache }) {
  return (<>
    <Provider store={store}>
      <CacheProvider value={emotionCache}>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={theme}>
            <QueryClientProvider client={queryClient}>
              <CssBaseline />
              <Component {...pageProps} />
            </QueryClientProvider>
          </ThemeProvider>
        </StyledEngineProvider>
      </CacheProvider>
    </Provider></>)
}

export default MyApp

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};