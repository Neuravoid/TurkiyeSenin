import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import type { Route } from 'next';
import PageHeader from '../../_components/ui/PageHeader';
import Card from '../../_components/ui/Card';
import DeleteEventButton from './_components/DeleteEventButton';

export default async function AdminEventsPage() {
  // Tüm etkinlikleri al
  const events = await prisma.event.findMany({
    include: {
      municipality: {
        select: {
          name: true,
          city: true,
          district: true
        }
      },
      category: {
        select: {
          name: true
        }
      },
      _count: {
        select: {
          registrations: true
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  return (
    <div className="space-y-6" id="admin-events">
      <PageHeader
        title="Etkinlik Yönetimi"
        subtitle="Platformdaki tüm etkinlikleri yönetin"
        action={(
          <Link
            href={"/admin/events/new" as Route}
            className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 shadow-sm"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v12M6 12h12" />
            </svg>
            Yeni Etkinlik Ekle
          </Link>
        )}
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6 border border-gray-200 h-full">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Toplam</p>
              <p className="text-2xl font-bold text-gray-900">{events.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border border-gray-200 h-full">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg text-green-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Aktif</p>
              <p className="text-2xl font-bold text-gray-900">
                {events.filter((e: any) => new Date(e.startDatetime) > new Date()).length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border border-gray-200 h-full">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg text-yellow-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Geçmiş</p>
              <p className="text-2xl font-bold text-gray-900">
                {events.filter((e: any) => new Date(e.startDatetime) <= new Date()).length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border border-gray-200 h-full">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg text-purple-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Kayıtlar</p>
              <p className="text-2xl font-bold text-gray-900">
                {events.reduce((acc: number, e: any) => acc + e._count.registrations, 0)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Events Table */}
      <Card
        header={(
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Tüm Etkinlikler</h2>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Etkinlik ara..."
                className="w-48 md:w-64 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="">Tüm Durumlar</option>
                <option value="active">Aktif</option>
                <option value="past">Geçmiş</option>
              </select>
            </div>
          </div>
        )}
      >
        {events.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Etkinlik</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Belediye</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Kategori</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Tarih</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Konum</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Kayıtlar</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Durum</th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">İşlemler</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {events.map((event: any) => (
                  <tr key={event.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 align-top">
                      <div className="space-y-0.5">
                        <div className="text-sm font-medium text-gray-900">{event.title}</div>
                        <div className="text-sm text-gray-500 line-clamp-2 max-w-xs">{event.description}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {event.municipality.name}
                      <div className="text-xs text-gray-500">{event.municipality.city}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">{event.category.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{new Date(event.startDatetime).toLocaleDateString('tr-TR')}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{event.venueName}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {event._count.registrations} kişi
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${new Date(event.startDatetime) > new Date() ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                        {new Date(event.startDatetime) > new Date() ? 'Aktif' : 'Geçmiş'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-right">
                      <div className="inline-flex items-center gap-3">
                        <Link href={`/events/${event.id}` as Route} className="text-blue-600 hover:text-blue-800" title="Görüntüle">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                            <path d="M12 5c-7.633 0-10 7-10 7s2.367 7 10 7 10-7 10-7-2.367-7-10-7Zm0 11a4 4 0 1 1 0-8 4 4 0 0 1 0 8Z" />
                          </svg>
                        </Link>
                        <Link href={`/admin/events/${event.id}/edit` as Route} className="text-indigo-600 hover:text-indigo-800" title="Düzenle">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L8.25 18.403 3 19.5l1.097-5.25L16.862 4.487Z" />
                          </svg>
                        </Link>
                          <DeleteEventButton id={event.id} title={event.title} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12">
            <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Henüz etkinlik yok</h3>
            <p className="text-gray-500 mb-4">Platformda henüz hiç etkinlik eklenmemiş.</p>
            <Link
              href={"/admin/events/new" as Route}
              className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 shadow-sm"
            >
              İlk etkinliği ekle
            </Link>
          </div>
        )}
      </Card>
    </div>
  );
}