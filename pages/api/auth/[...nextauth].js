import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

const options = {
  providers: [
    // OAuth authentication providers for GitHub account
    Providers.GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    })
  ]
};

export default (req, res) => NextAuth(req, res, options);