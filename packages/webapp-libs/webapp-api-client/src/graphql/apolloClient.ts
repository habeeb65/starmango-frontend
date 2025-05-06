import { ApolloClient, InMemoryCache, HttpLink, ApolloLink, from, split } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { getMainDefinition } from '@apollo/client/utilities';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { authService } from '../api/auth';
import { getGraphQLUrl, getWsUrl } from '../api/helpers';

/**
 * Create authorization link with JWT token
 */
const authLink = new ApolloLink((operation, forward) => {
  // Get the authentication token from storage
  const token = authService.getAuthToken();
  
  // Add token to the headers
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  }));
  
  return forward(operation);
});

/**
 * Create error handling link to handle auth errors
 */
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    for (const error of graphQLErrors) {
      console.error(
        `[GraphQL error]: Message: ${error.message}, Location: ${error.locations}, Path: ${error.path}`
      );
      
      // Handle authentication errors by refreshing token or redirecting to login
      if (error.extensions?.code === 'UNAUTHENTICATED') {
        // Try to refresh the token or redirect to login
        authService.refreshToken().catch(() => {
          window.location.href = '/auth/login';
        });
      }
    }
  }
  
  if (networkError) {
    console.error(`[Network error]: ${networkError}`);
  }
});

/**
 * Create HTTP link for standard GraphQL queries and mutations
 */
const httpLink = new HttpLink({
  uri: getGraphQLUrl(),
  credentials: 'include',
});

/**
 * Create WebSocket link for GraphQL subscriptions
 */
const wsLink = typeof window !== 'undefined' 
  ? new GraphQLWsLink(
      createClient({
        url: getWsUrl(),
        connectionParams: () => {
          const token = authService.getAuthToken();
          return {
            authorization: token ? `Bearer ${token}` : '',
          };
        },
      })
    )
  : null;

/**
 * Split links based on operation type
 * - Use WebSocket link for subscriptions
 * - Use HTTP link for queries and mutations
 */
const splitLink = wsLink 
  ? split(
      ({ query }) => {
        const definition = getMainDefinition(query);
        return (
          definition.kind === 'OperationDefinition' &&
          definition.operation === 'subscription'
        );
      },
      wsLink,
      httpLink
    )
  : httpLink;

/**
 * Create Apollo client
 */
export const createApolloClient = () => {
  return new ApolloClient({
    link: from([errorLink, authLink, splitLink]),
    cache: new InMemoryCache(),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'cache-and-network',
        errorPolicy: 'all',
      },
      query: {
        fetchPolicy: 'network-only',
        errorPolicy: 'all',
      },
      mutate: {
        errorPolicy: 'all',
      },
    },
  });
};

// Default Apollo client instance
export const apolloClient = createApolloClient();