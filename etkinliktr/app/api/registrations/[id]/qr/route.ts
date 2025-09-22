import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';
import { cookies } from 'next/headers';

type RouteContext = {
  params: {
    id: string;
  };
};

// PATCH - Update QR generated flag
export async function PATCH(req: Request, { params }: RouteContext) {
  try {
    const token = cookies().get('token')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = verifyToken(token);
    if (!user) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    // Kayıt kullanıcıya ait mi kontrol et
    const registration = await prisma.registration.findUnique({
      where: { 
        id: params.id,
        userId: user.sub
      }
    });

    if (!registration) {
      return NextResponse.json({ error: 'Registration not found' }, { status: 404 });
    }

    // QR flag'ini güncelle
    await prisma.registration.update({
      where: { id: params.id },
      data: { hasGeneratedQr: true }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('QR flag update error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}