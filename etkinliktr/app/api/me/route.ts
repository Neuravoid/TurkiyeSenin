import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const token = cookies().get('token')?.value;
  const user = token ? verifyToken(token) : null;
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const dbUser = await prisma.user.findUnique({ where: { id: user.sub }, select: { email:true, firstName:true, lastName:true, city:true, district:true } });
  return NextResponse.json(dbUser);
}

export async function POST(req: Request) {
  const token = cookies().get('token')?.value;
  const user = token ? verifyToken(token) : null;
  if (!user) return NextResponse.redirect(new URL('/auth/login?redirect=/profile', req.url));

  const form = await req.formData();
  const firstName = form.get('firstName')?.toString();
  const lastName = form.get('lastName')?.toString();
  const city = form.get('city')?.toString();
  const district = form.get('district')?.toString();

  await prisma.user.update({ where: { id: user.sub }, data: { firstName: firstName || undefined, lastName: lastName || undefined, city: city || undefined, district: district || undefined } });
  return NextResponse.redirect(new URL('/profile', req.url));
}
