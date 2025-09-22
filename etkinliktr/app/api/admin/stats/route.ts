import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAdminRequest } from '@/lib/admin-auth';

// GET admin dashboard statistics
export async function GET(req: Request) {
  try {
    await verifyAdminRequest();
    
    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startOfWeek = new Date(startOfToday);
    startOfWeek.setDate(startOfToday.getDate() - startOfToday.getDay());
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    
    // Parallel queries for better performance
    const [
      totalEvents,
      totalUsers,
      totalCategories,
      totalMunicipalities,
      activeEvents,
      totalRegistrations,
      todayRegistrations,
      weeklyRegistrations,
      monthlyRegistrations,
      recentEvents,
      recentUsers,
      popularCategories
    ] = await Promise.all([
      // Basic counts
      prisma.event.count(),
      prisma.user.count(),
      prisma.category.count(),
      prisma.municipality.count(),
      
      // Active events (future events)
      prisma.event.count({
        where: {
          startDatetime: {
            gte: now
          }
        }
      }),
      
      // Registration statistics
      prisma.registration.count(),
      prisma.registration.count({
        where: {
          createdAt: {
            gte: startOfToday
          }
        }
      }),
      prisma.registration.count({
        where: {
          createdAt: {
            gte: startOfWeek
          }
        }
      }),
      prisma.registration.count({
        where: {
          createdAt: {
            gte: startOfMonth
          }
        }
      }),
      
      // Recent events (last 5)
      prisma.event.findMany({
        take: 5,
        orderBy: {
          createdAt: 'desc'
        },
        select: {
          id: true,
          title: true,
          startDatetime: true,
          venueName: true,
          municipality: {
            select: {
              name: true,
              city: true
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
        }
      }),
      
      // Recent users (last 5)
      prisma.user.findMany({
        take: 5,
        orderBy: {
          createdAt: 'desc'
        },
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          role: true,
          createdAt: true
        }
      }),
      
      // Popular categories (by event count)
      prisma.category.findMany({
        take: 5,
        orderBy: {
          events: {
            _count: 'desc'
          }
        },
        select: {
          id: true,
          name: true,
          _count: {
            select: {
              events: true
            }
          }
        }
      })
    ]);
    
    // Calculate growth metrics (compared to previous period)
    const previousMonthStart = new Date(startOfMonth);
    previousMonthStart.setMonth(previousMonthStart.getMonth() - 1);
    
    const [previousMonthEvents, previousMonthUsers, previousMonthRegistrations] = await Promise.all([
      prisma.event.count({
        where: {
          createdAt: {
            gte: previousMonthStart,
            lt: startOfMonth
          }
        }
      }),
      prisma.user.count({
        where: {
          createdAt: {
            gte: previousMonthStart,
            lt: startOfMonth
          }
        }
      }),
      prisma.registration.count({
        where: {
          createdAt: {
            gte: previousMonthStart,
            lt: startOfMonth
          }
        }
      })
    ]);
    
    // Calculate growth percentages
    const eventGrowth = previousMonthEvents > 0 
      ? ((monthlyRegistrations - previousMonthEvents) / previousMonthEvents * 100)
      : 0;
    
    const userGrowth = previousMonthUsers > 0 
      ? ((monthlyRegistrations - previousMonthUsers) / previousMonthUsers * 100)
      : 0;
    
    const registrationGrowth = previousMonthRegistrations > 0 
      ? ((monthlyRegistrations - previousMonthRegistrations) / previousMonthRegistrations * 100)
      : 0;
    
    const stats = {
      overview: {
        totalEvents,
        totalUsers,
        totalCategories,
        totalMunicipalities,
        activeEvents,
        pastEvents: totalEvents - activeEvents,
        totalRegistrations
      },
      registrations: {
        today: todayRegistrations,
        thisWeek: weeklyRegistrations,
        thisMonth: monthlyRegistrations,
        growth: {
          events: Math.round(eventGrowth * 100) / 100,
          users: Math.round(userGrowth * 100) / 100,
          registrations: Math.round(registrationGrowth * 100) / 100
        }
      },
      recent: {
        events: recentEvents,
        users: recentUsers
      },
      popular: {
        categories: popularCategories
      }
    };
    
    return NextResponse.json(stats);
  } catch (error: any) {
    console.error('Admin Stats GET Error:', error);
    return NextResponse.json(
      { error: error.message }, 
      { status: error.message.includes('privileges') ? 403 : 500 }
    );
  }
}