import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isPublicRoute = createRouteMatcher([
  '/',
  '/sign-in(.*)',
  '/sign-up(.*)',
]);

export default clerkMiddleware((auth, req) => {
  const { userId } = auth();
  const { nextUrl } = req;
  
  // Si la ruta es pública, permitir acceso
  if (isPublicRoute(req)) {
    return NextResponse.next();
  }

  // Si no hay usuario autenticado, redirigir a sign-in
  if (!userId) {
    const signInUrl = new URL('/sign-in', nextUrl.origin);
    signInUrl.searchParams.set('redirect_url', nextUrl.href);
    return NextResponse.redirect(signInUrl);
  }

  // Si hay usuario autenticado, permitir acceso
  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
