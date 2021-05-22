import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { setContext } from "@apollo/client/link/context";



export default function createApolloClient() {

  const httpLink = new HttpLink({
    uri: "https://api.github.com/graphql",
  });
  const authLink = setContext((_, { headers }) => {

    const token = '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';

    // const token = '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';
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : ''
      }
    };
  });

  return new ApolloClient({
    ssrMode: true,
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
  });
}