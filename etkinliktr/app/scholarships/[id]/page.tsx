import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export default async function ScholarshipDetail({ params }: { params: { id: string } }) {
  const s = await (prisma as any).scholarship.findUnique({
    where: { id: params.id },
    include: { municipality: { select: { id:true, name:true, city:true, district:true } }, event: { select: { id:true, title:true } } }
  });
  if (!s) return <div className="text-slate-600">Burs bulunamadı.</div>;
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <header className="space-y-1">
        <div className="text-sm text-slate-600">{s.municipality?.city} • {s.municipality?.name}</div>
        <h1 className="text-3xl font-bold text-slate-900">{s.title}</h1>
      </header>
      <section className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
        {s.description && <p className="text-slate-700 whitespace-pre-line">{s.description}</p>}
        {s.eligibilityCriteria && (
          <div>
            <h3 className="font-semibold mb-2">Başvuru Şartları</h3>
            <p className="text-slate-700 whitespace-pre-line">{s.eligibilityCriteria}</p>
          </div>
        )}
        <div className="text-sm text-slate-600">
          {s.applicationStart && <>Başlangıç: {new Date(s.applicationStart).toLocaleString('tr-TR')} </>}
          {s.applicationEnd && <>• Bitiş: {new Date(s.applicationEnd).toLocaleString('tr-TR')}</>}
          {s.quota && <> • Kontenjan: {s.quota}</>}
        </div>
        {s.event && (
          <div className="text-sm text-slate-700">İlişkili etkinlik: <Link className="text-sky-600 hover:underline" href={`/events/${s.event.id}`}>{s.event.title}</Link></div>
        )}
        {s.link && <a href={s.link} target="_blank" className="inline-flex items-center rounded-lg bg-sky-600 hover:bg-sky-700 text-white px-4 py-2">Online Başvuru</a>}
      </section>
      <section className="bg-white border border-slate-200 rounded-xl p-6 space-y-3">
        <h3 className="font-semibold">Gerekli Belgeler</h3>
        <div className="text-slate-600 text-sm">Belediye bu alanı belge listesi için kullanabilir.</div>
      </section>
    </div>
  );
}
