import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { PATH_LOGIN } from 'src/constant';

export function middleware(req: NextRequest) {
  
  const cookie = req.cookies.get('accessToken'); 
  if (!cookie) {
    return NextResponse.redirect(new URL(PATH_LOGIN.LOGIN, req.url));
  }

  return NextResponse.next();
}


export const config = {
  matcher: ['/posts/:path*'], 
}
