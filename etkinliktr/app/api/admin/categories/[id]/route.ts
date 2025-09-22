import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAdminRequest } from '@/lib/admin-auth';
import { categorySchema } from '@/lib/validators';
import { ZodError } from 'zod';

type RouteContext = {
  params: {
    id: string;
  };
};

// GET a single category by ID
export async function GET(req: Request, { params }: RouteContext) {
  try {
    await verifyAdminRequest();
    
    const category = await prisma.category.findUnique({
      where: { id: params.id },
      include: {
        events: {
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
            }
          },
          orderBy: {
            startDatetime: 'desc'
          }
        },
        _count: {
          select: {
            events: true
          }
        }
      }
    });
    
    if (!category) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 });
    }
    
    return NextResponse.json({ category });
  } catch (error) {
    console.error('Categories GET Error:', error);
    if (error instanceof Error) {
      if (error.message.includes('Authentication required')) {
        return NextResponse.json({ error: error.message }, { status: 401 });
      }
      if (error.message.includes('Forbidden')) {
        return NextResponse.json({ error: error.message }, { status: 403 });
      }
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// PUT (update) a category by ID
export async function PUT(req: Request, { params }: RouteContext) {
  try {
    await verifyAdminRequest();
    const body = await req.json();
    
    const data = categorySchema.parse(body);
    
    // Check if category exists
    const existingCategory = await prisma.category.findUnique({
      where: { id: params.id }
    });
    
    if (!existingCategory) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 });
    }
    
    // Check if slug is being changed and if it's already taken
    if (data.slug !== existingCategory.slug) {
      const slugExists = await prisma.category.findUnique({
        where: { slug: data.slug }
      });
      
      if (slugExists) {
        return NextResponse.json(
          { error: 'Slug is already taken by another category' }, 
          { status: 400 }
        );
      }
    }

    const updatedCategory = await prisma.category.update({
      where: { id: params.id },
      data,
      include: {
        _count: {
          select: {
            events: true
          }
        }
      }
    });

    return NextResponse.json(updatedCategory);
  } catch (error: any) {
    console.error('Admin Category PUT Error:', error);
    
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
    
    if (error.code === 'P2025') {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 });
    }
    
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'Slug is already taken by another category' }, 
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: error.message }, 
      { status: error.message.includes('privileges') ? 403 : 500 }
    );
  }
}

// DELETE a category by ID
export async function DELETE(req: Request, { params }: RouteContext) {
  try {
    await verifyAdminRequest();
    
    // Check if category exists and has events
    const category = await prisma.category.findUnique({
      where: { id: params.id },
      include: {
        _count: {
          select: {
            events: true
          }
        }
      }
    });
    
    if (!category) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 });
    }
    
    // Prevent deletion if there are events using this category
    if (category._count.events > 0) {
      return NextResponse.json(
        { 
          error: 'Cannot delete category with existing events. Please reassign or delete all events first.',
          eventCount: category._count.events
        }, 
        { status: 400 }
      );
    }
    
    await prisma.category.delete({
      where: { id: params.id },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error: any) {
    console.error('Admin Category DELETE Error:', error);
    
    if (error.code === 'P2025') {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 });
    }
    
    if (error.code === 'P2003') {
      return NextResponse.json(
        { error: 'Cannot delete category due to existing references. Please remove all related events first.' }, 
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: error.message }, 
      { status: error.message.includes('privileges') ? 403 : 500 }
    );
  }
}