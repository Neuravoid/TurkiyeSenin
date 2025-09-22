import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAdminRequest } from '@/lib/admin-auth';
import { categorySchema } from '@/lib/validators';
import { ZodError } from 'zod';

// GET all categories
export async function GET(req: Request) {
  try {
    await verifyAdminRequest();
    
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    
    const skip = (page - 1) * limit;
    
    const where: any = {};
    
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { slug: { contains: search, mode: 'insensitive' } },
      ];
    }
    
    const [categories, total] = await Promise.all([
      prisma.category.findMany({
        where,
        skip,
        take: limit,
        orderBy: { name: 'asc' },
        include: {
          _count: {
            select: {
              events: true
            }
          }
        }
      }),
      prisma.category.count({ where })
    ]);
    
    return NextResponse.json({
      categories,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error: any) {
    console.error('Admin Categories GET Error:', error);
    return NextResponse.json(
      { error: error.message }, 
      { status: error.message.includes('privileges') ? 403 : 401 }
    );
  }
}

// POST a new category
export async function POST(req: Request) {
  try {
    await verifyAdminRequest();
    const body = await req.json();
    
    const data = categorySchema.parse(body);
    
    // Check if category with this slug already exists
    const existingCategory = await prisma.category.findUnique({
      where: { slug: data.slug }
    });
    
    if (existingCategory) {
      return NextResponse.json(
        { error: 'Category with this slug already exists' }, 
        { status: 400 }
      );
    }

    const category = await prisma.category.create({ 
      data,
      include: {
        _count: {
          select: {
            events: true
          }
        }
      }
    });

    return NextResponse.json({ category }, { status: 201 });
  } catch (error) {
    console.error('Admin Categories POST Error:', error);
    
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
    
    if (error instanceof Error) {
      if (error.message.includes('Authentication required')) {
        return NextResponse.json({ error: error.message }, { status: 401 });
      }
      if (error.message.includes('Forbidden')) {
        return NextResponse.json({ error: error.message }, { status: 403 });
      }
    }
    
    // Prisma unique constraint error
    if (typeof error === 'object' && error !== null && 'code' in error && error.code === 'P2002') {
      return NextResponse.json(
        { error: 'Category with this slug already exists' }, 
        { status: 400 }
      );
    }
    
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}