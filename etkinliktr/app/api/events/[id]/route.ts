import { NextResponse } from 'next/server';
import { getEvent } from '@/lib/data';

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const event = await getEvent(params.id);
  if (!event) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json({ event });
}
