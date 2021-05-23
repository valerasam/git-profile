import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

const options = {
  providers: [
    // OAuth authentication providers for GitHub account
    Providers.GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    })
  ],
  secret: process.env.NEXT_AUTH_SECRET,
  callbacks: {
    async jwt(token, _, account) {
      if (account) {
        token.accessToken = account?.accessToken;
      }
      return token;
    },
    async session(session, token) {
      session.accessToken = token.accessToken;
      return session;
    }
  }
};

export default (req, res) => NextAuth(req, res, options);

