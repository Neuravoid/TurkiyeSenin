import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(_req: Request, { params }: { params: { id: string } }) {
  await prisma.event.delete({ where: { id: params.id } }).catch(() => {});
  return NextResponse.redirect(new URL('/admin/events', _req.url));
}
