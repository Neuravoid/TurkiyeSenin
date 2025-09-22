import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';

async function createEvent(formData: FormData) {
  'use server';
  const title = String(formData.get('title') || '');
  const description = String(formData.get('description') || '');
  const start = new Date(String(formData.get('start') || ''));
  const end = new Date(String(formData.get('end') || ''));
  const capacity = Number(formData.get('capacity') || 0);
  const municipality = await prisma.municipality.findFirst();
  const category = await prisma.category.findFirst();
  if (!municipality || !category) {
    throw new Error('Belediye veya kategori bulunamadı (seed gerekli).');
  }
  await prisma.event.create({
    data: {
      title,
      description,
      startDatetime: start,
      endDatetime: end,
      capacity,
      municipalityId: municipality.id,
      categoryId: category.id,
      venueName: String(formData.get('venue_name') || ''),
      venueAddress: String(formData.get('venue_address') || ''),
      isFree: true,
      registrationRequired: true,
      status: 'active'
    }
  });
  redirect('/admin/events');
}

export default function NewEventPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-slate-900">Yeni Etkinlik</h1>
      <div className="bg-white border border-slate-200 rounded-xl p-6">
        <form action={createEvent} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Başlık</label>
            <input className="w-full rounded-lg border border-slate-300 px-3 py-2" name="title" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Açıklama</label>
            <textarea className="w-full rounded-lg border border-slate-300 px-3 py-2" name="description" rows={4} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Başlangıç</label>
              <input className="w-full rounded-lg border border-slate-300 px-3 py-2" name="start" type="datetime-local" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Bitiş</label>
              <input className="w-full rounded-lg border border-slate-300 px-3 py-2" name="end" type="datetime-local" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Kapasite</label>
              <input className="w-full rounded-lg border border-slate-300 px-3 py-2" name="capacity" type="number" min={0} defaultValue={0} />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Mekan Adı</label>
              <input className="w-full rounded-lg border border-slate-300 px-3 py-2" name="venue_name" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Adres</label>
              <input className="w-full rounded-lg border border-slate-300 px-3 py-2" name="venue_address" />
            </div>
          </div>
          <div>
            <button className="inline-flex items-center rounded-lg bg-sky-600 hover:bg-sky-700 text-white px-4 py-2" type="submit">
              Oluştur
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
