import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAdminRequest } from '@/lib/admin-auth';
import { scholarshipSchema } from '@/lib/validators';

export async function GET() {
  try {
    await verifyAdminRequest();
    const list = await (prisma as any).scholarship.findMany({
      orderBy: { createdAt: 'desc' },
      include: { municipality: { select: { id:true, name:true, city:true, district:true } }, event: { select: { id:true, title:true } } }
    });
    return NextResponse.json({ scholarships: list });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: e.message?.includes('privileges') ? 403 : 401 });
  }
}

export async function POST(req: Request) {
  try {
    await verifyAdminRequest();
    const body = await req.json();
    const data = scholarshipSchema.parse(body);
    // ensure municipality exists
    const m = await prisma.municipality.findUnique({ where: { id: data.municipalityId } });
    if (!m) return NextResponse.json({ error: 'Municipality not found' }, { status: 400 });
    if (data.eventId) {
      const e = await prisma.event.findUnique({ where: { id: data.eventId } });
      if (!e) return NextResponse.json({ error: 'Event not found' }, { status: 400 });
    }
    const created = await (prisma as any).scholarship.create({ data });
    return NextResponse.json(created, { status: 201 });
  } catch (e: any) {
    if (e?.issues) return NextResponse.json({ error: 'Invalid input', details: e.issues }, { status: 400 });
    return NextResponse.json({ error: e.message || 'Internal error' }, { status: 500 });
  }
}
