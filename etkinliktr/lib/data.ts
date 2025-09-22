import demo from '@/data/demo.json';
import { prisma } from '@/lib/prisma';

export type EventItem = {
  id: string;
  municipality_id: string;
  title: string;
  description: string;
  category_id: string;
  subcategory_id?: string;
  start_datetime: string;
  end_datetime: string;
  venue_name: string;
  venue_address?: string;
  venue_latitude?: number;
  venue_longitude?: number;
  city?: string;
  district?: string;
  capacity: number;
  current_registrations: number;
  price: number;
  is_free: boolean;
  registration_required: boolean;
  images?: string[];
  status: 'draft'|'active'|'cancelled'|'completed';
};

export async function getEvents(): Promise<EventItem[]> {
  try {
  const events = await prisma.event.findMany({ orderBy: { startDatetime: 'asc' } });
  type DbEvent = (typeof events)[number];
  return events.map((e: DbEvent): EventItem => ({
      id: e.id,
      municipality_id: e.municipalityId,
      title: e.title,
      description: e.description,
      category_id: e.categoryId,
      start_datetime: e.startDatetime.toISOString(),
      end_datetime: e.endDatetime.toISOString(),
      venue_name: e.venueName,
      venue_address: e.venueAddress ?? undefined,
      venue_latitude: e.venueLatitude ?? undefined,
      venue_longitude: e.venueLongitude ?? undefined,
  city: (e as any).city ?? undefined,
  district: (e as any).district ?? undefined,
      capacity: e.capacity,
      current_registrations: e.currentRegistrations,
      price: Number(e.price),
      is_free: e.isFree,
      registration_required: e.registrationRequired,
      status: e.status as any
    }));
  } catch {
    return demo.events as EventItem[];
  }
}

export async function getEvent(id: string) {
  try {
    const e = await prisma.event.findUnique({ 
      where: { id },
      include: {
        municipality: {
          select: {
            name: true,
            city: true
          }
        },
        category: {
          select: {
            name: true,
            slug: true
          }
        }
      }
    });
    if (!e) return undefined;
    return {
      id: e.id,
      municipality_id: e.municipalityId,
      title: e.title,
      description: e.description,
      category_id: e.categoryId,
      start_datetime: e.startDatetime.toISOString(),
      end_datetime: e.endDatetime.toISOString(),
      venue_name: e.venueName,
      venue_address: e.venueAddress ?? undefined,
      venue_latitude: e.venueLatitude ?? undefined,
      venue_longitude: e.venueLongitude ?? undefined,
      capacity: e.capacity,
      currentRegistrations: e.currentRegistrations,
      price: Number(e.price),
      is_free: e.isFree,
      registration_required: e.registrationRequired,
      status: e.status as any,
      municipality: e.municipality,
      category: e.category
    };
  } catch (error) {
    console.error('Error fetching event:', error);
    return undefined;
  }
}
