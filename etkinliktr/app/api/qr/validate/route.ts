import { NextResponse } from 'next/server';
import { verifyQR } from '@/lib/qr';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { qr } = body || {};
    if (!qr) return NextResponse.json({ valid: false, error: 'QR data missing' }, { status: 400 });

    const result = verifyQR(qr);
    if (!result.valid) return NextResponse.json({ valid: false, error: result.error }, { status: 400 });

    return NextResponse.json({ valid: true, data: result.payload });
  } catch (e) {
    return NextResponse.json({ valid: false, error: 'Invalid QR' }, { status: 400 });
  }
}
