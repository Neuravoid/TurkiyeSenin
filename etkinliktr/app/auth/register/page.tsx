export default function RegisterPage({ searchParams }: { searchParams?: { error?: string } }) {
  const error = searchParams?.error;
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <h1 className="text-3xl font-semibold tracking-tight">Kayıt Ol</h1>
      {error === 'missing' && (
        <div className="rounded-xl border border-red-300 bg-red-50 text-red-700 px-3 py-2 text-sm">Lütfen e-posta ve şifre girin.</div>
      )}
      {error === 'exists' && (
        <div className="rounded-xl border border-amber-300 bg-amber-50 text-amber-800 px-3 py-2 text-sm">Bu e-posta zaten kullanımda.</div>
      )}
      <form action="/api/auth/register" method="post" className="space-y-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-sm text-slate-600 mb-1">Ad</label>
            <input className="w-full rounded-lg border border-slate-300 px-3 py-2" name="firstName" />
          </div>
          <div>
            <label className="block text-sm text-slate-600 mb-1">Soyad</label>
            <input className="w-full rounded-lg border border-slate-300 px-3 py-2" name="lastName" />
          </div>
        </div>
        <div>
          <label className="block text-sm text-slate-600 mb-1">E-posta</label>
          <input className="w-full rounded-lg border border-slate-300 px-3 py-2" name="email" type="email" required />
        </div>
        <div>
          <label className="block text-sm text-slate-600 mb-1">Şifre</label>
          <input className="w-full rounded-lg border border-slate-300 px-3 py-2" name="password" type="password" required />
          <p className="text-xs text-slate-500 mt-1">En az 8 karakter önerilir.</p>
        </div>
        <button className="inline-flex items-center rounded-lg bg-sky-600 hover:bg-sky-700 text-white px-4 py-2" type="submit">Kayıt Ol</button>
      </form>
      <p className="text-sm text-slate-600">Zaten hesabın var mı? <a className="text-sky-600" href="/auth/login">Giriş yap</a></p>
    </div>
  );
}
