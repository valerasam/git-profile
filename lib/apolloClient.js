import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { setContext } from "@apollo/client/link/context";


export default function createApolloClient() {
  const httpLink = new HttpLink({
    uri: "https://api.github.com/graphql",
  });
  const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('token');
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