import {NextAuthConfig} from 'next-auth';

export const authConfig = {
  pages: {
    error: '/',
    signIn: '/login',
    signOut: '/',
  },
  providers: [],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      return !!auth?.user;
      },
    async session({ session, token }) {
      // Adds the ID to the session
      if (token.sub != null) {
        session.user.id = token.sub;
      }

      return session
    },
  },
} satisfies NextAuthConfig;