import Link from 'next/link';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth';

export default function UserNav() {
  const token = cookies().get('token')?.value;
  const user = token ? verifyToken(token) : null;
  return (
    <nav className="flex items-center gap-3 text-sm">
      <Link href="/" className="text-slate-700 hover:text-slate-900">Ana Sayfa</Link>
      <Link href="/events" className="text-slate-700 hover:text-slate-900">Etkinlikler</Link>
      <Link href="/scholarships" className="text-slate-700 hover:text-slate-900">Burslar</Link>
      {user ? (
        <>
          <Link href="/tickets" className="text-slate-700 hover:text-slate-900">Biletlerim</Link>
          <Link href="/profile" className="text-slate-700 hover:text-slate-900">Profil</Link>
          {user.role === 'ADMIN' && <Link href="/admin/events" className="text-slate-700 hover:text-slate-900">Admin</Link>}
          <form action="/api/auth/logout" method="post" className="inline">
            <button type="submit" className="inline-flex items-center rounded-lg bg-slate-700 hover:bg-slate-800 text-white px-3 py-1.5">Çıkış</button>
          </form>
        </>
      ) : (
        <>
          <Link href="/auth/login" className="text-slate-700 hover:text-slate-900">Giriş</Link>
          <Link href="/auth/register" className="inline-flex items-center rounded-lg bg-sky-500 hover:bg-sky-600 text-white px-3 py-1.5">Kayıt Ol</Link>
        </>
      )}
    </nav>
  );
}
