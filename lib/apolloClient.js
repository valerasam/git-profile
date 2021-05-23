import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { setContext } from "@apollo/client/link/context";


export default function createApolloClient() {
  const httpLink = new HttpLink({
    uri: "https://api.github.com/graphql",
  });
  const authLink = setContext((_, { headers }) => {
    localStorage.setItem("token", "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");
    const token = localStorage.getItem('token');

    // const token = "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";

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