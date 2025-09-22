'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import QRCode from 'react-qr-code';

type Event = {
  id: string;
  title: string;
  description: string;
  start_datetime: string;
  venue_name: string;
  venue_address: string;
  price: number;
  capacity: number;
  currentRegistrations: number;
  municipality: {
    name: string;
    city: string;
  };
  category: {
    name: string;
    slug: string;
  };
};

type Registration = {
  id: string;
  hasGeneratedQr: boolean;
};

export default function EventDetail({ params, searchParams }: { params: { id: string }, searchParams?: { registered?: string } }) {
  const [event, setEvent] = useState<Event | null>(null);
  const [registration, setRegistration] = useState<Registration | null>(null);
  const [loading, setLoading] = useState(true);
  const [qrUpdated, setQrUpdated] = useState(false);

  useEffect(() => {
    fetchEventData();
  }, [params.id]);

  useEffect(() => {
    // QR kod gösterildiğinde flag'i güncelle
    if (registration && !registration.hasGeneratedQr && !qrUpdated && shouldShowQR()) {
      updateQrFlag();
    }
  }, [registration, qrUpdated]);

  const fetchEventData = async () => {
    try {
      const [eventRes, regRes] = await Promise.all([
        fetch(`/api/events/${params.id}`),
        fetch(`/api/registrations?eventId=${params.id}`)
      ]);

      if (eventRes.ok) {
        const eventData = await eventRes.json();
        setEvent(eventData.event);
      }

      if (regRes.ok) {
        const regData = await regRes.json();
        if (regData.registrations && regData.registrations.length > 0) {
          setRegistration(regData.registrations[0]);
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateQrFlag = async () => {
    if (!registration) return;

    try {
      const response = await fetch(`/api/registrations/${registration.id}/qr`, {
        method: 'PATCH',
      });

      if (response.ok) {
        setRegistration(prev => prev ? { ...prev, hasGeneratedQr: true } : null);
        setQrUpdated(true);
      }
    } catch (error) {
      console.error('Error updating QR flag:', error);
    }
  };

  const shouldShowQR = () => {
    return searchParams?.registered === '1' || registration?.hasGeneratedQr;
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
        <p className="mt-2 text-gray-600">Yükleniyor...</p>
      </div>
    );
  }

  if (!event) {
    return <div className="text-center py-8">Etkinlik bulunamadı.</div>;
  }

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
      {registration && !searchParams?.registered && (
        <div className="rounded-xl border border-blue-300 bg-blue-50 text-blue-700 px-4 py-3">
          🎫 Bu etkinliğe zaten kayıtlısınız. QR kodunuz aşağıda görüntüleniyor.
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
            <div>Durum: <span className="font-medium">{event.currentRegistrations}/{event.capacity}</span></div>
            <div>Ücret: <span className="font-medium">{event.price === 0 ? 'Ücretsiz' : `${event.price}₺`}</span></div>
          </div>
          {event.currentRegistrations >= event.capacity ? (
            <div className="text-red-600 font-medium">Kapasite dolu</div>
          ) : registration ? (
            <div className="text-green-600 font-medium">✅ Zaten kayıtlısınız</div>
          ) : (
            <form action={`/api/registrations`} method="post">
              <input type="hidden" name="event_id" value={event.id} />
              <button className="w-full inline-flex items-center justify-center rounded-lg bg-sky-600 hover:bg-sky-700 text-white px-4 py-2" type="submit">
                🎫 Ücretsiz Kayıt Ol
              </button>
            </form>
          )}
          {shouldShowQR() && registration && (
            <div className="space-y-3">
              <div className="text-sm text-slate-600">Biletiniz için QR kod:</div>
              <div className="bg-white p-3 border border-slate-200 rounded-lg inline-block">
                <QRCode value={`event:${event.id}:user:${registration.id}`} size={160} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
