import '../styles/global.css';
import React from 'react';
import { Provider } from 'next-auth/client';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from '../lib/apollo';

function MyApp({ Component, pageProps }) {
  const ApolloClient = useApollo(pageProps.initialApolloState);

  return (
    <ApolloProvider client={ApolloClient}>
      <Provider session={pageProps.session}>
        <Component {...pageProps} />
      </Provider>
    </ApolloProvider>

  );
}

export default MyApp;