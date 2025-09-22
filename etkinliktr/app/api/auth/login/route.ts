import { NextResponse } from 'next/server';
import { authenticate, signToken } from '@/lib/auth';

export async function POST(req: Request) {
  const form = await req.formData();
  const email = form.get('email')?.toString();
  const password = form.get('password')?.toString();
  const url = new URL(req.url);
  const redirectTo = url.searchParams.get('redirect') || '/';

  if (!email || !password) {
    return NextResponse.json({ error: 'Eksik bilgi' }, { status: 400 });
  }

  const user = await authenticate(email, password);
  if (!user) return NextResponse.redirect(new URL(`/auth/login?error=invalid`, req.url));
  
  const token = signToken({ sub: user.id, email: user.email, role: user.role });
  const res = NextResponse.redirect(new URL(redirectTo, req.url));
  
  // Cookie ayarlarını daha açık şekilde set et
  res.cookies.set('token', token, { 
    httpOnly: true, 
    path: '/', 
    sameSite: 'lax',
    secure: false, // Development için false
    maxAge: 60 * 60 * 24 * 7 // 7 gün
  });
  
  console.log('Login successful - setting token for user:', user.email, 'role:', user.role);
  return res;
}
