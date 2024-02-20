import { ApolloClient, InMemoryCache } from "@apollo/client";

/**
 * initialize apollo client with our graphql endpoint
 * @returns ApolloClient
 */
const createApolloClient = () => {
  return new ApolloClient({
    uri: 'https://rickandmortyapi.com/graphql',
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;