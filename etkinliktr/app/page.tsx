import Link from 'next/link';
import { getEvents } from '@/lib/data';

export default async function HomePage() {
  const events = await getEvents();
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-slate-900">Sizin için öneriler</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {events.slice(0,8).map(e => (
          <Link key={e.id} href={`/events/${e.id}`} className="block bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
            <div className="p-4 space-y-3">
              <div className="text-sm text-slate-500">{new Date(e.start_datetime).toLocaleString('tr-TR')}</div>
              <h3 className="text-lg font-semibold text-slate-900 line-clamp-2">{e.title}</h3>
              <div className="text-sm text-slate-600">📍 {e.venue_name}</div>
              <div className="text-sm text-slate-700 flex items-center gap-4">
                <span>💰 {e.is_free ? 'Ücretsiz' : `${e.price}₺`}</span>
                <span>👥 {e.current_registrations}/{e.capacity}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
