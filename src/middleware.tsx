import NextAuth from 'next-auth';
import { authConfig } from '@/app/auth.config';

// export default NextAuth(authConfig).auth;

// export const config = {
//   https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  // matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)', '/dashboard'],
// };

import { PUBLIC_ROUTES, ROOT } from '@/lib/routes';

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;

  const isAuthenticated = !!req.auth;
  const isPublicRoute = PUBLIC_ROUTES.includes(nextUrl.pathname);

  console.log('isAuthenticated', isAuthenticated);

  if (nextUrl.pathname === '/' && isAuthenticated) {
    const url = nextUrl.clone()
    url.pathname = '/dashboard'

    return Response.redirect(url);
  }


  if (!isAuthenticated && !isPublicRoute)
    return Response.redirect(new URL(ROOT, nextUrl));
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|images|favicon.ico).*)'],
};