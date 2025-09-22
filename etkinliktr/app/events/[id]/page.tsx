import { getEvent } from '@/lib/data';
import Link from 'next/link';
import QRCode from 'react-qr-code';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth';

export default async function EventDetail({ params, searchParams }: { params: { id: string }, searchParams?: { registered?: string } }) {
  const event = await getEvent(params.id);
  if (!event) {
    return <div className="text-center py-8">Etkinlik bulunamadı.</div>;
  }
  const token = cookies().get('token')?.value;
  const user = token ? verifyToken(token) : null;

  return (
    <div className="space-y-6">
      <Link href="/events" className="inline-flex items-center text-sky-600 hover:text-sky-700 text-sm">
        ← Tüm etkinlikler
      </Link>
      <h1 className="text-3xl font-bold text-slate-900">{event.title}</h1>
      {searchParams?.registered === '1' && (
        <div className="rounded-xl border border-emerald-300 bg-emerald-50 text-emerald-700 px-4 py-3">
          ✅ Kayıt başarılı! QR kodunuz hazır.
        </div>
      )}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl p-6 space-y-4">
          <div className="text-slate-600">{new Date(event.start_datetime).toLocaleString('tr-TR')}</div>
          <div className="text-slate-700">📍 {event.venue_name}</div>
          <div className="text-slate-800 whitespace-pre-wrap leading-relaxed">{event.description}</div>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
          <h3 className="text-lg font-semibold text-slate-900">Kayıt Bilgileri</h3>
          <div className="space-y-2 text-sm">
            <div>Durum: <span className="font-medium">{event.current_registrations}/{event.capacity}</span></div>
            <div>Ücret: <span className="font-medium">{event.is_free ? 'Ücretsiz' : `${event.price}₺`}</span></div>
          </div>
          {event.current_registrations >= event.capacity ? (
            <div className="text-red-600 font-medium">Kapasite dolu</div>
          ) : user ? (
            <form action={`/api/registrations`} method="post">
              <input type="hidden" name="event_id" value={event.id} />
              <button className="w-full inline-flex items-center justify-center rounded-lg bg-sky-600 hover:bg-sky-700 text-white px-4 py-2" type="submit">
                🎫 Ücretsiz Kayıt Ol
              </button>
            </form>
          ) : (
            <p className="text-sm text-slate-600">
              Kayıt için <Link href={{ pathname: '/auth/login', query: { redirect: `/events/${event.id}` } }} className="text-sky-600 hover:text-sky-700">giriş yap</Link>.
            </p>
          )}
          {searchParams?.registered === '1' && (
            <div className="space-y-3">
              <div className="text-sm text-slate-600">Biletiniz için QR kod:</div>
              <div className="bg-white p-3 border border-slate-200 rounded-lg inline-block">
                <QRCode value={`event:${event.id}`} size={160} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
