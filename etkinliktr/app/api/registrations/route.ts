import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';
import { cookies } from 'next/headers';
import crypto from 'crypto';

// GET - Kullanıcının kayıtlarını getir
export async function GET(req: Request) {
  try {
    const token = cookies().get('token')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = verifyToken(token);
    if (!user) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const eventId = searchParams.get('eventId');

    if (eventId) {
      // Specific event registration
      const registration = await prisma.registration.findFirst({
        where: {
          eventId,
          userId: user.sub
        }
      });

      return NextResponse.json({ registrations: registration ? [registration] : [] });
    } else {
      // All user registrations
      const registrations = await prisma.registration.findMany({
        where: { userId: user.sub },
        include: {
          event: {
            select: {
              id: true,
              title: true,
              startDatetime: true,
              venueName: true
            }
          }
        },
        orderBy: { createdAt: 'desc' }
      });

      return NextResponse.json({ registrations });
    }
  } catch (error) {
    console.error('GET registrations error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const form = await req.formData();
  const eventId = form.get('event_id')?.toString();
  if (!eventId) return NextResponse.json({ error: 'Eksik bilgi' }, { status: 400 });

  // In a real app, persist registration and generate QR securely.
  const registration = {
    id: `reg-${Math.random().toString(36).slice(2,8)}`,
    event_id: eventId,
    user_id: 'demo-user-001',
    status: 'registered'
  };
  
  // Require auth
  const token = req.headers.get('cookie')?.split(';').find(s => s.trim().startsWith('token='))?.split('=')[1];
  const payload = token ? verifyToken(token) : null;
  if (!payload) {
    const loginUrl = new URL('/auth/login', req.url);
    loginUrl.searchParams.set('redirect', `/events/${eventId}`);
    return NextResponse.redirect(loginUrl);
  }
  
  const ev = await prisma.event.findUnique({ where: { id: eventId } });
  if (!ev) return NextResponse.json({ error: 'Etkinlik bulunamadı' }, { status: 404 });
  if (ev.currentRegistrations >= ev.capacity) return NextResponse.json({ error: 'Kapasite dolu' }, { status: 409 });
  
  // Upsert: if already registered, do not duplicate
  const existing = await prisma.registration.findFirst({ where: { eventId, userId: payload.sub } });
  if (!existing) {
    const qrCode = `event:${eventId}:user:${payload.sub}:${crypto.randomUUID()}`;
    await prisma.registration.create({
      data: { eventId, userId: payload.sub, status: 'registered', qrCode, hasGeneratedQr: false }
    });
    await prisma.event.update({ where: { id: eventId }, data: { currentRegistrations: { increment: 1 } } });
  }

  return NextResponse.redirect(new URL(`/events/${eventId}?registered=1`, req.url));
}
