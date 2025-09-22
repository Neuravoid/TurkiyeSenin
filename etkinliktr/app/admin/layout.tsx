import Link from 'next/link';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth';
import { redirect } from 'next/navigation';
import type { Route } from 'next';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const token = cookies().get('token')?.value;
  const user = token ? verifyToken(token) : null;
  
  if (!user || user.role !== 'ADMIN') {
    redirect('/auth/login?redirect=/admin/events');
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-8">
              <h1 className="text-xl font-bold text-gray-900">🏛️ EtkinlikTR Admin</h1>
              <nav className="flex space-x-6">
                <Link 
                  href="/admin/events" 
                  className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Etkinlikler
                </Link>
                <Link 
                  href={"/admin/users" as Route}
                  className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Kullanıcılar
                </Link>
                <Link 
                  href={"/admin/categories" as Route}
                  className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Kategoriler
                </Link>
              </nav>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Hoş geldin, {user.email}
              </span>
              <Link 
                href="/" 
                className="text-gray-600 hover:text-gray-900 text-sm"
              >
                Ana Siteye Dön
              </Link>
              <form action="/api/auth/logout" method="post" className="inline">
                <button 
                  type="submit" 
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                >
                  Çıkış Yap
                </button>
              </form>
            </div>
          </div>
        </div>
      </header>

      {/* Admin Content */}
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}