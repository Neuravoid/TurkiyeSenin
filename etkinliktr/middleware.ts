import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  
  if (pathname.startsWith('/admin')) {
    console.log(`[Middleware] Admin route accessed: ${pathname}`);
    
    const token = req.cookies.get('token')?.value;
    console.log(`[Middleware] Token exists: ${!!token}`);
    
    // Edge runtime'da JWT verify yapamıyoruz, sadece token varlığını kontrol edelim
    // Gerçek doğrulama admin layout'unda yapılacak
    if (!token) {
      console.log('[Middleware] No token found, redirecting to login');
      const url = req.nextUrl.clone();
      url.pathname = '/auth/login';
      url.searchParams.set('redirect', pathname);
      return NextResponse.redirect(url);
    }
    
    console.log('[Middleware] Token found, allowing access (verification will be done in layout)');
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*']
};