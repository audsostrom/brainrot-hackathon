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
  },
} satisfies NextAuthConfig;