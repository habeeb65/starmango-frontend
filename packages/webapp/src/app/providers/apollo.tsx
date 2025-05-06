import React, { ReactNode } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider as BaseApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

interface ApolloProviderProps {
  children: ReactNode;
}

/**
 * Apollo Provider component for GraphQL API connectivity
 * Configures the Apollo client to work with the Django GraphQL backend
 */
export const ApolloProvider = ({ children }: ApolloProviderProps) => {
  // Create an HTTP link to the GraphQL API
  const httpLink = createHttpLink({
    uri: process.env.REACT_APP_GRAPHQL_URL || '/graphql/',
    credentials: 'include', // Important for cookies and CSRF
  });

  // Add authorization headers to requests
  const authLink = setContext((_, { headers }) => {
    // Get token from localStorage or cookies
    const token = localStorage.getItem('auth_token');
    
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  });

  // Create Apollo client
  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'cache-and-network',
      },
    },
  });

  return <BaseApolloProvider client={client}>{children}</BaseApolloProvider>;
};