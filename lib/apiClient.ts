import { ApolloClient, InMemoryCache, createHttpLink, from } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { setContext } from '@apollo/client/link/context';
import { getSession } from 'next-auth/react';

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.error(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      );
    });
  }
  if (networkError) {
    console.error(`[Network error]: ${networkError}`);
  }
});

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URL,
  credentials: 'include',
});

const authLink = setContext(async (operation, { headers }) => {
  const publicMutations = [
    'login',
    'registerUser',
    'requestPasswordReset',
    'resetPassword',
    'verifyUserEmail',
    'resendVerificationEmail'
  ];

  const operationDefinition = operation.query.definitions[0];
  const operationType = operationDefinition.kind === 'OperationDefinition' ? operationDefinition.operation : '';
  const operationName = operation.operationName || '';

  console.log(`Operation Type: ${operationType}, Name: ${operationName}`);

  if (operationType === 'mutation' && publicMutations.includes(operationName)) {
    console.log('Public mutation detected, skipping auth header');
    return {
      headers: {
        ...headers,
      }
    };
  }

  try {
    const session = await getSession();
    const token = session?.accessToken;

    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      }
    };
  } catch (error) {
    console.error('Error getting session:', error);
    return {
      headers: {
        ...headers,
      }
    };
  }
});

const apiClient = new ApolloClient({
  link: from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'network-only',
    },
    query: {
      fetchPolicy: 'network-only',
    },
  },
});

export default apiClient;