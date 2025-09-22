import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAdminRequest } from '@/lib/admin-auth';
import { municipalitySchema } from '@/lib/validators';
import { ZodError } from 'zod';

// GET all municipalities
export async function GET(req: Request) {
  try {
    await verifyAdminRequest();
    
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    const city = searchParams.get('city') || '';
    
    const skip = (page - 1) * limit;
    
    const where: any = {};
    
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { city: { contains: search, mode: 'insensitive' } },
        { district: { contains: search, mode: 'insensitive' } },
      ];
    }
    
    if (city) {
      where.city = { contains: city, mode: 'insensitive' };
    }
    
    const [municipalities, total] = await Promise.all([
      prisma.municipality.findMany({
        where,
        skip,
        take: limit,
        orderBy: [{ city: 'asc' }, { name: 'asc' }],
        include: {
          _count: {
            select: {
              events: true
            }
          }
        }
      }),
      prisma.municipality.count({ where })
    ]);
    
    return NextResponse.json({
      municipalities,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error: any) {
    console.error('Admin Municipalities GET Error:', error);
    return NextResponse.json(
      { error: error.message }, 
      { status: error.message.includes('privileges') ? 403 : 401 }
    );
  }
}

// POST a new municipality
export async function POST(req: Request) {
  try {
    await verifyAdminRequest();
    const body = await req.json();
    
    const data = municipalitySchema.parse(body);

    const municipality = await prisma.municipality.create({ 
      data,
      include: {
        _count: {
          select: {
            events: true
          }
        }
      }
    });

    return NextResponse.json(municipality, { status: 201 });
  } catch (error: any) {
    console.error('Admin Municipalities POST Error:', error);
    
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