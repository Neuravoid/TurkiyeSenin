import Link from 'next/link';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth';
import type { Route } from 'next';
import { redirect } from 'next/navigation';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  // JWT doğrulamasını burada yapıyoruz çünkü Edge runtime'da çalışmıyor
  const token = cookies().get('token')?.value;
  
  if (!token) {
    console.log('[Admin Layout] No token found, redirecting to login');
    redirect('/auth/login');
  }
  
  const user = verifyToken(token);
  
  if (!user || user.role !== 'ADMIN') {
    console.log(`[Admin Layout] Invalid token or insufficient permissions. User role: ${user?.role || 'none'}`);
    redirect('/auth/login');
  }
  
  console.log('[Admin Layout] Access granted to admin area');

  return (
    <div className="min-h-screen bg-gray-100" id="admin-app">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg">
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-center h-16 px-4 bg-blue-600">
            <h1 className="text-xl font-bold text-white">🏛️ Türkiye Senin Admin</h1>
          </div>
          
          {/* Navigation */}
          <nav className="flex-1 px-4 py-4 space-y-2">
            <Link 
              href={"/admin" as Route}
              className="flex items-center px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100 hover:text-blue-600 transition-colors"
            >
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
              </svg>
              Dashboard
            </Link>
            
            <Link 
              href="/admin/events" 
              className="flex items-center px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100 hover:text-blue-600 transition-colors"
            >
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Etkinlikler
            </Link>
            
            <Link 
              href={"/admin/users" as Route}
              className="flex items-center px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100 hover:text-blue-600 transition-colors"
            >
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
              Kullanıcılar
            </Link>
            
            <Link 
              href={"/admin/categories" as Route}
              className="flex items-center px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100 hover:text-blue-600 transition-colors"
            >
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14-7H5a2 2 0 00-2 2v12a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2z" />
              </svg>
              Kategoriler
            </Link>
            
            <Link 
              href={"/admin/reports" as Route}
              className="flex items-center px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100 hover:text-blue-600 transition-colors"
            >
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              Raporlar
            </Link>
          </nav>
          
          {/* User info at bottom */}
          <div className="border-t px-4 py-4">
            {user && (
              <div className="space-y-3">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                    {user.email?.charAt(0).toUpperCase()}
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-700">Admin</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Link 
                    href="/" 
                    className="flex-1 px-3 py-2 text-xs text-center bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
                  >
                    Ana Site
                  </Link>
                  <form action="/api/auth/logout" method="post" className="flex-1">
                    <button 
                      type="submit" 
                      className="w-full px-3 py-2 text-xs bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                    >
                      Çıkış
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="ml-64 min-w-0" id="admin-root">
        {/* Top bar */}
        <header className="bg-white shadow-sm border-b">
          <div className="container mx-auto max-w-7xl px-6 py-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Admin Paneli</h2>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Ara..." 
                    className="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <svg className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <button className="p-2 text-gray-400 hover:text-gray-600 relative">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5-5-5h5v-13z" />
                  </svg>
                  <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
                </button>
              </div>
            </div>
          </div>
        </header>
        
        {/* Page content */}
        <main className="container mx-auto max-w-7xl p-6" id="admin-content">
          {children}
        </main>
      </div>
    </div>
  );
}