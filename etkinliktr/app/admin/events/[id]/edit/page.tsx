import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';

async function updateEvent(id: string, formData: FormData) {
  'use server';
  await prisma.event.update({
    where: { id },
    data: {
      title: String(formData.get('title') || ''),
      description: String(formData.get('description') || ''),
      startDatetime: new Date(String(formData.get('start') || '')),
      endDatetime: new Date(String(formData.get('end') || '')),
      capacity: Number(formData.get('capacity') || 0),
      venueName: String(formData.get('venue_name') || ''),
      venueAddress: String(formData.get('venue_address') || '')
    }
  });
  redirect('/admin/events');
}

export default async function EditEventPage({ params }: { params: { id: string } }) {
  const e = await prisma.event.findUnique({ where: { id: params.id } });
  if (!e) return <div className="text-center py-8">Etkinlik bulunamadı</div>;
  const start = new Date(e.startDatetime);
  const end = new Date(e.endDatetime);
  const toLocal = (d: Date) => new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-slate-900">Etkinliği Düzenle</h1>
      <div className="bg-white border border-slate-200 rounded-xl p-6">
        <form action={updateEvent.bind(null, e.id)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Başlık</label>
            <input className="w-full rounded-lg border border-slate-300 px-3 py-2" name="title" defaultValue={e.title} required />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Açıklama</label>
            <textarea className="w-full rounded-lg border border-slate-300 px-3 py-2" name="description" rows={4} defaultValue={e.description} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Başlangıç</label>
              <input className="w-full rounded-lg border border-slate-300 px-3 py-2" name="start" type="datetime-local" defaultValue={toLocal(start)} required />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Bitiş</label>
              <input className="w-full rounded-lg border border-slate-300 px-3 py-2" name="end" type="datetime-local" defaultValue={toLocal(end)} required />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Kapasite</label>
              <input className="w-full rounded-lg border border-slate-300 px-3 py-2" name="capacity" type="number" min={0} defaultValue={e.capacity} />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Mekan Adı</label>
              <input className="w-full rounded-lg border border-slate-300 px-3 py-2" name="venue_name" defaultValue={e.venueName} />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Adres</label>
              <input className="w-full rounded-lg border border-slate-300 px-3 py-2" name="venue_address" defaultValue={e.venueAddress || ''} />
            </div>
          </div>
          <div>
            <button className="inline-flex items-center rounded-lg bg-sky-600 hover:bg-sky-700 text-white px-4 py-2" type="submit">
              Kaydet
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
