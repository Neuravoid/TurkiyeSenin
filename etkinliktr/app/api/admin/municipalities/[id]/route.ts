import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAdminRequest } from '@/lib/admin-auth';
import { municipalitySchema } from '@/lib/validators';
import { ZodError } from 'zod';

type RouteContext = {
  params: {
    id: string;
  };
};

// GET a single municipality by ID
export async function GET(req: Request, { params }: RouteContext) {
  try {
    await verifyAdminRequest();
    
    const municipality = await prisma.municipality.findUnique({
      where: { id: params.id },
      include: {
        events: {
          select: {
            id: true,
            title: true,
            startDatetime: true,
            venueName: true,
            category: {
              select: {
                name: true
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
    
    if (!municipality) {
      return NextResponse.json({ error: 'Municipality not found' }, { status: 404 });
    }
    
    return NextResponse.json(municipality);
  } catch (error: any) {
    console.error('Admin Municipality GET Error:', error);
    return NextResponse.json(
      { error: error.message }, 
      { status: error.message.includes('privileges') ? 403 : 500 }
    );
  }
}

// PUT (update) a municipality by ID
export async function PUT(req: Request, { params }: RouteContext) {
  try {
    await verifyAdminRequest();
    const body = await req.json();
    
    const data = municipalitySchema.parse(body);
    
    // Check if municipality exists
    const existingMunicipality = await prisma.municipality.findUnique({
      where: { id: params.id }
    });
    
    if (!existingMunicipality) {
      return NextResponse.json({ error: 'Municipality not found' }, { status: 404 });
    }

    const updatedMunicipality = await prisma.municipality.update({
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

    return NextResponse.json(updatedMunicipality);
  } catch (error: any) {
    console.error('Admin Municipality PUT Error:', error);
    
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
      return NextResponse.json({ error: 'Municipality not found' }, { status: 404 });
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

// DELETE a municipality by ID
export async function DELETE(req: Request, { params }: RouteContext) {
  try {
    await verifyAdminRequest();
    
    // Check if municipality exists and has events
    const municipality = await prisma.municipality.findUnique({
      where: { id: params.id },
      include: {
        _count: {
          select: {
            events: true
          }
        }
      }
    });
    
    if (!municipality) {
      return NextResponse.json({ error: 'Municipality not found' }, { status: 404 });
    }
    
    // Prevent deletion if there are events using this municipality
    if (municipality._count.events > 0) {
      return NextResponse.json(
        { 
          error: 'Cannot delete municipality with existing events. Please reassign or delete all events first.',
          eventCount: municipality._count.events
        }, 
        { status: 400 }
      );
    }
    
    await prisma.municipality.delete({
      where: { id: params.id },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error: any) {
    console.error('Admin Municipality DELETE Error:', error);
    
    if (error.code === 'P2025') {
      return NextResponse.json({ error: 'Municipality not found' }, { status: 404 });
    }
    
    if (error.code === 'P2003') {
      return NextResponse.json(
        { error: 'Cannot delete municipality due to existing references. Please remove all related events first.' }, 
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: error.message }, 
      { status: error.message.includes('privileges') ? 403 : 500 }
    );
  }
}