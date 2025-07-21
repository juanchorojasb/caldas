import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  
  // Solo log, sin auth check en middleware
  if (pathname.startsWith('/vendedor') || pathname.startsWith('/dashboard')) {
    console.log('🔍 Accessing protected route:', pathname)
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/vendedor/:path*', 
    '/admin/:path*'
  ]
}
