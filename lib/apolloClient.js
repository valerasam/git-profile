import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { setContext } from "@apollo/client/link/context";

// import jwt from "next-auth/jwt";

// export default async (req, res) => {
//   const token = await jwt.getToken({ req, secret });
//   console.log("JSON Web Token", token);
//   res.end();
// }

export default function createApolloClient() {
  const httpLink = new HttpLink({
    uri: "https://api.github.com/graphql",
  });
  const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists

    // const token = await jwt.getToken({ req, secret });
    // console.log(token);
    // res.end();

    const token = ('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');
    // return the headers to the context so httpLink can read them

    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      }
    };
  });

  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
  });
}