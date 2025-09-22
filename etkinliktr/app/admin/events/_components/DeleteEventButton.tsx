'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function DeleteEventButton({ id, title }: { id: string; title: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onDelete = async (e?: React.MouseEvent<HTMLButtonElement>) => {
    const forceFromClick = e?.shiftKey === true; // Shift+Click => zorla sil
    const firstMsg = forceFromClick
      ? `“${title}” etkinliğini ve tüm kayıtlarını SİLMEK istediğinize emin misiniz? Bu işlem geri alınamaz.`
      : `“${title}” etkinliğini silmek istediğinize emin misiniz?`;
    if (!confirm(firstMsg)) return;
    setLoading(true);
    try {
      const tryDelete = async (force: boolean) => {
        const url = force ? `/api/admin/events/${id}?force=true` : `/api/admin/events/${id}`;
        return fetch(url, { method: 'DELETE' });
      };

      let res = await tryDelete(forceFromClick);
      if (res.status === 204) {
        router.refresh();
        return;
      }

      // Read error once
      const data: any = await res.json().catch(() => ({}));
      const msg: string | undefined = data?.error || data?.message;
      const registrationsError = typeof msg === 'string' && msg.includes('Cannot delete event with existing registrations');

      if (!forceFromClick && registrationsError) {
        // Offer force delete
        const confirmForce = confirm(
          `Bu etkinlikte kayıtlar mevcut. Tüm kayıtları silip etkinliği kaldırmak ister misiniz? Bu işlem geri alınamaz.`
        );
        if (confirmForce) {
          res = await tryDelete(true);
          if (res.status === 204) {
            router.refresh();
            return;
          }
        }
      }

      // If still here, show error
      alert(msg || 'Silme işlemi başarısız oldu.');
    } catch (err) {
      alert('Ağ hatası: Silme işlemi gerçekleştirilemedi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={onDelete} disabled={loading} className="text-red-600 hover:text-red-800 disabled:opacity-50" title="Sil (Shift+Tık = Zorla Sil)">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
      </svg>
    </button>
  );
}
