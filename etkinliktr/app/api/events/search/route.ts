import { NextResponse } from 'next/server';
import { getEvents } from '@/lib/data';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = (searchParams.get('q') || '').toLowerCase();
  const city = (searchParams.get('city') || '').toLowerCase();

  const events = await getEvents();
  const filtered = events.filter(e => {
    const inText = !q || e.title.toLowerCase().includes(q) || e.description.toLowerCase().includes(q);
    const inCity = !city || (e.venue_address || '').toLowerCase().includes(city);
    return inText && inCity;
  });

  return NextResponse.json({ events: filtered });
}
