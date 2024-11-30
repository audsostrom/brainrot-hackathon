import NextAuth from 'next-auth';
import { authConfig } from '@/app/auth.config';

// export default NextAuth(authConfig).auth;

// export const config = {
//   https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  // matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)', '/dashboard'],
// };

import { DEFAULT_REDIRECT, PUBLIC_ROUTES, ROOT } from '@/lib/routes';

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;

  const isAuthenticated = !!req.auth;
  const isPublicRoute = PUBLIC_ROUTES.includes(nextUrl.pathname);

  console.log('isAuthenticated', isAuthenticated);

  // Too many redirects
  // if (isPublicRoute && isAuthenticated)
  //   return Response.redirect(new URL(DEFAULT_REDIRECT, nextUrl));

  if (!isAuthenticated && !isPublicRoute)
    return Response.redirect(new URL(ROOT, nextUrl));
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};