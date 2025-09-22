import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import type { Route } from 'next';
import PageHeader from '../_components/ui/PageHeader';
import Card from '../_components/ui/Card';

export default async function AdminDashboard() {
  const [eventCount, userCount, activeEventCount] = await Promise.all([
    prisma.event.count(),
    prisma.user.count(),
    prisma.event.count({ where: { startDatetime: { gte: new Date() } } }),
  ]);

  const recentEvents = await prisma.event.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' },
    include: { municipality: { select: { name: true, city: true } } },
  });

  return (
    <div className="space-y-6" id="admin-dashboard">
      <PageHeader title="Admin Paneli" subtitle="Türkiye Senin platformunun yönetim merkezindesiniz" />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 items-stretch">
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 h-full">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-600">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">Toplam Etkinlik</h3>
              <p className="text-3xl font-bold text-blue-600">{eventCount}</p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 h-full">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-600">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">Toplam Kullanıcı</h3>
              <p className="text-3xl font-bold text-green-600">{userCount}</p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 h-full">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-orange-100 text-orange-600">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">Aktif Etkinlik</h3>
              <p className="text-3xl font-bold text-orange-600">{activeEventCount}</p>
            </div>
          </div>
        </div>
      </div>

      <Card header={<h2 className="text-xl font-bold text-gray-900">Hızlı İşlemler</h2>}>
        <div className="px-6 py-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <Link href={"/admin/events/new" as Route} className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="p-2 bg-blue-100 rounded-lg text-blue-600 mr-3">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v12M6 12h12" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Yeni Etkinlik</h3>
              <p className="text-sm text-gray-600">Etkinlik ekle</p>
            </div>
          </Link>

          <Link href="/admin/events" className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="p-2 bg-green-100 rounded-lg text-green-600 mr-3">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2H9z" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Etkinlikleri Yönet</h3>
              <p className="text-sm text-gray-600">Düzenle ve sil</p>
            </div>
          </Link>

          <Link href={"/admin/users" as Route} className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="p-2 bg-purple-100 rounded-lg text-purple-600 mr-3">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Kullanıcıları Yönet</h3>
              <p className="text-sm text-gray-600">Roller ve izinler</p>
            </div>
          </Link>

          <Link href={"/admin/reports" as Route} className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="p-2 bg-yellow-100 rounded-lg text-yellow-600 mr-3">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Raporlar</h3>
              <p className="text-sm text-gray-600">Analitik veriler</p>
            </div>
          </Link>
        </div>
      </Card>

      <Card header={<div className="flex items-center justify-between"><h2 className="text-xl font-bold text-gray-900">Son Eklenen Etkinlikler</h2><Link href="/admin/events" className="text-blue-600 hover:text-blue-800 text-sm font-medium">Tümünü Gör →</Link></div>}>
        <div className="px-6 py-4">
          {recentEvents.length > 0 ? (
            <div className="space-y-3">
              {recentEvents.map((event: any) => (
                <div key={event.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{event.title}</h3>
                    <p className="text-sm text-gray-600">
                      {event.municipality.name} • {new Date(event.startDatetime).toLocaleDateString('tr-TR')}
                    </p>
                    <p className="text-sm text-gray-500">{event.venueName}</p>
                  </div>
                  <div className="flex space-x-2">
                    <Link 
                      href={`/admin/events/${event.id}/edit` as Route}
                      className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200"
                    >
                      Düzenle
                    </Link>
                    <span className={`${new Date(event.startDatetime) > new Date() ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'} px-3 py-1 text-xs rounded-full`}>
                      {new Date(event.startDatetime) > new Date() ? 'Aktif' : 'Geçmiş'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p>Henüz etkinlik eklenmemiş</p>
              <Link href={"/admin/events/new" as Route} className="text-blue-600 hover:text-blue-800 mt-2 inline-block">
                İlk etkinliği ekle →
              </Link>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}