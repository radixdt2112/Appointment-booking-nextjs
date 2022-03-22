import PropTypes from 'prop-types';
import * as React from 'react';
import { Provider } from 'react-redux';
import store from '../store';

import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import theme from '../theme';



import { QueryClient, QueryClientProvider, Hydrate } from 'react-query';

// Create a client
const queryClient = new QueryClient();


import { CacheProvider } from '@emotion/react';
import createEmotionCache from '../src/createEmotionCache';

const clientSideEmotionCache = createEmotionCache();

import { PageWrapper } from '../components';

function MyApp({ Component, pageProps, emotionCache = clientSideEmotionCache }) {

  // const Layout = layouts[Component.layout] || ((children) => <>{children}</>);

  // const pageLayout = Component.layout || ((page) => page);

  return (<>
    <Provider store={store}>
      <CacheProvider value={emotionCache}>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={theme}>
            <QueryClientProvider client={queryClient}>
              <Hydrate state={pageProps.dehydratedState}>
                <PageWrapper pageProps={pageProps}>
                  <CssBaseline />
                  <Component {...pageProps} />
                </PageWrapper>
              </Hydrate>
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