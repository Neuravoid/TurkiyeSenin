import './globals.css';
import type { Metadata } from 'next';
import UserNav from './_components/UserNav';

export const metadata: Metadata = {
  title: 'Türkiye Senin',
  description: 'Türkiye Belediye Etkinlik Platformu (MVP)'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body className="min-h-screen bg-slate-50 text-slate-900">
        <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
          <div className="max-w-6xl mx-auto px-4 flex items-center justify-between py-3">
            <div className="font-bold text-lg">🏛️ Türkiye Senin</div>
            <UserNav />
          </div>
        </header>
        <main className="max-w-6xl mx-auto px-4 py-6">{children}</main>
        <footer className="max-w-6xl mx-auto px-4 border-t border-slate-200 text-slate-600 text-sm py-6 mt-6">
          © {new Date().getFullYear()} Türkiye Senin - MVP
        </footer>
      </body>
    </html>
  );
}
