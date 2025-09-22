import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { verifyToken } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export default async function ProfilePage() {
  const token = cookies().get('token')?.value;
  const user = token ? verifyToken(token) : null;
  if (!user) redirect('/auth/login?redirect=/profile');
  const dbUser = await prisma.user.findUnique({ where: { id: user.sub }, select: { firstName:true, lastName:true, email:true, city:true, district:true } });

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <header>
        <h1 className="text-2xl font-bold">Profilim</h1>
        <p className="text-slate-600 text-sm">Hesap bilgilerinizi güncelleyebilirsiniz.</p>
      </header>

      <section className="rounded-xl border border-slate-200 bg-white p-6 space-y-4">
        <h2 className="text-lg font-semibold">Kişisel Bilgiler</h2>
        <form method="post" action="/api/me" className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-slate-600 mb-1">Ad</label>
            <input className="w-full rounded-lg border border-slate-300 px-3 py-2" name="firstName" defaultValue={dbUser?.firstName || ''} placeholder="Adınız" />
          </div>
          <div>
            <label className="block text-sm text-slate-600 mb-1">Soyad</label>
            <input className="w-full rounded-lg border border-slate-300 px-3 py-2" name="lastName" defaultValue={dbUser?.lastName || ''} placeholder="Soyadınız" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm text-slate-600 mb-1">E-posta</label>
            <input className="w-full rounded-lg border border-slate-300 px-3 py-2 bg-slate-50" name="email" type="email" defaultValue={dbUser?.email || user.email} readOnly />
          </div>
          <div>
            <label className="block text-sm text-slate-600 mb-1">İl</label>
            <input className="w-full rounded-lg border border-slate-300 px-3 py-2" name="city" placeholder="Örn. İstanbul" defaultValue={dbUser?.city || ''} />
          </div>
          <div>
            <label className="block text-sm text-slate-600 mb-1">İlçe</label>
            <input className="w-full rounded-lg border border-slate-300 px-3 py-2" name="district" placeholder="Örn. Kadıköy" defaultValue={dbUser?.district || ''} />
          </div>
          <div className="md:col-span-2">
            <button className="inline-flex items-center rounded-lg bg-sky-500 hover:bg-sky-600 text-white px-4 py-2" type="submit">Kaydet</button>
          </div>
        </form>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-6 space-y-3">
        <h2 className="text-lg font-semibold">Bildirim Tercihleri</h2>
        <div className="flex items-center gap-3">
          <input id="notif-email" type="checkbox" className="size-4" disabled />
          <label htmlFor="notif-email" className="text-sm text-slate-700">E-posta bildirimleri (yakında)</label>
        </div>
        <div className="flex items-center gap-3">
          <input id="notif-sms" type="checkbox" className="size-4" disabled />
          <label htmlFor="notif-sms" className="text-sm text-slate-700">SMS bildirimleri (yakında)</label>
        </div>
      </section>
    </div>
  );
}
