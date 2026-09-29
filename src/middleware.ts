import { NextResponse, type NextRequest } from 'next/server';
import { RESERVED } from '@/lib/config';

/**
 * grandpa-joe.resthome.myqr.co.nz/send  →  /s/grandpa-joe/send
 * (APIs and Next's own files are left alone.)
 */
export function middleware(req: NextRequest) {
  const headers = new Headers(req.headers);
  headers.delete('x-fs-host-mode'); // never trust this from outside

  const domain = (process.env.SCREENS_DOMAIN || '').toLowerCase();
  const host = (req.headers.get('host') || '').split(':')[0].toLowerCase();
  const { pathname } = req.nextUrl;

  if (domain && host.endsWith(`.${domain}`) && !pathname.startsWith('/api/') && !pathname.startsWith('/_next/')) {
    const sub = host.slice(0, -(domain.length + 1));
    if (sub === 'www') {
      const url = req.nextUrl.clone();
      url.host = domain;
      return NextResponse.redirect(url);
    }
    if (!sub.includes('.') && !RESERVED.has(sub)) {
      const url = req.nextUrl.clone();
      url.pathname = `/s/${sub}${pathname === '/' ? '' : pathname}`;
      headers.set('x-fs-host-mode', '1');
      return NextResponse.rewrite(url, { request: { headers } });
    }
  }
  return NextResponse.next({ request: { headers } });
}

export const config = { matcher: ['/((?!_next/static|_next/image|favicon.ico|icon.svg|apple-icon|robots.txt).*)'] };
