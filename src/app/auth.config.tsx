import { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  providers: [],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');

      // redirect unauthenticated users to login page
      if (isOnDashboard) {
         return isLoggedIn;
      } else if (isLoggedIn &&
         (nextUrl.pathname.startsWith('/login') ||
         nextUrl.pathname.startsWith('/register'))) {
         // and if they're signed in don't let them to the sign-in page
         return Response.redirect(new URL('/dashboard', nextUrl));
      }


      return true;
    },
  },
} satisfies NextAuthConfig;