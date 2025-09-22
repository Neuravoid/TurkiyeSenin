import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAdminRequest } from '@/lib/admin-auth';
import { eventSchema } from '@/lib/validators';
import { ZodError } from 'zod';

// GET all events (for admin dashboard)
export async function GET(req: Request) {
  try {
    await verifyAdminRequest(); // Protect the route
    
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    const status = searchParams.get('status') || '';
    
    const skip = (page - 1) * limit;
    
    // Build where clause for filtering
    const where: any = {};
    
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { venueName: { contains: search, mode: 'insensitive' } },
      ];
    }
    
    if (status === 'active') {
      where.startDatetime = { gte: new Date() };
    } else if (status === 'past') {
      where.startDatetime = { lt: new Date() };
    }
    
    const [events, total] = await Promise.all([
      prisma.event.findMany({
        where,
        skip,
        take: limit,
        orderBy: { startDatetime: 'desc' },
        include: { 
          category: {
            select: {
              id: true,
              name: true,
              slug: true
            }
          }, 
          municipality: {
            select: {
              id: true,
              name: true,
              city: true,
              district: true
            }
          },
          _count: {
            select: {
              registrations: true
            }
          }
        },
      }),
      prisma.event.count({ where })
    ]);
    
    return NextResponse.json({
      events,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error: any) {
    console.error('Admin Events GET Error:', error);
    return NextResponse.json(
      { error: error.message }, 
      { status: error.message.includes('privileges') ? 403 : 401 }
    );
  }
}

// POST a new event
export async function POST(req: Request) {
  try {
    await verifyAdminRequest(); // Protect the route
    const body = await req.json();
    
    // Validate the input data
    const data = eventSchema.parse(body);
    
    // Verify that municipality and category exist
    const [municipality, category] = await Promise.all([
      prisma.municipality.findUnique({ where: { id: data.municipalityId } }),
      prisma.category.findUnique({ where: { id: data.categoryId } })
    ]);
    
    if (!municipality) {
      return NextResponse.json(
        { error: 'Municipality not found' }, 
        { status: 400 }
      );
    }
    
    if (!category) {
      return NextResponse.json(
        { error: 'Category not found' }, 
        { status: 400 }
      );
    }
    
    // Validate date logic
    if (data.endDatetime <= data.startDatetime) {
      return NextResponse.json(
        { error: 'End date must be after start date' }, 
        { status: 400 }
      );
    }

    const event = await prisma.event.create({ 
      data,
      include: {
        category: true,
        municipality: true,
        _count: {
          select: {
            registrations: true
          }
        }
      }
    });

    return NextResponse.json(event, { status: 201 });
  } catch (error: any) {
    console.error('Admin Events POST Error:', error);
    
    if (error instanceof ZodError) {
      return NextResponse.json(
        { 
          error: 'Invalid input data', 
          details: error.errors.map(err => ({
            field: err.path.join('.'),
            message: err.message
          }))
        }, 
        { status: 400 }
      );
    }
    
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'A constraint violation occurred. Please check your data.' }, 
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: error.message }, 
      { status: error.message.includes('privileges') ? 403 : 500 }
    );
  }
}