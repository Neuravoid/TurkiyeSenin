export default function LoginPage({ searchParams }: { searchParams?: { redirect?: string; error?: string; registered?: string } }) {
  const redirect = searchParams?.redirect || '';
  const error = searchParams?.error;
  const registered = searchParams?.registered === '1';
  const action = redirect ? `/api/auth/login?redirect=${encodeURIComponent(redirect)}` : '/api/auth/login';
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <h1 className="text-3xl font-semibold tracking-tight">Giriş Yap</h1>
      {registered && (
        <div className="rounded-xl border border-emerald-300 bg-emerald-50 text-emerald-700 px-3 py-2 text-sm">Kayıt başarılı. Şimdi giriş yapabilirsiniz.</div>
      )}
      {error === 'invalid' && (
        <div className="rounded-xl border border-red-300 bg-red-50 text-red-700 px-3 py-2 text-sm">E-posta veya şifre hatalı.</div>
      )}
  <form method="post" action={action} className="space-y-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div>
          <label className="block text-sm text-slate-600 mb-1" htmlFor="email">E-posta</label>
          <input className="w-full rounded-lg border border-slate-300 px-3 py-2" id="email" name="email" type="email" placeholder="ornek@mail.com" required />
        </div>
        <div>
          <label className="block text-sm text-slate-600 mb-1" htmlFor="password">Şifre</label>
          <input className="w-full rounded-lg border border-slate-300 px-3 py-2" id="password" name="password" type="password" required />
        </div>
        <button className="inline-flex items-center rounded-lg bg-sky-600 hover:bg-sky-700 text-white px-4 py-2" type="submit">Giriş Yap</button>
      </form>
      <p className="text-sm text-slate-600">Hesabın yok mu? <a className="text-sky-600" href="/auth/register">Kayıt ol</a></p>
    </div>
  );
}
