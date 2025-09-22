import { verifyToken } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import QRCode from 'react-qr-code';
import { cookies } from 'next/headers';

export default async function TicketsPage() {
  const token = cookies().get('token')?.value;
  const user = token ? verifyToken(token) : null;
  if (!user) {
    return (
      <div className="bg-white border border-slate-200 rounded-xl p-6 text-center">
        <p className="text-slate-600">Lütfen <Link href="/auth/login" className="text-sky-600 hover:text-sky-700">giriş yapın</Link>.</p>
      </div>
    );
  }

  const regs = await prisma.registration.findMany({
    where: { userId: user.sub },
    include: { event: true },
    orderBy: { createdAt: 'desc' }
  });

  if (regs.length === 0) {
    return (
      <div className="space-y-4">
        <h1 className="text-3xl font-bold text-slate-900">Biletlerim</h1>
        <div className="bg-white border border-slate-200 rounded-xl p-6 text-center">
          <p className="text-slate-600">Henüz bir biletiniz yok. <Link href="/events" className="text-sky-600 hover:text-sky-700">Etkinliklere göz atın</Link>.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-slate-900">Biletlerim</h1>
      <div className="space-y-4">
        {regs.map((r: (typeof regs)[number]) => (
          <div key={r.id} className="bg-white border border-slate-200 rounded-xl p-6 space-y-3">
            <h3 className="text-lg font-semibold text-slate-900">{r.event.title}</h3>
            <div className="text-sm text-slate-600">{new Date(r.event.startDatetime).toLocaleString('tr-TR')}</div>
            <div className="text-sm">
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                {r.status}
              </span>
            </div>
            <div className="mt-2">
              <QRCode value={r.qrCode} size={100} />
            </div>
            <Link href={`/events/${r.eventId}`} className="inline-flex items-center text-sky-600 hover:text-sky-700 text-sm">
              Etkinlik Sayfası →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
