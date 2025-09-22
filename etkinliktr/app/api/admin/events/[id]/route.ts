import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAdminRequest } from '@/lib/admin-auth';
import { eventSchema } from '@/lib/validators';
import { ZodError } from 'zod';

type RouteContext = {
  params: {
    id: string;
  };
};

// GET a single event by ID
export async function GET(req: Request, { params }: RouteContext) {
  try {
    await verifyAdminRequest();
    
    const event = await prisma.event.findUnique({
      where: { id: params.id },
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
        registrations: {
          include: {
            user: {
              select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true
              }
            }
          },
          orderBy: {
            createdAt: 'desc'
          }
        },
        _count: {
          select: {
            registrations: true
          }
        }
      },
    });
    
    if (!event) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }
    
    return NextResponse.json(event);
  } catch (error: any) {
    console.error('Admin Event GET Error:', error);
    return NextResponse.json(
      { error: error.message }, 
      { status: error.message.includes('privileges') ? 403 : 500 }
    );
  }
}

// PUT (update) an event by ID
export async function PUT(req: Request, { params }: RouteContext) {
  try {
    await verifyAdminRequest();
    const body = await req.json();
    
    // Validate the input data
    const data = eventSchema.parse(body);
    
    // Check if event exists
    const existingEvent = await prisma.event.findUnique({
      where: { id: params.id }
    });
    
    if (!existingEvent) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }
    
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

    const updatedEvent = await prisma.event.update({
      where: { id: params.id },
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

    return NextResponse.json(updatedEvent);
  } catch (error: any) {
    console.error('Admin Event PUT Error:', error);
    
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
    
    // Handle case where the event to update doesn't exist
    if (error.code === 'P2025') {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
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

// DELETE an event by ID
export async function DELETE(req: Request, { params }: RouteContext) {
  try {
    await verifyAdminRequest();
    const { searchParams } = new URL(req.url);
    const force = searchParams.get('force') === 'true';
    
    // Check if event exists and has registrations
    const event = await prisma.event.findUnique({
      where: { id: params.id },
      include: {
        _count: {
          select: {
            registrations: true
          }
        }
      }
    });
    
    if (!event) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }
    
    // Prevent deletion if there are registrations unless forced
    if (event._count.registrations > 0 && !force) {
      return NextResponse.json(
        { 
          error: 'Cannot delete event with existing registrations. Please cancel all registrations first.',
          registrationCount: event._count.registrations
        }, 
        { status: 400 }
      );
    }

    if (event._count.registrations > 0 && force) {
      // Delete registrations first, then the event, within a transaction
      await prisma.$transaction([
        prisma.registration.deleteMany({ where: { eventId: params.id } }),
        prisma.event.delete({ where: { id: params.id } }),
      ]);
    } else {
      await prisma.event.delete({ where: { id: params.id } });
    }

    return new NextResponse(null, { status: 204 }); // No Content
  } catch (error: any) {
    console.error('Admin Event DELETE Error:', error);
    
    // Handle case where the event to delete doesn't exist
    if (error.code === 'P2025') {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }
    
    // Handle foreign key constraint violations
    if (error.code === 'P2003') {
      return NextResponse.json(
        { error: 'Cannot delete event due to existing references. Please remove all related data first.' }, 
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: error.message }, 
      { status: error.message.includes('privileges') ? 403 : 500 }
    );
  }
}