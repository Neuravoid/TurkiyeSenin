import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  const form = await req.formData();
  const email = form.get('email')?.toString();
  const password = form.get('password')?.toString();
  const firstName = form.get('firstName')?.toString() || '';
  const lastName = form.get('lastName')?.toString() || '';
  if (!email || !password) return NextResponse.redirect(new URL('/auth/register?error=missing', req.url));
  const exists = await prisma.user.findUnique({ where: { email } });
  if (exists) return NextResponse.redirect(new URL('/auth/register?error=exists', req.url));
  const passwordHash = await bcrypt.hash(password, 10);
  await prisma.user.create({ data: { email, passwordHash, firstName, lastName, role: 'USER' } });
  return NextResponse.redirect(new URL('/auth/login?registered=1', req.url));
}
