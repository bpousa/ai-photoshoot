import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const { data: { session } } = await supabase.auth.getSession();

  // Protected routes
  if (!session && (
    req.nextUrl.pathname.startsWith('/dashboard') ||
    req.nextUrl.pathname.startsWith('/studio')
  )) {
    const redirectUrl = new URL('/login', req.url);
    redirectUrl.searchParams.set('from', req.nextUrl.pathname);
    return NextResponse.redirect(redirectUrl);
  }

  // Subscription required routes
  if (session && req.nextUrl.pathname.startsWith('/studio')) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('subscription_tier, subscription_status')
      .eq('id', session.user.id)
      .single();

    if (!profile ||
        profile.subscription_status !== 'active' ||
        !['pro', 'studio'].includes(profile.subscription_tier)
    ) {
      return NextResponse.redirect(new URL('/pricing', req.url));
    }
  }

  return res;
}