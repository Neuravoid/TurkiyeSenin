import { prisma } from '@/lib/prisma';
import PageHeader from '../../_components/ui/PageHeader';
import Card from '../../_components/ui/Card';

export default async function AdminReportsPage() {
  // Rapor verileri
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const startOfLastMonth = new Date(startOfMonth);
  startOfLastMonth.setMonth(startOfLastMonth.getMonth() - 1);

  const [
    totalStats,
    monthlyStats,
    lastMonthStats,
    categoryStats,
    municipalityStats,
    recentRegistrations
  ] = await Promise.all([
    // Genel istatistikler
    {
      events: await prisma.event.count(),
      users: await prisma.user.count(),
      registrations: await prisma.registration.count(),
      categories: await prisma.category.count(),
      municipalities: await prisma.municipality.count()
    },
    // Bu ay
    {
      events: await prisma.event.count({
        where: { createdAt: { gte: startOfMonth } }
      }),
      users: await prisma.user.count({
        where: { createdAt: { gte: startOfMonth } }
      }),
      registrations: await prisma.registration.count({
        where: { createdAt: { gte: startOfMonth } }
      })
    },
    // Geçen ay
    {
      events: await prisma.event.count({
        where: { 
          createdAt: { 
            gte: startOfLastMonth,
            lt: startOfMonth
          } 
        }
      }),
      users: await prisma.user.count({
        where: { 
          createdAt: { 
            gte: startOfLastMonth,
            lt: startOfMonth
          } 
        }
      }),
      registrations: await prisma.registration.count({
        where: { 
          createdAt: { 
            gte: startOfLastMonth,
            lt: startOfMonth
          } 
        }
      })
    },
    // Kategori bazlı istatistikler
    prisma.category.findMany({
      select: {
        id: true,
        name: true,
        _count: {
          select: {
            events: true
          }
        }
      },
      orderBy: {
        events: {
          _count: 'desc'
        }
      },
      take: 10
    }),
    // Belediye bazlı istatistikler
    prisma.municipality.findMany({
      select: {
        id: true,
        name: true,
        city: true,
        _count: {
          select: {
            events: true
          }
        }
      },
      orderBy: {
        events: {
          _count: 'desc'
        }
      },
      take: 10
    }),
    // Son kayıtlar
    prisma.registration.findMany({
      take: 10,
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true
          }
        },
        event: {
          select: {
            title: true,
            startDatetime: true
          }
        }
      }
    })
  ]);

  // Büyüme oranları hesapla
  const calculateGrowth = (current: number, previous: number) => {
    if (previous === 0) return current > 0 ? 100 : 0;
    return Math.round(((current - previous) / previous) * 100);
  };

  const growthRates = {
    events: calculateGrowth(monthlyStats.events, lastMonthStats.events),
    users: calculateGrowth(monthlyStats.users, lastMonthStats.users),
    registrations: calculateGrowth(monthlyStats.registrations, lastMonthStats.registrations)
  };

  return (
    <div className="space-y-6" id="admin-reports">
      <PageHeader
        title="Raporlar ve Analizler"
        subtitle="Platform performans ve kullanım istatistikleri"
      />

      {/* Genel İstatistikler */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-6 items-stretch">
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 h-full">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Etkinlikler</p>
              <p className="text-2xl font-bold text-gray-900">{totalStats.events}</p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 h-full">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg text-green-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Kullanıcılar</p>
              <p className="text-2xl font-bold text-gray-900">{totalStats.users}</p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 h-full">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg text-purple-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Kayıtlar</p>
              <p className="text-2xl font-bold text-gray-900">{totalStats.registrations}</p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 h-full">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg text-yellow-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14-7H5a2 2 0 00-2 2v12a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Kategoriler</p>
              <p className="text-2xl font-bold text-gray-900">{totalStats.categories}</p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 h-full">
          <div className="flex items-center">
            <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Belediyeler</p>
              <p className="text-2xl font-bold text-gray-900">{totalStats.municipalities}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Aylık Büyüme */}
      <Card header={<h2 className="text-xl font-bold text-gray-900">Bu Ay vs Geçen Ay</h2>}>
        <div className="px-6 py-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{monthlyStats.events}</div>
              <div className="text-sm text-gray-600">Yeni Etkinlik</div>
              <div className={`text-sm font-medium ${growthRates.events >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {growthRates.events >= 0 ? '+' : ''}{growthRates.events}% geçen aya göre
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{monthlyStats.users}</div>
              <div className="text-sm text-gray-600">Yeni Kullanıcı</div>
              <div className={`text-sm font-medium ${growthRates.users >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {growthRates.users >= 0 ? '+' : ''}{growthRates.users}% geçen aya göre
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{monthlyStats.registrations}</div>
              <div className="text-sm text-gray-600">Yeni Kayıt</div>
              <div className={`text-sm font-medium ${growthRates.registrations >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {growthRates.registrations >= 0 ? '+' : ''}{growthRates.registrations}% geçen aya göre
              </div>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* En Popüler Kategoriler */}
        <Card header={<h2 className="text-xl font-bold text-gray-900">En Popüler Kategoriler</h2>}>
          <div className="px-6 py-4 space-y-3">
            {categoryStats.map((category: any, index: number) => (
              <div key={category.id} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                  <div className="ml-3">
                    <div className="text-sm font-medium text-gray-900">{category.name}</div>
                  </div>
                </div>
                <div className="text-sm text-gray-500">{category._count.events} etkinlik</div>
              </div>
            ))}
          </div>
        </Card>

        {/* En Aktif Belediyeler */}
        <Card header={<h2 className="text-xl font-bold text-gray-900">En Aktif Belediyeler</h2>}>
          <div className="px-6 py-4 space-y-3">
            {municipalityStats.map((municipality: any, index: number) => (
              <div key={municipality.id} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                  <div className="ml-3">
                    <div className="text-sm font-medium text-gray-900">{municipality.name}</div>
                    <div className="text-xs text-gray-500">{municipality.city}</div>
                  </div>
                </div>
                <div className="text-sm text-gray-500">{municipality._count.events} etkinlik</div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Son Kayıtlar */}
      <Card header={<h2 className="text-xl font-bold text-gray-900">Son Etkinlik Kayıtları</h2>}>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kullanıcı</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Etkinlik</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Etkinlik Tarihi</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kayıt Tarihi</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentRegistrations.map((registration: any) => (
                <tr key={registration.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {registration.user.firstName} {registration.user.lastName}
                    </div>
                    <div className="text-sm text-gray-500">{registration.user.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{registration.event.title}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(registration.event.startDatetime).toLocaleDateString('tr-TR')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(registration.createdAt).toLocaleDateString('tr-TR')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}