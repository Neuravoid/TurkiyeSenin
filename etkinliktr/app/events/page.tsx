import Link from 'next/link';
import { getEvents } from '@/lib/data';

export default async function EventsPage({ searchParams }: { searchParams?: { q?: string; city?: string } }) {
  const all = await getEvents();
  const q = (searchParams?.q || '').toLowerCase();
  const city = (searchParams?.city || '').toLowerCase();

  const events = all.filter(e => {
    const inText = !q || e.title.toLowerCase().includes(q) || e.description.toLowerCase().includes(q);
    const inCity = !city || (e.venue_address || '').toLowerCase().includes(city);
    return inText && inCity;
  });

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-slate-900">Etkinlikler</h1>
      <form method="get" className="flex flex-wrap gap-3 items-end">
        <div className="flex-1 min-w-0">
          <label className="block text-sm font-medium text-slate-700 mb-1">Etkinlik Ara</label>
          <input className="w-full rounded-lg border border-slate-300 px-3 py-2" type="text" name="q" placeholder="Etkinlik ara..." defaultValue={searchParams?.q || ''} />
        </div>
        <div className="flex-1 min-w-0">
          <label className="block text-sm font-medium text-slate-700 mb-1">Şehir/İlçe</label>
          <input className="w-full rounded-lg border border-slate-300 px-3 py-2" type="text" name="city" placeholder="Şehir/İlçe" defaultValue={searchParams?.city || ''} />
        </div>
        <button className="inline-flex items-center rounded-lg bg-sky-600 hover:bg-sky-700 text-white px-4 py-2" type="submit">Filtrele</button>
        <a className="inline-flex items-center rounded-lg bg-slate-600 hover:bg-slate-700 text-white px-4 py-2" href="/events">Temizle</a>
      </form>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {events.map(e => (
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
      {events.length === 0 && (
        <div className="text-slate-500 text-center py-8">Sonuç bulunamadı. Filtreleri gevşetmeyi deneyin.</div>
      )}
    </div>
  );
}
