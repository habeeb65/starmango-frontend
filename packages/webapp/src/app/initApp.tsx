import React, { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { QueryClientProvider } from '@tanstack/react-query';

import { App } from './app.component';
import { ApiProvider } from './providers/apiProvider';
import { ApolloProvider } from './providers/apollo';
import { theme } from './theme';
import { ErrorFallback } from './errorFallback.component';
import { queryClient } from './config/reactQuery';

// Initialize i18n
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        translation: {
          // Default translations
          common: {
            loading: 'Loading...',
            error: 'An error occurred',
          },
        },
      },
    },
  });

export const initApp = (root: ReturnType<typeof createRoot>) => {
  root.render(
    <React.StrictMode>
      <Suspense fallback={<div>Loading...</div>}>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <QueryClientProvider client={queryClient}>
            <Router>
              <ChakraProvider theme={theme}>
                <ApiProvider>
                  <ApolloProvider>
                    <App />
                  </ApolloProvider>
                </ApiProvider>
              </ChakraProvider>
            </Router>
          </QueryClientProvider>
        </ErrorBoundary>
      </Suspense>
    </React.StrictMode>
  );
};