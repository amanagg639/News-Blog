// pages/api/auth/[...nextauth].js
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // You can add other providers like GitHub or Facebook if necessary
  ],
  pages: {
    signIn: '/auth/login',  // Custom sign-in page URL (if you have a custom one)
    error: '/auth/error',   // Custom error page URL (optional)
    // Define the URL for the redirect after login here
    // If you want to redirect them to the dashboard by default
    // You can also use `callbackUrl` to dynamically change it based on logic
  },
  session: {
    jwt: true, // Using JWT for session management
  },
  callbacks: {
    // Callback to set custom token properties
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    // Redirect callback to define where to go after successful login
    async redirect({ url, baseUrl }) {
      return `${baseUrl}/`
    },
  },
});
